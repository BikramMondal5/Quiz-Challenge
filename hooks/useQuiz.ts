// Contains the quiz state management logic
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ScreenType, QuizQuestion } from "../types";
import { quizQuestions } from "../data/questions";
import confetti from 'canvas-confetti';

export function useQuiz() {
    const [currentScreen, setCurrentScreen] = useState<ScreenType>("hero");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizStartTime, setQuizStartTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
    const { toast } = useToast();

    // Filter questions based on selected category
    useEffect(() => {
        if (selectedCategory) {
            setFilteredQuestions(quizQuestions.filter(q => q.category === selectedCategory));
        } else {
            // For quick play/mixed mode, take random questions from all categories
            const mixedQuestions: QuizQuestion[] = [];
            const allQuestions = [...quizQuestions];
            
            // Select 10 random questions
            for (let i = 0; i < 10 && allQuestions.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * allQuestions.length);
                mixedQuestions.push(allQuestions[randomIndex]);
                allQuestions.splice(randomIndex, 1);
            }
            
            setFilteredQuestions(mixedQuestions);
        }
    }, [selectedCategory]);

    // Timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        
        if (currentScreen === "quiz" && !showAnswer && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && !showAnswer && currentScreen === "quiz") {
            setShowAnswer(true);
            setSelectedAnswer(null);
        }
        
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timeLeft, currentScreen, showAnswer]);

    // Save score to localStorage when quiz ends
    useEffect(() => {
        if (currentScreen === "results") {
            const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
            quizHistory.push({
                date: new Date().toISOString(),
                category: selectedCategory || "mixed",
                score,
                totalQuestions: filteredQuestions.length,
                timeSpent: totalTime
            });
            localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
        }
    }, [currentScreen, score, selectedCategory, totalTime, filteredQuestions.length]);

    // Trigger confetti when reaching results screen
    useEffect(() => {
        if (currentScreen === "results") {
            triggerConfetti();
        }
    }, [currentScreen]);

    const triggerConfetti = useCallback(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []);

    const startQuiz = (categoryId?: string) => {
        setSelectedCategory(categoryId || "");
        setCurrentScreen("quiz");
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswers([]);
        setScore(0);
        setTimeLeft(30);
        setShowAnswer(false);
        setQuizStartTime(Date.now());
        setTotalTime(0);
        
        toast({
            title: categoryId ? `Starting ${categoryId} quiz` : "Starting mixed quiz",
            description: "Good luck!",
            duration: 2000,
        });
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (!showAnswer) {
            setSelectedAnswer(answerIndex);
        }
    };

    const handleAnswerSubmit = () => {
        if (selectedAnswer === null) return;

        // Check if answer is correct and update score
        if (selectedAnswer === filteredQuestions[currentQuestion].correct) {
            setScore(prevScore => prevScore + 1);
        }
        
        // Save the answer
        setAnswers(prev => [...prev, selectedAnswer]);
        
        // Show the correct answer
        setShowAnswer(true);
        
        setTimeout(() => {
            // If this was the last question, end the quiz
            if (currentQuestion === filteredQuestions.length - 1) {
                setTotalTime(Math.floor((Date.now() - quizStartTime) / 1000));
                setCurrentScreen("results");
            } else {
                // Otherwise, move to the next question
                setCurrentQuestion(prevQuestion => prevQuestion + 1);
                setSelectedAnswer(null);
                setShowAnswer(false);
                setTimeLeft(30);
            }
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentScreen("hero");
        setSelectedCategory("");
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswers([]);
        setScore(0);
        setTimeLeft(30);
    };

    const shareScore = async () => {
        const accuracy = Math.round((score / filteredQuestions.length) * 100);
        const shareText = `I scored ${score}/${filteredQuestions.length} (${accuracy}%) on the ${selectedCategory || "Mixed"} Durga Puja Quiz Challenge! Can you beat my score? #DurgaPujaQuizChallenge`;
        
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Durga Puja Quiz Challenge',
                    text: shareText,
                });
            } else {
                await navigator.clipboard.writeText(shareText);
                toast({
                    title: "Copied to clipboard!",
                    description: "Share your results with friends",
                    duration: 2000,
                });
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    const toggleExplanation = () => {
        setShowExplanation(prev => !prev);
    };

    // Return all state and functions
    return {
        currentScreen,
        setCurrentScreen,
        selectedCategory,
        currentQuestion,
        selectedAnswer,
        answers,
        score,
        timeLeft,
        showAnswer,
        totalTime,
        showExplanation,
        filteredQuestions,
        quizStartTime,
        startQuiz,
        handleAnswerSelect,
        handleAnswerSubmit,
        resetQuiz,
        shareScore,
        toggleExplanation
    };
}