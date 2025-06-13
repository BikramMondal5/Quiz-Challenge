// Contains the Results screen
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, RotateCcw, Share2, BarChart3, Home } from "lucide-react";
import { LeaderboardCard } from "./LeaderboardCard";
import { NamePrompt } from "./NamePrompt";
import { getLeaderboardData } from "../data/leaderboard";
import { QuizQuestion } from "../types";
import { screenVariants } from "../utils/animations";
import { useState, useEffect } from "react";

interface ResultsSectionProps {
  score: number;
  questions: QuizQuestion[];
  answers: number[];
  totalTime: number;
  onResetQuiz: () => void;
  onShareScore: () => void;
  playerName: string;
  showNamePrompt: boolean;
  onSubmitName: (name: string) => void;
  // Add new prop for navigation to home
  onGoHome?: () => void;
}

export function ResultsSection({ 
  score, 
  questions, 
  answers, 
  totalTime,
  onResetQuiz,
  onShareScore,
  playerName,
  showNamePrompt,
  onSubmitName,
  onGoHome
}: ResultsSectionProps) {
  const totalPoints = questions.length * 20;
  const accuracy = Math.round((score / totalPoints) * 100);
  const leaderboardData = getLeaderboardData();

  // Show confetti animation when component mounts
  useEffect(() => {
    // Check if the player has a good score (over 70%) to celebrate
    if (accuracy > 70) {
      import('canvas-confetti').then(confetti => {
        confetti.default({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
      });
    }
  }, [accuracy]);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-800 py-16"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={screenVariants}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white rounded-xl overflow-hidden">
          <CardHeader className="text-center border-b border-white/10">
            <motion.div 
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <Trophy className="h-10 w-10 text-purple-900" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Quiz Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Score Display */}
            <div className="text-center space-y-4">
              <motion.div 
                className="text-6xl font-bold text-yellow-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {score}
              </motion.div>
              <div className="text-xl">out of {totalPoints} points</div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-2xl font-bold text-yellow-300">{accuracy}%</div>
                  <div className="text-sm">Accuracy</div>
                </motion.div>
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-2xl font-bold text-yellow-300">{totalTime}s</div>
                  <div className="text-sm">Time Taken</div>
                </motion.div>
              </div>
            </div>

            {/* Stats and Summary */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                <BarChart3 className="h-5 w-5" />
                Quiz Summary
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold text-green-400">
                    {answers.filter((a, i) => a === questions[i].correct).length}
                  </div>
                  <div className="text-xs">Correct</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">
                    {answers.filter((a, i) => a !== questions[i].correct && a !== -1).length}
                  </div>
                  <div className="text-xs">Incorrect</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-yellow-400">
                    {answers.filter(a => a === -1).length}
                  </div>
                  <div className="text-xs">Unanswered</div>
                </div>
              </div>
            </motion.div>

            {/* Impact Message */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p className="text-lg mb-2">Every quiz attempt earns 1 point toward donation pool 💙</p>
              <p className="text-blue-200">Your participation helps support community initiatives!</p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <Button
                onClick={onGoHome}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-purple-500/30 backdrop-blur-sm"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button
                onClick={onResetQuiz}
                className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-purple-900 font-bold py-3 rounded-xl shadow-lg hover:shadow-amber-500/30 backdrop-blur-sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button
                onClick={onShareScore}
                variant="outline"
                className="flex-1 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm py-3 rounded-xl font-semibold"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Score
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Updated Leaderboard with Cloud Synchronization */}
        <LeaderboardCard 
          entries={leaderboardData}
          limit={10}
          title="Global Leaderboard"
          icon={<Crown className="h-5 w-5 text-yellow-300" />}
          className="mt-8"
          messageText="Your scores are now shared across all users! 🏆"
          scrollable={true}
          maxHeight="300px"
        />
      </div>

      {/* Name Prompt Dialog */}
      <NamePrompt 
        isOpen={showNamePrompt}
        onSubmitName={onSubmitName}
      />
    </motion.div>
  );
}