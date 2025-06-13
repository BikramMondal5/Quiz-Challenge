// Contains the Question card component for the quiz
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, CardHeader, CardTitle, CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Info } from "lucide-react";
import { QuizQuestion } from "../types";

interface QuestionCardProps {
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showAnswer: boolean;
  timeLeft: number;
  quizStartTime: number;
  answers: number[];
  showExplanation: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onAnswerSubmit: () => void;
  onToggleExplanation: () => void;
}

export function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  showAnswer,
  timeLeft,
  quizStartTime,
  answers,
  showExplanation,
  onAnswerSelect,
  onAnswerSubmit,
  onToggleExplanation
}: QuestionCardProps) {
  // Extract the question card part from the renderQuiz function
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-purple-700">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-purple-600"}`}>{timeLeft}s</span>
          </div>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-purple-100"
          style={{ 
            '--progress-background': 'linear-gradient(to right, rgb(168, 85, 247), rgb(79, 70, 229))'
          } as React.CSSProperties} 
        />
      </div>

      {/* Question Card */}
      <Card className="mb-6 shadow-xl border-0 bg-white/90 backdrop-blur-md shadow-purple-100/50 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-100/50 to-indigo-100/50 rounded-t-lg">
          <CardTitle className="text-xl text-purple-900">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 backdrop-blur-sm text-purple-800 "

              if (showAnswer) {
                if (index === question.correct) {
                  buttonClass += "border-green-500 bg-green-50/90 text-green-800"
                } else if (index === selectedAnswer && index !== question.correct) {
                  buttonClass += "border-red-500 bg-red-50/90 text-red-800"
                } else {
                  buttonClass += "border-purple-200 bg-purple-50/30 text-purple-400"
                }
              } else if (selectedAnswer === index) {
                buttonClass += "border-purple-500 bg-purple-50/80 text-purple-800"
              } else {
                buttonClass += "border-purple-200 hover:border-purple-300 hover:bg-purple-50/50"
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => onAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showAnswer}
                  whileTap={{ scale: showAnswer ? 1 : 0.98 }}
                  whileHover={showAnswer ? {} : { scale: 1.01, boxShadow: "0 4px 12px rgba(124, 58, 237, 0.1)" }}
                  animate={selectedAnswer === index && !showAnswer ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  aria-pressed={selectedAnswer === index}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                      {showAnswer && index === question.correct && <CheckCircle className="h-4 w-4" />}
                      {showAnswer && index === selectedAnswer && index !== question.correct && (
                        <XCircle className="h-4 w-4" />
                      )}
                    </div>
                    {option}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation section */}
          <AnimatePresence>
            {showAnswer && showExplanation && question.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-indigo-50/80 backdrop-blur-sm border border-indigo-100 rounded-lg"
              >
                <h4 className="font-medium text-indigo-800 mb-1 flex items-center">
                  <Info className="h-4 w-4 mr-2" /> Explanation
                </h4>
                <p className="text-indigo-700 text-sm">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Bottom Action Buttons */}
      <div className="flex justify-between items-center">
        {showAnswer && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleExplanation}
            className="text-indigo-600 border-indigo-200 hover:bg-indigo-50/50 backdrop-blur-sm"
          >
            {showExplanation ? "Hide" : "Show"} Explanation
          </Button>
        )}
        
        {!showAnswer ? (
          <Button
            onClick={onAnswerSubmit}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:shadow-lg ml-auto disabled:from-purple-400 disabled:to-indigo-400 backdrop-blur-sm"
          >
            {currentQuestion === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        ) : (
          <p className="ml-auto text-indigo-600">
            Next question in {Math.ceil((3000 - (Date.now() - (quizStartTime + answers.length * 3000))) / 1000)}s...
          </p>
        )}
      </div>
    </div>
  );
}