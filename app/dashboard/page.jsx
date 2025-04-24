"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import { Edit, CheckCircle, Calendar, ChevronRight, StickyNote, BookMarked, Brain, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import { GradientBackground } from "@/components/ui/GradientBackground"
import { FadeIn } from "@/components/FadeIn"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

/**
 * Widget component for dashboard cards
 */
const Widget = ({ title, icon, children, linkTo, linkText, className = "" }) => (
  <FadeIn
    className={`bg-gradient-to-br from-rich-teal/10 to-pale-cyan/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden ${className}`}
  >
    <div className="p-5">
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>

      {/* Widget Content */}
      <div className="mb-4">{children}</div>

      {/* Widget Footer Link */}
      <Link href={linkTo} className="block">
        <Button
          variant="outline"
          className="w-full border-white/10 hover:bg-white/10 flex items-center justify-between"
        >
          {linkText}
          <ChevronRight size={16} />
        </Button>
      </Link>
    </div>
  </FadeIn>
)

/**
 * DashboardPage component
 *
 * Main dashboard showing user's personal data and activity.
 * Displays widgets for journaling, habit tracking, vision board,
 * and other features.
 */
export default function DashboardPage() {
  // Initialize state with default values
  const [initialJournalEntries, setInitialJournalEntries] = useState([])
  const [initialHabits, setInitialHabits] = useState([])
  const [initialNotes, setInitialNotes] = useState([])

  // Load data from localStorage on component mount, using the initialized state
  const [journalEntries, setJournalEntries] = useLocalStorage("journalEntries", initialJournalEntries)
  const [habits, setHabits] = useLocalStorage("habits", initialHabits)
  const [notes, setNotes] = useLocalStorage("visionBoardNotes", initialNotes)
  const [moodEntries, setMoodEntries] = useState([])

  // Load sample mood data on component mount
  useEffect(() => {
    // Sample mood data (would come from storage in a real app)
    setMoodEntries([
      { date: "2023-05-01", mood: "😊", value: 4 },
      { date: "2023-05-02", mood: "😐", value: 3 },
      { date: "2023-05-03", mood: "🙂", value: 3.5 },
      { date: "2023-05-04", mood: "😄", value: 4.5 },
      { date: "2023-05-05", mood: "😃", value: 4 },
    ])
  }, [])

  /**
   * Helper functions for dashboard data
   */
  const getTodayKey = () => new Date().toISOString().split("T")[0]
  const getCompletedHabitsCount = () => {
    const todayKey = getTodayKey()
    return habits.filter((habit) => habit.completions[todayKey]).length
  }
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const getLatestJournalEntry = () => {
    if (journalEntries.length === 0) return null
    return journalEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
  }
  const getRecentNotes = (count = 2) => notes.slice(0, count)

  // Sample data for knowledge hub and book recommendations
  const knowledgeHubData = {
    featuredArticle: {
      title: "Understanding Mindfulness Meditation",
      image: "/placeholder.svg?height=200&width=300&text=Mindfulness",
    },
    progress: 35, // Percentage of completed topics
  }
  const bookRecommendation = {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    quote: "Realize deeply that the present moment is all you have.",
    coverImage: "/placeholder.svg?height=200&width=150&text=Book+Cover",
  }

  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div className="min-h-screen bg-black text-off-white flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null // Or a "redirecting..." message
  }

  return (
    <Layout>
      <div className="bg-black text-off-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 px-4 overflow-hidden bg-black">
          <div className="absolute inset-0">
            <GradientBackground intensity="medium" />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <PageHeader title="Welcome Back" subtitle="Your personal dashboard for mindfulness and growth" />
            </motion.div>
          </div>
        </section>

        {/* Dashboard Widgets */}
        <section className="py-8 px-4 pb-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Journal Widget */}
              <Widget
                title="Pathway to Clarity"
                icon={<Edit className="w-5 h-5 text-white" />}
                linkTo="/journaling"
                linkText="Open Journal"
              >
                {getLatestJournalEntry() ? (
                  <div>
                    <div className="text-sm text-white/60 mb-1">
                      Last entry: {formatDate(getLatestJournalEntry().createdAt)}
                    </div>
                    <p className="line-clamp-2 text-white/90">{getLatestJournalEntry().content}</p>
                    <div className="mt-2">
                      <Link href="/journaling" className="text-rich-teal hover:underline text-sm">
                        Continue Journaling
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Edit className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60">Start your journaling practice today</p>
                  </div>
                )}
              </Widget>

              {/* Habit Tracker Widget */}
              <Widget
                title="Daily Flow"
                icon={<CheckCircle className="w-5 h-5 text-white" />}
                linkTo="/habit-tracker"
                linkText="View Full Tracker"
              >
                {habits.length > 0 ? (
                  <div>
                    {/* Progress Summary */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/60">Today's Progress</span>
                      <span className="text-sm font-medium">
                        {getCompletedHabitsCount()} / {habits.length} completed
                      </span>
                    </div>

                    {/* Habit List */}
                    <div className="space-y-2">
                      {habits.slice(0, 3).map((habit) => {
                        const isCompleted = habit.completions[getTodayKey()]
                        return (
                          <div key={habit.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full mr-2 ${isCompleted ? "bg-rich-teal" : "bg-white/20"}`}
                              />
                              <span className={isCompleted ? "line-through opacity-60" : ""}>{habit.name}</span>
                            </div>
                            {habit.streak > 0 && (
                              <div className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center">
                                <TrendingUp size={10} className="mr-1" />
                                {habit.streak}
                              </div>
                            )}
                          </div>
                        )
                      })}
                      {habits.length > 3 && (
                        <div className="text-xs text-white/60 text-right">+{habits.length - 3} more habits</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60">Create habits to track your progress</p>
                  </div>
                )}
              </Widget>

              {/* Vision Board Widget */}
              <Widget
                title="Your Mindful Canvas"
                icon={<StickyNote className="w-5 h-5 text-white" />}
                linkTo="/vision-board"
                linkText="Go to Vision Board"
              >
                {notes.length > 0 ? (
                  <div>
                    {/* Note Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {getRecentNotes().map((note) => (
                        <div
                          key={note.id}
                          className={`p-2 rounded text-xs ${
                            note.type === "AFFIRMATION"
                              ? "bg-blue-900/30 border border-blue-700/50"
                              : note.type === "QUOTE"
                                ? "bg-green-900/30 border border-green-700/50"
                                : note.type === "WIN"
                                  ? "bg-yellow-900/30 border border-yellow-700/50"
                                  : "bg-purple-900/30 border border-purple-700/50"
                          }`}
                        >
                          <p className="line-clamp-2">{note.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-white/60">
                      {notes.length} {notes.length === 1 ? "note" : "notes"} on your board
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <StickyNote className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60">Create your first vision board note</p>
                  </div>
                )}
              </Widget>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="py-8 px-4 pb-24">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-rich-teal to-pale-cyan bg-clip-text text-transparent">
                Additional Resources
              </h2>
              <p className="text-white/60">Explore our knowledge hub and book recommendations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Knowledge Hub Widget */}
              <Widget
                title="Wisdom Wormhole"
                icon={<Brain className="w-5 h-5 text-white" />}
                linkTo="/knowledge-hub"
                linkText="Explore More"
              >
                <div>
                  {/* Featured Article */}
                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={knowledgeHubData.featuredArticle.image || "/placeholder.svg"}
                      alt={knowledgeHubData.featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3">
                      <h4 className="text-sm font-medium">{knowledgeHubData.featuredArticle.title}</h4>
                    </div>
                  </div>

                  {/* Learning Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Learning Progress</span>
                      <span>{knowledgeHubData.progress}%</span>
                    </div>
                    <Progress value={knowledgeHubData.progress} className="h-2 bg-white/10" />
                  </div>
                </div>
              </Widget>

              {/* Book Recommendation Widget */}
              <Widget
                title="Inspired Reads"
                icon={<BookMarked className="w-5 h-5 text-white" />}
                linkTo="/book-recommendations"
                linkText="Open Library"
              >
                <div className="flex gap-3">
                  {/* Book Cover */}
                  <div className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={bookRecommendation.coverImage || "/placeholder.svg"}
                      alt={bookRecommendation.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Book Details */}
                  <div>
                    <h4 className="font-medium">{bookRecommendation.title}</h4>
                    <p className="text-sm text-white/60 mb-2">by {bookRecommendation.author}</p>
                    <p className="text-sm italic">"{bookRecommendation.quote}"</p>
                  </div>
                </div>
              </Widget>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
