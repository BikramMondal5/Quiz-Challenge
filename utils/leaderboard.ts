// Utilities for managing leaderboard functionality
import { LeaderboardEntry, QuizHistoryEntry } from "../types";
import { getLeaderboardData as getStaticLeaderboardData } from "../data/leaderboard";

const LEADERBOARD_KEY = "pujoQuizLeaderboard";
const USERNAME_KEY = "pujoQuizUsername";
const DEFAULT_AVATAR_PLACEHOLDER = "/placeholder-user.jpg";

// Generate random avatar if none provided
const getRandomAvatarUrl = (): string => {
  // List of placeholder avatar options
  const placeholders = [
    "/placeholder-user.jpg",
    "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70)
  ];
  return placeholders[Math.floor(Math.random() * placeholders.length)];
};

// Generate a unique ID for entries
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Get current date in format "Month Day, Year"
const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Get or create username from local storage
export const getUserName = (): string => {
  if (typeof window === "undefined") return "Guest";
  
  let username = localStorage.getItem(USERNAME_KEY);
  if (!username) {
    // Default guest name with random number
    username = `Guest${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem(USERNAME_KEY, username);
  }
  return username;
};

// Save username to local storage
export const saveUserName = (name: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERNAME_KEY, name);
};

// Get leaderboard data from local storage, or initialize with static data if empty
export const getLeaderboardData = (): LeaderboardEntry[] => {
  if (typeof window === "undefined") {
    // Server-side rendering - return static data
    return getStaticLeaderboardData();
  }

  try {
    const savedData = localStorage.getItem(LEADERBOARD_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    // Initialize with static data if no saved data
    const staticData = getStaticLeaderboardData();
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(staticData));
    return staticData;
  } catch (error) {
    console.error("Error retrieving leaderboard data:", error);
    return getStaticLeaderboardData();
  }
};

// Save leaderboard data to local storage
export const saveLeaderboardData = (entries: LeaderboardEntry[]): void => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Error saving leaderboard data:", error);
  }
};

// Add a new entry to the leaderboard
export const addLeaderboardEntry = (
  score: number,
  totalPoints: number,
  category: string = "mixed",
  timeSpent: number
): LeaderboardEntry => {
  const leaderboard = getLeaderboardData();
  const username = getUserName();
  const accuracy = Math.round((score / totalPoints) * 100);
  
  const newEntry: LeaderboardEntry = {
    id: generateId(),
    name: username,
    score: accuracy, // Store the accuracy percentage as the score
    avatar: getRandomAvatarUrl(),
    date: getCurrentDate(),
    timestamp: Date.now(),
    category,
    accuracy,
    timeSpent,
    isCurrentUser: true
  };

  // Add the new entry
  leaderboard.push(newEntry);
  
  // Sort by score (highest first) and then by timestamp (most recent first for ties)
  const sortedLeaderboard = leaderboard
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.timestamp || 0) - (a.timestamp || 0);
    })
    .slice(0, 100); // Keep only top 100 entries to prevent storage issues
  
  // Remove isCurrentUser flag from all entries
  sortedLeaderboard.forEach(entry => entry.isCurrentUser = false);
  
  // Find and mark the new entry as current user
  const currentUserEntry = sortedLeaderboard.find(entry => entry.id === newEntry.id);
  if (currentUserEntry) {
    currentUserEntry.isCurrentUser = true;
  }
  
  // Save the updated leaderboard
  saveLeaderboardData(sortedLeaderboard);
  
  return newEntry;
};

// Get user's rank in the leaderboard
export const getUserRank = (userId: string): number | null => {
  const leaderboard = getLeaderboardData();
  const index = leaderboard.findIndex(entry => entry.id === userId);
  return index !== -1 ? index + 1 : null;
};

// Get top N entries from leaderboard
export const getTopEntries = (limit: number = 10): LeaderboardEntry[] => {
  return getLeaderboardData().slice(0, limit);
};

// Check if a score would make it to the top N leaderboard
export const wouldMakeLeaderboard = (score: number, totalPoints: number, limit: number = 10): boolean => {
  const accuracy = Math.round((score / totalPoints) * 100);
  const leaderboard = getLeaderboardData();
  
  if (leaderboard.length < limit) return true;
  
  const lowestScore = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .pop()?.score || 0;
  
  return accuracy > lowestScore;
};