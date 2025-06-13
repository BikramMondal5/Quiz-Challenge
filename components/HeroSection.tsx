// Contains the Hero section of the app
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw } from "lucide-react";
import { LeaderboardCard } from "./LeaderboardCard";
import { getLeaderboardData } from "../data/leaderboard";
import { screenVariants } from "../utils/animations";
import { useState, useEffect } from "react";
import { LeaderboardEntry } from "../types";
import { getCombinedLeaderboardData } from "../data/leaderboard";

interface HeroSectionProps {
    onStartQuiz: () => void;
    onSelectCategory: () => void;
}

export function HeroSection({ onStartQuiz, onSelectCategory }: HeroSectionProps) {
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(getLeaderboardData());
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    // Set isClient to true on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Fetch combined leaderboard data on component mount, but only on client
    useEffect(() => {
        if (!isClient) return;

        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const combinedData = await getCombinedLeaderboardData();
                setLeaderboardEntries(combinedData);
            } catch (error) {
                console.error("Error fetching global leaderboard:", error);
                // Fallback to local leaderboard data on error
                setLeaderboardEntries(getLeaderboardData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [isClient]);

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-800 relative overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                <motion.div
                    className="absolute top-20 left-10 text-6xl opacity-20"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >🪔</motion.div>
                <motion.div
                    className="absolute top-40 right-20 text-4xl opacity-20"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                >🎭</motion.div>
                <motion.div
                    className="absolute bottom-40 left-20 text-5xl opacity-20"
                    initial={{ y: 10 }}
                    animate={{ y: -10 }}
                    transition={{ type: "spring", duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                >🥁</motion.div>
                <motion.div
                    className="absolute bottom-20 right-10 text-6xl opacity-20"
                    initial={{ y: -15 }}
                    animate={{ y: 5 }}
                    transition={{ type: "spring", duration: 2.8, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
                >🌺</motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        Test Your <span className="text-yellow-300">Pujo IQ</span> 🎉
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8">Play. Learn. Earn Points. Make an Impact.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button
                            onClick={onSelectCategory}
                            className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl transform hover:scale-105 transition-all duration-200 border-0 backdrop-blur-sm bg-opacity-80 hover:shadow-fuchsia-500/30"
                            aria-label="Choose a quiz category"
                        >
                            <Play className="mr-2 h-5 w-5" />
                            Start Quiz
                        </Button>
                        <Button
                            onClick={onStartQuiz}
                            variant="outline"
                            className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-md py-4 px-8 rounded-2xl text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 hover:from-blue-600/60 hover:to-indigo-600/60"
                            aria-label="Start a random quiz right away"
                        >
                            Quick Play
                        </Button>
                    </div>
                </div>

                {/* Updated Leaderboard with Global Scores */}
                <LeaderboardCard 
                    entries={leaderboardEntries} 
                    limit={5}
                    className="max-w-md mx-auto"
                    title="Global Leaderboard"
                    messageText="Scores are now shared across all users! 🏆"
                />

                {/* Connection Status */}
                {isLoading && isClient && (
                    <div className="flex items-center justify-center mt-4 text-white/70">
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        <span className="text-sm">Connecting to global leaderboard...</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}