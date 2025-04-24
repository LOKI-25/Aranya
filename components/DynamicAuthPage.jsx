"use client"
import React from "react"
import { AuthForm } from "@/components/AuthForm"
import { ClientThemeToggle } from "@/components/ClientThemeToggle"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
export default function DynamicAuthPage() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kalen-emsley-Bkci_8qcdvQ-unsplash%20(2).jpg-7GmqLwWhhkg6yRrXs1hfpUphZmgIDU.jpeg"
          alt="Mountain landscape"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-light-teal/30 via-rich-teal/20 to-pale-peach/20 dark:from-rich-teal/40 dark:via-dark-slate/30 dark:to-soft-peach/20 backdrop-blur-sm"
        />
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute top-0 -left-4 w-72 h-72 bg-rich-teal/30 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute top-0 -right-4 w-72 h-72 bg-light-teal/30 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pale-peach/30 rounded-full mix-blend-multiply filter blur-xl"
        />
      </div>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <ClientThemeToggle />
      </motion.div>

      {/* Back to Home */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <Link
          href="/"
          className="absolute top-4 left-4 text-rich-teal dark:text-off-white hover:text-light-teal dark:hover:text-soft-peach transition-colors z-10"
        >
          <span className="font-sans text-body">← Back to Home</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl p-8"
        >
          <AuthForm />
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block text-rich-teal dark:text-off-white"
        >
          <h1 className="font-serif text-h1 font-bold mb-6">Begin Your Journey to Mindfulness</h1>
          <p className="font-sans text-body">
            Join our community of mindful practitioners and discover the path to inner peace, self-awareness, and
            personal growth. Start your transformative journey with Prajnayana today.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
