// Contains the leaderboard data
import { LeaderboardEntry } from "../types";

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