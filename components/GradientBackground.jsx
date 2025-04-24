"use client"
import { motion } from "framer-motion"
/**
 * GradientBackground component
 * Provides a consistent animated gradient background
 */
export function GradientBackground({ animate = true, intensity = "medium", className = "" }) {
  // Set opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case "light":
        return 0.1
      case "medium":
        return 0.2
      case "strong":
        return 0.3
      default:
        return 0.2
    }
  }
  const opacity = getOpacity()
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {animate ? (
        <>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [opacity, opacity * 1.5, opacity],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-rich-teal/${Math.round(opacity * 100)} rounded-full filter blur-3xl`}
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [opacity, opacity * 1.3, opacity],
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted-coral/${Math.round(opacity * 100)} rounded-full filter blur-3xl`}
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [opacity * 0.8, opacity * 1.2, opacity * 0.8],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
            className={`absolute top-2/3 left-1/3 w-72 h-72 bg-pale-cyan/${Math.round(opacity * 80)} rounded-full filter blur-3xl`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-rich-teal/${Math.round(opacity * 100)} rounded-full filter blur-3xl`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted-coral/${Math.round(opacity * 100)} rounded-full filter blur-3xl`}
          />
          <div
            className={`absolute top-2/3 left-1/3 w-72 h-72 bg-pale-cyan/${Math.round(opacity * 80)} rounded-full filter blur-3xl`}
          />
        </>
      )}
    </div>
  )
}
