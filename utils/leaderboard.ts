// filepath: d:\Programming\workspace\Quiz-Challenge\utils\leaderboard.ts
// Contains cloud synchronization utilities for the leaderboard
import { LeaderboardEntry } from "../types";

// Use Firebase Realtime Database REST API for reliable cloud storage
const FIREBASE_URL = "https://quiz-leaderboard-6734c-default-rtdb.firebaseio.com/leaderboard.json";

/**
 * Fetches leaderboard data from the cloud service
 * @returns Promise with leaderboard entries
 */
export async function fetchCloudLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    if (typeof window === 'undefined') {
      return []; // Return empty array on the server
    }

    console.log("Fetching cloud leaderboard data...");
    
    // Add cache buster to prevent browser caching
    const cacheBuster = `?cacheBuster=${Date.now()}`;
    
    // Fetch from Firebase REST API
    const response = await fetch(`${FIREBASE_URL}${cacheBuster}`);
    
    if (!response.ok) {
      console.warn(`Cloud fetch failed (${response.status}): ${response.statusText}`);
      return fetchFallbackCloudData(); 
    }
    
    const data = await response.json();
    console.log("Raw cloud data received:", data);
    
    // Firebase returns null when empty
    if (data === null) {
      console.log("Empty data from Firebase, using fallback");
      return fetchFallbackCloudData();
    }
    
    // Firebase returns data as an object with keys, convert to array
    let entries: LeaderboardEntry[] = [];
    if (typeof data === 'object' && data !== null) {
      entries = Object.values(data);
      console.log(`Parsed ${entries.length} leaderboard entries from cloud`);
    } else {
      console.warn("Unexpected data format from cloud:", data);
      return fetchFallbackCloudData();
    }
    
    // Cache the cloud data locally for fallback
    localStorage.setItem("cloud_leaderboard_cache", JSON.stringify(entries));
    
    return entries;
  } catch (error) {
    console.error("Error fetching cloud leaderboard:", error);
    return fetchFallbackCloudData();
  }
}

/**
 * Gets cached cloud data from localStorage as fallback
 */
function fetchFallbackCloudData(): LeaderboardEntry[] {
  try {
    const cachedData = localStorage.getItem("cloud_leaderboard_cache");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData) as LeaderboardEntry[];
      console.log(`Using cached cloud data (${parsedData.length} entries)`);
      return parsedData;
    }
    
    console.log("No cached cloud data available, using simulated data");
    // If no cached data, use the simulated cloud data
    const simulatedData = localStorage.getItem("global_leaderboard_data");
    return simulatedData ? JSON.parse(simulatedData) : [];
  } catch (error) {
    console.error("Error reading fallback data:", error);
    return [];
  }
}

/**
 * Saves a leaderboard entry to the cloud service
 * @param entry The leaderboard entry to save
 */
export async function saveToCloudLeaderboard(entry: LeaderboardEntry): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    console.log(`Saving entry for ${entry.name} with score ${entry.score} to cloud...`);
    
    // Create unique ID for the entry based on name and timestamp to avoid conflicts
    const entryId = `entry_${entry.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    
    // Add metadata to entry
    const enhancedEntry = {
      ...entry,
      timestamp: Date.now(),
      deviceId: getDeviceId(),
      lastUpdated: new Date().toISOString()
    };
    
    console.log("Sending data to Firebase:", enhancedEntry);
    
    // Push the new entry to Firebase (Firebase will generate unique IDs)
    const response = await fetch(`${FIREBASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enhancedEntry)
    });
    
    if (!response.ok) {
      console.warn(`Failed to update cloud data (${response.status}): ${response.statusText}`);
      return false;
    }
    
    const result = await response.json();
    console.log("Firebase response:", result);
    
    // Force refresh of cached data on next fetch
    localStorage.removeItem("last_cloud_fetch_time");
    
    // Update local cache with the new entry
    try {
      const cachedData = localStorage.getItem("cloud_leaderboard_cache");
      let cloudCache: LeaderboardEntry[] = cachedData ? JSON.parse(cachedData) : [];
      
      // Add the new entry to the cache
      cloudCache.push(enhancedEntry);
      
      // Sort by score (highest first)
      cloudCache.sort((a, b) => b.score - a.score);
      
      // Keep only top 100 entries
      cloudCache = cloudCache.slice(0, 100);
      
      // Update cache
      localStorage.setItem("cloud_leaderboard_cache", JSON.stringify(cloudCache));
      console.log("Local cloud cache updated");
    } catch (cacheError) {
      console.error("Error updating local cache:", cacheError);
    }
    
    return true;
  } catch (error) {
    console.error("Error saving to cloud leaderboard:", error);
    return false;
  }
}

/**
 * Get or generate a unique device identifier
 */
function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let deviceId = localStorage.getItem('quiz_device_id');
  
  if (!deviceId) {
    // Generate random device ID
    deviceId = 'device_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('quiz_device_id', deviceId);
  }
  
  return deviceId;
}

/**
 * Merges local and cloud leaderboard data
 * @param localEntries Local leaderboard entries
 * @param cloudEntries Cloud leaderboard entries
 * @returns Merged and sorted entries
 */
export function mergeLeaderboardEntries(
  localEntries: LeaderboardEntry[],
  cloudEntries: LeaderboardEntry[]
): LeaderboardEntry[] {
  console.log(`Merging ${localEntries.length} local entries with ${cloudEntries.length} cloud entries`);
  
  // Combine both arrays
  const combinedEntries = [...localEntries, ...cloudEntries];
  
  // Create a map to ensure unique entries by name
  const uniqueEntries = new Map<string, LeaderboardEntry>();
  
  combinedEntries.forEach(entry => {
    if (!uniqueEntries.has(entry.name) || entry.score > uniqueEntries.get(entry.name)!.score) {
      uniqueEntries.set(entry.name, {
        ...entry,
        isLocal: localEntries.some(local => local.name === entry.name)
      });
    }
  });
  
  // Convert back to array and sort by score (highest first)
  const result = Array.from(uniqueEntries.values());
  result.sort((a, b) => b.score - a.score);
  
  console.log(`Merged leaderboard has ${result.length} unique entries`);
  return result;
}