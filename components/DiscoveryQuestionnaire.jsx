"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/ui/typography" // Fixed import path - lowercase "typography"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

/**
 * Animation variants for question transitions
 */
const fadeInOut = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

/**
 * DiscoveryQuestionnaire component
 * Interactive questionnaire to assess mindfulness and self-awareness
 * Now connected to backend API
 */
export function DiscoveryQuestionnaire({ onComplete, onClose }) {
  const router = useRouter()

  // State for questions, current question, and user answers
  const [questions, setQuestions] = useState([])
  const [categories, setCategories] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch questions from backend on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await api.get("/discovery_questions")

        if (response.data && Array.isArray(response.data)) {
          setQuestions(response.data)

          // Extract unique categories if they exist in the response
          const uniqueCategories = [...new Set(response.data.map((q) => q.category).filter(Boolean))]

          setCategories(uniqueCategories.length > 0 ? uniqueCategories : ["Questions"])
          setError(null)
        } else {
          setError("Invalid response format from server")
        }
      } catch (err) {
        console.error("Error fetching questions:", err)
        setError("Failed to load questions. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Get current question and related data
  const currentQuestion = questions[currentQuestionIndex] || {}
  const currentCategory = currentQuestion.category || categories[0] || "Questions"
  const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  /**
   * Handle user selecting an answer
   */
  const handleAnswer = (answer, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answer: answer,
        optionIndex: optionIndex,
      },
    }))

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  /**
   * Navigate to next question
   */
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  /**
   * Navigate to previous question
   */
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  /**
   * Jump to first question in a category
   */
  const handleCategoryClick = (category) => {
    const index = questions.findIndex((q) => q.category === category)
    if (index !== -1) {
      setCurrentQuestionIndex(index)
    }
  }

  /**
   * Submit questionnaire answers to backend
   */
  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      // Format answers for the API
      const formattedAnswers = Object.values(answers).map((answer) => ({
        question_id: answer.questionId,
        selected_option: answer.optionIndex,
      }))

      // Send answers to backend
      const response = await api.post("/user_responses_api/", {
        responses: formattedAnswers,
      })

      console.log("Submission successful:", response.data)

      // Call onComplete callback if provided
      if (onComplete) onComplete()

      // Close questionnaire if onClose provided
      if (onClose) onClose()

      // Redirect to dashboard if no callbacks provided
      if (!onComplete && !onClose) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Error submitting answers:", err)
      setError("Failed to submit your answers. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-black/80 backdrop-blur-md text-dark-slate dark:text-off-white p-8 rounded-3xl shadow-xl max-w-4xl w-full mx-auto flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-rich-teal mb-4" />
        <Typography variant="h3" className="text-center">
          Loading questions...
        </Typography>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white dark:bg-black/80 backdrop-blur-md text-dark-slate dark:text-off-white p-8 rounded-3xl shadow-xl max-w-4xl w-full mx-auto">
        <Typography variant="h3" className="mb-6 text-center text-red-500">
          Error
        </Typography>
        <Typography className="text-center mb-6">{error}</Typography>
        <div className="flex justify-center">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // Show empty state if no questions
  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-black/80 backdrop-blur-md text-dark-slate dark:text-off-white p-8 rounded-3xl shadow-xl max-w-4xl w-full mx-auto">
        <Typography variant="h3" className="mb-6 text-center text-rich-teal dark:text-pale-cyan">
          No Questions Available
        </Typography>
        <Typography className="text-center mb-6">
          There are no questions available at this time. Please check back later.
        </Typography>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-black/80 backdrop-blur-md text-dark-slate dark:text-off-white p-8 rounded-3xl shadow-xl max-w-4xl w-full mx-auto"
    >
      <Typography variant="h2" className="mb-6 text-center text-rich-teal dark:text-pale-cyan">
        Discovery Questionnaire
      </Typography>

      {/* Category navigation - only show if we have categories */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategory === category
                  ? "bg-rich-teal text-off-white"
                  : "bg-pale-cyan/20 text-rich-teal hover:bg-pale-cyan/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <Progress value={progress} className="mb-8" />

      <AnimatePresence mode="wait">
        <motion.div key={currentQuestionIndex} {...fadeInOut} className="space-y-8">
          <Typography variant="h3" className="mb-4 text-center">
            {currentQuestion.text || "No question text available"}
          </Typography>
          <div className="space-y-4">
            {/* Generate options - either from the question or default options */}
            {(currentQuestion.options || ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]).map(
              (option, index) => (
                <motion.button
                  key={option}
                  onClick={() => handleAnswer(option, index)}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    answers[currentQuestion.id]?.answer === option ? "bg-rich-teal text-off-white" : "bg-pale-cyan/10"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor:
                      answers[currentQuestion.id]?.answer === option ? "#006D77" : "rgba(131, 197, 190, 0.3)",
                    transition: { duration: 0.1 },
                  }}
                  animate={{
                    boxShadow:
                      answers[currentQuestion.id]?.answer === option
                        ? [
                            "0 0 0 3px rgba(0, 109, 119, 0.1)",
                            "0 0 0 6px rgba(0, 109, 119, 0.1)",
                            "0 0 0 3px rgba(0, 109, 119, 0.1)",
                          ]
                        : "none",
                  }}
                  transition={{
                    boxShadow: {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    },
                  }}
                >
                  {option}
                </motion.button>
              ),
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        {currentQuestionIndex > 0 && (
          <Button onClick={handlePrevious} variant="outline" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={handleNext} className="ml-auto flex items-center" disabled={!answers[currentQuestion.id]}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="ml-auto" disabled={submitting || !answers[currentQuestion.id]}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </div>
    </motion.div>
  )
}
