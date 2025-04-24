"use client"
import React from "react"
import Link from "next/link"
import { BookOpen, BarChart2, Smile, Layout, ChevronRight } from "lucide-react"
import { ClientThemeToggle } from "@/components/ClientThemeToggle"
import { Typography } from "@/components/ui/Typography"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ProfileDialog } from "@/components/ProfileDialog"
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
}
export default function DynamicHomePage() {
  const [mounted, setMounted] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Shapes */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-rich-teal/10 rounded-full mix-blend-multiply filter blur-xl animate-slow-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-light-teal/10 rounded-full mix-blend-multiply filter blur-xl animate-slow-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pale-peach/10 rounded-full mix-blend-multiply filter blur-xl animate-slow-blob animation-delay-4000" />
      </div>

      <div className="bg-gradient-to-br from-off-white to-pale-cyan dark:from-dark-slate dark:to-rich-teal text-dark-slate dark:text-off-white min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rich-teal/90 backdrop-blur-sm text-off-white p-4 shadow-lg sticky top-0 z-50"
        >
          <div className="container mx-auto flex justify-between items-center">
            <Typography variant="h2" className="font-bold">
              Prajnayana
            </Typography>
            <nav className="flex items-center space-x-6">
              <Link href="#" className="font-sans text-body hover:text-soft-peach transition-colors">
                Dashboard
              </Link>
              <Link href="#" className="font-sans text-body hover:text-soft-peach transition-colors">
                Journal
              </Link>
              <button
                onClick={() => setProfileOpen(true)}
                className="font-sans text-body hover:text-soft-peach transition-colors"
              >
                Profile
              </button>
              <ClientThemeToggle />
            </nav>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-8 py-16">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
            <motion.div variants={item} className="text-center space-y-6">
              <Typography variant="h1" className="font-bold text-rich-teal dark:text-pale-cyan">
                Discover Your Inner Wisdom
              </Typography>
              <Typography variant="body" className="max-w-2xl mx-auto text-light-slate dark:text-off-white/80">
                Begin your journey to mindfulness and self-discovery with Prajnayana. Our platform provides the tools
                and guidance you need to cultivate inner peace and personal growth.
              </Typography>
            </motion.div>

            {/* Feature Cards */}
            <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((card, index) => (
                <FeatureCard key={index} {...card} />
              ))}
            </motion.div>

            {/* Daily Inspiration */}
            <motion.div variants={item} className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-pale-cyan to-soft-peach dark:from-rich-teal dark:to-muted-coral opacity-10" />
              <div className="relative bg-white/40 dark:bg-black/20 backdrop-blur-sm p-8 text-center rounded-2xl border border-white/20">
                <Typography variant="h3" className="font-semibold mb-4 text-rich-teal dark:text-off-white">
                  Daily Inspiration
                </Typography>
                <Typography variant="body" className="italic text-dark-slate dark:text-off-white">
                  "The journey of a thousand miles begins with a single step."
                </Typography>
                <Typography variant="small" className="mt-2 text-dark-slate/80 dark:text-off-white/80">
                  - Lao Tzu
                </Typography>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={item} className="text-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="font-semibold bg-rich-teal hover:bg-light-teal text-off-white px-8 py-6 text-lg rounded-full"
                >
                  Begin Your Journey
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-rich-teal/90 backdrop-blur-sm text-off-white p-6 mt-12"
        >
          <div className="container mx-auto text-center">
            <Typography variant="small">&copy; 2024 Prajnayana. Nurturing wisdom and resilience.</Typography>
          </div>
        </motion.footer>
        {/* Profile Dialog */}
        <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      </div>
    </div>
  )
}
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div variants={item} whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-white to-pale-cyan dark:from-dark-slate dark:to-rich-teal opacity-10" />
    <div className="relative bg-white/40 dark:bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/20 h-full">
      <Icon className="w-12 h-12 text-rich-teal dark:text-pale-cyan mb-4" />
      <Typography variant="h3" className="font-semibold mb-2 text-rich-teal dark:text-pale-cyan">
        {title}
      </Typography>
      <Typography variant="body" className="text-dark-slate/80 dark:text-off-white/80 mb-4">
        {description}
      </Typography>
      <Link
        href="#"
        className="font-sans text-body font-semibold text-muted-coral hover:text-muted-coral/80 inline-flex items-center"
      >
        Learn more <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </motion.div>
)
const featureCards = [
  {
    icon: BookOpen,
    title: "Journaling",
    description: "Capture your thoughts and gain clarity through reflective writing.",
  },
  {
    icon: BarChart2,
    title: "Habit Tracker",
    description: "Build consistency and achieve your goals, one habit at a time.",
  },
  {
    icon: Smile,
    title: "Mood Insights",
    description: "Track emotions and discover patterns for better self-understanding.",
  },
  {
    icon: Layout,
    title: "Vision Board",
    description: "Visualize your aspirations and manifest your dreams into reality.",
  },
]
