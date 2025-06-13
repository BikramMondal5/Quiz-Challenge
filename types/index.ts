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
  name: string;
  score: number;
  avatar: string;
  date?: string;
  timestamp?: number; // Added for cloud syncing
  deviceId?: string;  // Added to track which device submitted the score
  isLocal?: boolean;  // Flag to indicate if this is a local or cloud entry
}

export type ScreenType = "hero" | "categories" | "quiz" | "results";