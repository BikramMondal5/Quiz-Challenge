// Contains the leaderboard data
import { LeaderboardEntry } from "../types";
import { fetchCloudLeaderboard, saveToCloudLeaderboard, mergeLeaderboardEntries } from "../utils/leaderboard";

// Default leaderboard entries as fallback
const defaultLeaderboardData: LeaderboardEntry[] = [
    { name: "Priya Das", score: 95, avatar: "https://png.pngtree.com/png-vector/20241019/ourmid/pngtree-future-innovator-linkedin-profile-of-a-21-year-old-indian-professional-png-image_14113480.png", date: "June 11, 2025" },
    { name: "Arjun Sen", score: 92, avatar: "https://www.itl.cat/pngfile/big/107-1070769_smart-indian-boy-fb-profile.jpg", date: "June 11, 2025" },
    { name: "Meera Roy", score: 88, avatar: "https://i.pinimg.com/736x/55/b5/9c/55b59c73bd0ee0e42c0022168b9d36be.jpg", date: "June 10, 2025" },
    { name: "Rahul Ghosh", score: 85, avatar: "/WhatsApp Image 2025-06-12 at 11.51.34 PM.jpeg", date: "June 10, 2025" },
    { name: "Somsubhro Dalui", score: 82, avatar: "Somsubhro.jpeg", date: "June 9, 2025" },
    { name: "Ravi Sharma", score: 80, avatar: "WhatsApp Image 2025-06-12 at 11.51.33 PM.jpeg", date: "June 12, 2025" },
    { name: "Sunita Patel", score: 78, avatar: "SP", date: "June 8, 2025" },
    { name: "Dev Kumar", score: 75, avatar: "WhatsApp Image 2025-06-12 at 11.51.35 PM.jpeg", date: "June 11, 2025" },
    { name: "Debesh Mukherjee", score: 72, avatar: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwYm95fGVufDB8fDB8fHww.jpg", date: "June 9, 2025" },
    { name: "Kavita Joshi", score: 70, avatar: "https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg", date: "June 7, 2025" },
];

// Global cache for cloud leaderboard data
let cachedCloudLeaderboard: LeaderboardEntry[] | null = null;
let lastFetchTime = 0;
const FETCH_INTERVAL = 30000; // Refresh cloud data every 30 seconds (reduced from 60s)

// Generate initials for avatar fallback
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Add a new entry to the leaderboard
export const addLeaderboardEntry = (entry: LeaderboardEntry): void => {
  // Only execute on client-side
  if (typeof window === 'undefined') return;
  
  // Get current leaderboard data
  const currentData = getLeaderboardDataClient();
  
  // Check if user already exists in the leaderboard
  const existingEntryIndex = currentData.findIndex(item => item.name === entry.name);
  let newData: LeaderboardEntry[];
  
  if (existingEntryIndex !== -1) {
    // User already exists, check if the new score is higher
    if (entry.score > currentData[existingEntryIndex].score) {
      // Replace with the higher score entry
      newData = [
        ...currentData.slice(0, existingEntryIndex),
        entry,
        ...currentData.slice(existingEntryIndex + 1)
      ];
    } else {
      // Keep the existing higher score
      newData = [...currentData];
    }
  } else {
    // User doesn't exist, add the new entry
    newData = [...currentData, entry];
  }
  
  // Sort by score (highest first)
  newData.sort((a, b) => b.score - a.score);
  
  // Keep only top 50 entries
  const topEntries = newData.slice(0, 50);
  
  // Save back to localStorage
  localStorage.setItem("leaderboardData", JSON.stringify(topEntries));
  
  // Always save to cloud leaderboard, regardless of score
  // This ensures all scores are synced between users
  saveToCloudLeaderboard(entry)
    .then(success => {
      if (success) {
        console.log("Score successfully saved to cloud leaderboard");
        // Force refresh the cloud leaderboard on next request
        lastFetchTime = 0;
        localStorage.removeItem("last_cloud_fetch_time");
      }
    })
    .catch(err => {
      console.error("Failed to save to cloud leaderboard", err);
    });
};

// Private function to get client-side data from localStorage
const getLeaderboardDataClient = (): LeaderboardEntry[] => {
  try {
    const storedData = localStorage.getItem("leaderboardData");
    
    if (storedData) {
      const parsedData = JSON.parse(storedData) as LeaderboardEntry[];
      return processLeaderboardData(parsedData);
    }
    
    // If no stored data, use defaults and store them
    localStorage.setItem("leaderboardData", JSON.stringify(defaultLeaderboardData));
    return [...defaultLeaderboardData];
  } catch (error) {
    console.error("Error loading leaderboard data:", error);
    return [...defaultLeaderboardData];
  }
};

// Process leaderboard data to ensure unique users with highest scores
const processLeaderboardData = (data: LeaderboardEntry[]): LeaderboardEntry[] => {
  // Ensure each user appears only once with their highest score
  const uniqueUserMap = new Map<string, LeaderboardEntry>();
  
  data.forEach(entry => {
    // If user doesn't exist in map or has a higher score than existing entry, update the map
    if (!uniqueUserMap.has(entry.name) || entry.score > uniqueUserMap.get(entry.name)!.score) {
      uniqueUserMap.set(entry.name, entry);
    }
  });
  
  // Convert map back to array and sort by score
  const uniqueEntries = Array.from(uniqueUserMap.values());
  uniqueEntries.sort((a, b) => b.score - a.score);
  
  return uniqueEntries;
};

// Main public function to get leaderboard data - safe for server and client
export const getLeaderboardData = (): LeaderboardEntry[] => {
  // Check if we're on the client side
  if (typeof window !== 'undefined') {
    return getLeaderboardDataClient();
  }
  
  // On server side, always return default data
  // This ensures consistent rendering between server and client initial render
  return [...defaultLeaderboardData];
};

// Function to get combined local and cloud leaderboard data
export const getCombinedLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  if (typeof window === 'undefined') {
    return [...defaultLeaderboardData]; // On server, return default data
  }

  try {
    console.log("Getting combined leaderboard data...");
    
    // Get local data
    const localData = getLeaderboardDataClient();
    console.log(`Retrieved ${localData.length} local entries`);
    
    // Check if we should fetch new cloud data
    const now = Date.now();
    const storedLastFetchTime = localStorage.getItem("last_cloud_fetch_time");
    
    if (storedLastFetchTime) {
      lastFetchTime = parseInt(storedLastFetchTime, 10);
    }
    
    // Always fetch fresh cloud data if none exists or if it's time to refresh
    if (!cachedCloudLeaderboard || (now - lastFetchTime) > FETCH_INTERVAL) {
      try {
        console.log("Fetch interval exceeded or no cached data, fetching fresh cloud data");
        const cloudData = await fetchCloudLeaderboard();
        cachedCloudLeaderboard = cloudData;
        lastFetchTime = now;
        localStorage.setItem("last_cloud_fetch_time", lastFetchTime.toString());
      } catch (error) {
        console.error("Failed to fetch cloud leaderboard:", error);
        // If we've never fetched before, set an empty array
        if (!cachedCloudLeaderboard) cachedCloudLeaderboard = [];
      }
    } else {
      console.log("Using cached cloud data since fetch interval not exceeded");
    }
    
    // Merge local and cloud data
    const mergedData = mergeLeaderboardEntries(localData, cachedCloudLeaderboard || []);
    console.log(`Returning combined leaderboard with ${mergedData.length} entries`);
    
    return mergedData;
  } catch (error) {
    console.error("Error getting combined leaderboard:", error);
    // Fallback to local data only on error
    return getLeaderboardData();
  }
};