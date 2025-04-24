"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pale-cyan to-soft-peach dark:from-rich-teal dark:to-dark-slate"
    >
      <div className="absolute inset-0">
        {/* Add your illustration background here */}
        <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-rich-teal dark:text-pale-cyan"
        >
          Discover Your Inner Journey with Prajnayana
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-dark-slate dark:text-off-white"
        >
          Embark on a transformative path to mindfulness, self-discovery, and personal growth.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-rich-teal hover:bg-rich-teal/90 text-off-white px-8 py-6 text-lg rounded-full"
            >
              Begin Your Journey
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-pale-cyan rounded-full opacity-50"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-soft-peach rounded-full opacity-50"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.section>
  )
}
