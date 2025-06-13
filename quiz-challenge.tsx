// Main file that puts everything together
"use client"

import { AnimatePresence } from "framer-motion"
import { HeroSection } from "./components/HeroSection"
import { CategorySelection } from "./components/CategorySelection"
import { QuizSection } from "./components/QuizSection"
import { ResultsSection } from "./components/ResultsSection"
import { useQuiz } from "./hooks/useQuiz"
import { quizCategories } from "./data/categories"

export default function PujoQuizChallenge() {
  const {
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
    toggleExplanation,
    handleNextQuestion
  } = useQuiz();

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {currentScreen === "hero" && (
          <HeroSection 
            onStartQuiz={() => startQuiz()}
            onSelectCategory={() => setCurrentScreen("categories")}
          />
        )}
        {currentScreen === "categories" && (
          <CategorySelection 
            categories={quizCategories}
            onSelectCategory={(categoryId) => startQuiz(categoryId)}
            onGoBack={() => setCurrentScreen("hero")}
            onQuickPlay={() => startQuiz()}
          />
        )}
        {currentScreen === "quiz" && (
          <QuizSection 
            questions={filteredQuestions}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            timeLeft={timeLeft}
            quizStartTime={quizStartTime}
            answers={answers}
            showExplanation={showExplanation}
            onAnswerSelect={handleAnswerSelect}
            onAnswerSubmit={handleAnswerSubmit}
            onToggleExplanation={toggleExplanation}
            onNextQuestion={handleNextQuestion}
          />
        )}
        {currentScreen === "results" && (
          <ResultsSection 
            score={score}
            questions={filteredQuestions}
            answers={answers}
            totalTime={totalTime}
            onResetQuiz={resetQuiz}
            onShareScore={shareScore}
          />
        )}
      </AnimatePresence>
    </div>
  );
}