// Contains the interfaces and type definitions
import { ElementType } from "react";

export interface QuizCategory {
  id: string;
  title: string;
  icon: ElementType;
  description: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  explanation?: string;
}

export interface LeaderboardEntry {
  id?: string; // Unique identifier for the entry
  name: string;
  score: number;
  avatar: string;
  date?: string;
  timestamp?: number; // For sorting by recency
  category?: string; // The quiz category
  accuracy?: number; // Percentage of correct answers
  timeSpent?: number; // Total time spent in seconds
  isCurrentUser?: boolean; // Flag to highlight the current user
}

export type ScreenType = "hero" | "categories" | "quiz" | "results";

// User quiz history entry for local storage
export interface QuizHistoryEntry {
  date: string;
  timestamp: number;
  category: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  timeSpent: number;
}