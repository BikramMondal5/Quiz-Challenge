"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Clock,
  Share2,
  RotateCcw,
  Crown,
  Music,
  BookOpen,
  Utensils,
  CheckCircle,
  XCircle,
  Play,
  Info,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import confetti from 'canvas-confetti'

// Type definitions for better code quality
interface QuizCategory {
  id: string
  title: string
  icon: React.ElementType
  description: string
  color: string
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  explanation?: string
}

interface LeaderboardEntry {
  name: string
  score: number
  avatar: string
  date?: string
}

// Screen types
type ScreenType = "hero" | "categories" | "quiz" | "results"

// Mock quiz data
const quizCategories: QuizCategory[] = [
  {
    id: "durga-trivia",
    title: "Durga Trivia",
    icon: Crown,
    description: "Test your knowledge about Maa Durga",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "festival-foods",
    title: "Festival Foods",
    icon: Utensils,
    description: "Bengali delicacies and traditions",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "bengali-culture",
    title: "Bengali Culture",
    icon: Music,
    description: "Art, music, and cultural heritage",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: "puja-history",
    title: "History of Puja",
    icon: BookOpen,
    description: "Origins and evolution of Durga Puja",
    color: "from-blue-400 to-indigo-500",
  },
]

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How many days does Durga Puja traditionally last?",
    options: ["3 days", "5 days", "7 days", "10 days"],
    correct: 1,
    category: "durga-trivia",
    explanation: "Durga Puja is traditionally celebrated over five days: Shashthi, Saptami, Ashtami, Navami, and Vijayadashami (Dashami)."
  },
  {
    id: 2,
    question: "What is the traditional sweet offered to Maa Durga?",
    options: ["Rasgulla", "Sandesh", "Kheer", "All of the above"],
    correct: 3,
    category: "festival-foods",
    explanation: "All these sweets are traditionally offered during Durga Puja as bhog and prasad."
  },
  {
    id: 3,
    question: "Which day is known as 'Mahalaya'?",
    options: ["Start of Durga Puja", "End of Pitru Paksha", "Invocation of Maa Durga", "All of the above"],
    correct: 3,
    category: "puja-history",
    explanation: "Mahalaya marks the end of Pitru Paksha, the beginning of Devi Paksha, and includes the invocation of Goddess Durga."
  },
  {
    id: 4,
    question: "What instrument is traditionally played during Durga Puja?",
    options: ["Dhol", "Tabla", "Harmonium", "Flute"],
    correct: 0,
    category: "bengali-culture",
    explanation: "Dhol, a cylindrical drum, is an essential instrument played during Durga Puja celebrations."
  },
  {
    id: 5,
    question: "On which day is 'Sindoor Khela' celebrated?",
    options: ["Saptami", "Ashtami", "Navami", "Dashami"],
    correct: 3,
    category: "durga-trivia",
    explanation: "Sindoor Khela is celebrated on Vijayadashami (Dashami), the last day of Durga Puja before the idol immersion."
  },
  {
    id: 6,
    question: "Which river is traditionally used for the immersion of Durga idols in Kolkata?",
    options: ["Ganga", "Yamuna", "Brahmaputra", "Hoogly"],
    correct: 3,
    category: "puja-history",
    explanation: "In Kolkata, the Durga idols are traditionally immersed in the Hoogly River, which is a distributary of the Ganga."
  },
  {
    id: 7,
    question: "What is 'Dhunuchi Naach'?",
    options: ["A folk dance", "A ritual dance with incense burners", "A classical dance form", "A prayer ceremony"],
    correct: 1,
    category: "bengali-culture",
    explanation: "Dhunuchi Naach is a ritual dance performed with incense burners (dhunuchi) during the evening aarti of Durga Puja."
  },
  {
    id: 8,
    question: "Which Bengali sweet is shaped like a conch shell?",
    options: ["Sandesh", "Pantua", "Shankha Sandesh", "Rasmalai"],
    correct: 2,
    category: "festival-foods",
    explanation: "Shankha Sandesh is a Bengali sweet shaped like a conch shell (shankha), which is considered auspicious."
  },
  {
    id: 9,
    question: "What is the significance of 'Kumari Puja' during Durga Puja?",
    options: ["Worshipping young girls", "A special ritual for unmarried women", "Worship of a pre-pubescent girl as a form of Goddess Durga", "A ritual for the prosperity of daughters"],
    correct: 2,
    category: "durga-trivia",
    explanation: "In Kumari Puja, a pre-pubescent girl is worshipped as an embodiment of the divine feminine energy (Shakti) of Goddess Durga."
  },
  {
    id: 10,
    question: "Which famous poet wrote 'Mahishasura Mardini', a script for a radio program about Durga Puja?",
    options: ["Rabindranath Tagore", "Kazi Nazrul Islam", "Sarat Chandra Chattopadhyay", "Bankim Chandra Chatterjee"],
    correct: 0,
    category: "bengali-culture",
    explanation: "The radio program 'Mahishasura Mardini' was scripted by Rabindranath Tagore and is traditionally broadcast on Mahalaya."
  },
]

// Get mock leaderboard data but with dates
const getLeaderboardData = (): LeaderboardEntry[] => [
  { name: "Priya Das", score: 95, avatar: "/placeholder.svg?height=40&width=40", date: "June 11, 2025" },
  { name: "Arjun Sen", score: 92, avatar: "/placeholder.svg?height=40&width=40", date: "June 11, 2025" },
  { name: "Meera Roy", score: 88, avatar: "/placeholder.svg?height=40&width=40", date: "June 10, 2025" },
  { name: "Rahul Ghosh", score: 85, avatar: "/placeholder.svg?height=40&width=40", date: "June 10, 2025" },
  { name: "Ananya Bose", score: 82, avatar: "/placeholder.svg?height=40&width=40", date: "June 9, 2025" },
  { name: "Ravi Sharma", score: 80, avatar: "/placeholder.svg?height=40&width=40", date: "June 12, 2025" },
  { name: "Sunita Patel", score: 78, avatar: "/placeholder.svg?height=40&width=40", date: "June 8, 2025" },
  { name: "Dev Kumar", score: 75, avatar: "/placeholder.svg?height=40&width=40", date: "June 11, 2025" },
  { name: "Kavita Joshi", score: 72, avatar: "/placeholder.svg?height=40&width=40", date: "June 9, 2025" },
  { name: "Amit Verma", score: 70, avatar: "/placeholder.svg?height=40&width=40", date: "June 7, 2025" },
]

// Animation variants for screens
const screenVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

export default function PujoQuizChallenge() {
  // State management
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("hero")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState<number>(0)
  const [totalTime, setTotalTime] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([])
  const { toast } = useToast()

  // Load previous scores from localStorage
  useEffect(() => {
    try {
      const savedScores = localStorage.getItem('pujoQuizScores')
      if (savedScores) {
        // We could use this data to display user's previous scores
        console.log('Previous scores loaded')
      }
    } catch (error) {
      console.error('Error loading saved scores:', error)
    }
  }, [])

  // Filter questions based on selected category
  useEffect(() => {
    if (selectedCategory && selectedCategory !== '') {
      setFilteredQuestions(quizQuestions.filter(q => q.category === selectedCategory))
    } else {
      // Shuffle questions for mixed mode
      setFilteredQuestions([...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5))
    }
  }, [selectedCategory])

  // Timer effect
  useEffect(() => {
    if (currentScreen === "quiz" && timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showAnswer) {
      handleAnswerSubmit()
    }
  }, [timeLeft, currentScreen, showAnswer])

  // Save score to localStorage when quiz ends
  useEffect(() => {
    if (currentScreen === "results") {
      try {
        const savedScores = JSON.parse(localStorage.getItem('pujoQuizScores') || '[]')
        const newScore = {
          score,
          date: new Date().toISOString(),
          category: selectedCategory,
          timeSpent: totalTime
        }
        localStorage.setItem('pujoQuizScores', JSON.stringify([...savedScores, newScore]))
      } catch (error) {
        console.error('Error saving score:', error)
      }
    }
  }, [currentScreen, score, selectedCategory, totalTime])

  // Trigger confetti when reaching results screen
  useEffect(() => {
    if (currentScreen === "results") {
      triggerConfetti()
    }
  }, [currentScreen])

  const triggerConfetti = useCallback(() => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since they're launched randomly, these won't look too weird even if extras overlap
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }, [])

  const startQuiz = (categoryId?: string) => {
    const category = categoryId || ""
    setSelectedCategory(category)
    
    toast({
      title: "Quiz Started!",
      description: categoryId 
        ? `Starting ${quizCategories.find(c => c.id === categoryId)?.title} quiz` 
        : "Starting mixed category quiz",
      variant: "default",
    })

    // Allow the toast to be visible briefly before changing screens
    setTimeout(() => {
      setCurrentScreen("quiz")
      setCurrentQuestion(0)
      setAnswers([])
      setScore(0)
      setTimeLeft(30)
      setQuizStartTime(Date.now())
    }, 500)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleAnswerSubmit = () => {
    const currentQ = filteredQuestions[currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correct

    if (isCorrect) {
      setScore(score + 20)
    }

    setAnswers([...answers, selectedAnswer || -1])
    setShowAnswer(true)

    setTimeout(() => {
      if (currentQuestion < filteredQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowAnswer(false)
        setShowExplanation(false)
        setTimeLeft(30)
      } else {
        setTotalTime(Math.round((Date.now() - quizStartTime) / 1000))
        setCurrentScreen("results")
      }
    }, 3000)
  }

  const resetQuiz = () => {
    setCurrentScreen("hero")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setScore(0)
    setTimeLeft(30)
    setShowAnswer(false)
    setShowExplanation(false)
  }

  const shareScore = async () => {
    const text = `I scored ${score}% on the Pujo IQ Quiz! 🎉 Every quiz helps support our community initiatives. #ProjectTrinoyon #PujoIQ`
    
    try {
      if (navigator.share) {
        await navigator.share({ text })
        toast({ title: "Shared successfully!", variant: "success" })
      } else {
        await navigator.clipboard.writeText(text)
        toast({ 
          title: "Text copied to clipboard!", 
          description: "Now you can paste it anywhere to share your score",
          variant: "success" 
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast({ 
        title: "Couldn't share", 
        description: "There was a problem sharing your score",
        variant: "destructive"
      })
    }
  }

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation)
  }

  const renderHeroSection = () => (
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
              onClick={() => setCurrentScreen("categories")}
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl transform hover:scale-105 transition-all duration-200 border-0 backdrop-blur-sm bg-opacity-80 hover:shadow-fuchsia-500/30"
              aria-label="Choose a quiz category"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
            <Button
              onClick={() => startQuiz()}
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-md py-4 px-8 rounded-2xl text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 hover:from-blue-600/60 hover:to-indigo-600/60"
              aria-label="Start a random quiz right away"
            >
              Quick Play
            </Button>
          </div>
        </div>

        {/* Leaderboard Preview with Glassmorphism */}
        <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-3">
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-300" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {getLeaderboardData().slice(0, 3).map((player, index) => (
                <motion.div 
                  key={player.name} 
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 backdrop-filter backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback>
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white font-medium">{player.name}</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-300 text-purple-900">
                    {player.score}%
                  </Badge>
                </motion.div>
              ))}
            </div>
            <p className="text-blue-200 text-sm mt-4 text-center">
              Join our daily quiz challenge to get featured!
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const renderCategories = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-16"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={screenVariants}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">Choose Your Challenge</h2>
          <p className="text-lg text-purple-700">Select a category to test your knowledge</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quizCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl h-full border-transparent backdrop-blur-sm bg-white/80 hover:bg-white/90 shadow-lg"
                  onClick={() => startQuiz(category.id)}
                >
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-purple-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-purple-600">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={() => startQuiz()} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-8 rounded-xl backdrop-blur-sm bg-opacity-90 shadow-lg hover:shadow-purple-500/30">
            Mixed Questions
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentScreen("hero")} 
            className="ml-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100 backdrop-blur-sm"
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )

  const renderQuiz = () => {
    if (filteredQuestions.length === 0) return <div>Loading questions...</div>
    
    const currentQ = filteredQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100

    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={screenVariants}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-700">
                Question {currentQuestion + 1} of {filteredQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-purple-600"}`}>{timeLeft}s</span>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-purple-100" indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500" />
          </div>

          {/* Question Card */}
          <Card className="mb-6 shadow-xl border-0 bg-white/90 backdrop-blur-md shadow-purple-100/50 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-100/50 to-indigo-100/50 rounded-t-lg">
              <CardTitle className="text-xl text-purple-900">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-3">
                {currentQ.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 backdrop-blur-sm "

                  if (showAnswer) {
                    if (index === currentQ.correct) {
                      buttonClass += "border-green-500 bg-green-50/90 text-green-800"
                    } else if (index === selectedAnswer && index !== currentQ.correct) {
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
                      onClick={() => handleAnswerSelect(index)}
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
                          {showAnswer && index === currentQ.correct && <CheckCircle className="h-4 w-4" />}
                          {showAnswer && index === selectedAnswer && index !== currentQ.correct && (
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
                {showAnswer && showExplanation && currentQ.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-indigo-50/80 backdrop-blur-sm border border-indigo-100 rounded-lg"
                  >
                    <h4 className="font-medium text-indigo-800 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-2" /> Explanation
                    </h4>
                    <p className="text-indigo-700 text-sm">{currentQ.explanation}</p>
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
                onClick={toggleExplanation}
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50/50 backdrop-blur-sm"
              >
                {showExplanation ? "Hide" : "Show"} Explanation
              </Button>
            )}
            
            {!showAnswer ? (
              <Button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:shadow-lg ml-auto disabled:from-purple-400 disabled:to-indigo-400 backdrop-blur-sm"
              >
                {currentQuestion === filteredQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            ) : (
              <p className="ml-auto text-indigo-600">
                Next question in {Math.ceil((3000 - (Date.now() - (quizStartTime + answers.length * 3000))) / 1000)}s...
              </p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const renderResults = () => {
    const totalPoints = filteredQuestions.length * 20
    const accuracy = Math.round((score / totalPoints) * 100)
    const leaderboardData = getLeaderboardData()

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
                      {answers.filter((a, i) => a === filteredQuestions[i].correct).length}
                    </div>
                    <div className="text-xs">Correct</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-400">
                      {answers.filter((a, i) => a !== filteredQuestions[i].correct && a !== -1).length}
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
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <Button
                  onClick={resetQuiz}
                  className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-purple-900 font-bold py-3 rounded-xl shadow-lg hover:shadow-amber-500/30 backdrop-blur-sm"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
                <Button
                  onClick={shareScore}
                  variant="outline"
                  className="flex-1 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm py-3 rounded-xl font-semibold"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Score
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Leaderboard with Glassmorphism */}
          <Card className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden">
            <CardHeader className="border-b border-white/10 pb-3">
              <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-yellow-300" />
                Top 10 Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {leaderboardData.map((player, index) => (
                  <motion.div 
                    key={player.name} 
                    className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-900"
                          : index === 1
                            ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700"
                            : index === 2
                              ? "bg-gradient-to-r from-orange-400 to-amber-600 text-white"
                              : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <p className="text-white font-medium">{player.name}</p>
                        {player.date && <p className="text-white/60 text-xs">{player.date}</p>}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-300 to-amber-400 text-purple-900">
                      {player.score}%
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-blue-200 text-sm mt-4">
                Top 10 scorers of the week get featured on our Pujo Wall! 🏆
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {currentScreen === "hero" && renderHeroSection()}
        {currentScreen === "categories" && renderCategories()}
        {currentScreen === "quiz" && renderQuiz()}
        {currentScreen === "results" && renderResults()}
      </AnimatePresence>
    </div>
  )
}
