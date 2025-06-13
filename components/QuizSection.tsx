// Contains the Quiz screen with the question display
import { motion } from "framer-motion";
import { QuestionCard } from "./QuestionCard";
import { QuizQuestion } from "../types";
import { screenVariants } from "../utils/animations";

interface QuizSectionProps {
    questions: QuizQuestion[];
    currentQuestion: number;
    selectedAnswer: number | null;
    showAnswer: boolean;
    timeLeft: number;
    quizStartTime: number;
    answers: number[];
    showExplanation: boolean;
    onAnswerSelect: (answerIndex: number) => void;
    onAnswerSubmit: () => void;
    onToggleExplanation: () => void;
    onNextQuestion: () => void;
}

export function QuizSection({
    questions,
    currentQuestion,
    selectedAnswer,
    showAnswer,
    timeLeft,
    quizStartTime,
    answers,
    showExplanation,
    onAnswerSelect,
    onAnswerSubmit,
    onToggleExplanation,
    onNextQuestion
}: QuizSectionProps) {
    // Simplified from the renderQuiz() function to use QuestionCard
    if (questions.length === 0) return <div>Loading questions...</div>;

    const currentQ = questions[currentQuestion];

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
        >
            <QuestionCard
                question={currentQ}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                showAnswer={showAnswer}
                timeLeft={timeLeft}
                quizStartTime={quizStartTime}
                answers={answers}
                showExplanation={showExplanation}
                onAnswerSelect={onAnswerSelect}
                onAnswerSubmit={onAnswerSubmit}
                onToggleExplanation={onToggleExplanation}
                onNextQuestion={onNextQuestion}
            />
        </motion.div>
    );
}