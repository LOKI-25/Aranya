"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
/**
 * Unified GradientBackground component
 *
 * Provides consistent animated gradient backgrounds across all pages with
 * multiple variants and customization options.
 *
 * @example
 * // Default animated gradient
 * <GradientBackground />
 *
 * @example
 * // Starry night background with medium intensity
 * <GradientBackground variant="starry" intensity="medium" />
 *
 * @example
 * // Static minimal background
 * <GradientBackground variant="minimal" animate={false} />
 */
export function GradientBackground({ animate = true, intensity = "medium", variant = "default", className = "" }) {
  // State for viewport dimensions (used for starry variant)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [stars, setStars] = useState([])
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
  // Generate stars for starry variant
  useEffect(() => {
    if (variant !== "starry" || typeof window === "undefined") return
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    // Colors from the project's palette for star variety
    const colors = [
      "rgb(144, 205, 244)", // pale-cyan
      "rgb(0, 128, 128)", // rich-teal
      "rgb(240, 128, 128)", // light-coral
      "rgb(233, 150, 122)", // muted-coral
      "rgb(255, 218, 185)", // soft-peach
    ]
    // Generate stars based on screen size
    const newStars = []
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100, // percentage position
        y: Math.random() * 100, // percentage position
        size: Math.random() * 2 + 1, // 1-3px size
        opacity: Math.random() * 0.5 + 0.2, // 0.2-0.7 opacity
        duration: Math.random() * 8 + 4, // 4-12s animation duration
        delay: Math.random() * 5, // 0-5s animation delay
        color: colors[Math.floor(Math.random() * colors.length)], // random color from palette
      })
    }
    setStars(newStars)
    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [variant])
  // Render different variants
  if (variant === "starry" && stars.length > 0) {
    return (
      <div className={`fixed inset-0 z-0 overflow-hidden bg-black bg-opacity-90 ${className}`}>
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-rich-teal/5 to-muted-coral/5" />

        {/* Nebula effects - colored glows with enhanced animation */}
        {animate ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-rich-teal/10 blur-[50px]"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.3, 0.1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-muted-coral/10 blur-[50px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.25, 0.1],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute top-2/3 right-1/3 w-[150px] h-[150px] rounded-full bg-pale-cyan/10 blur-[50px]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 20, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 4,
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-rich-teal/10 blur-[50px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-muted-coral/10 blur-[50px]" />
            <div className="absolute top-2/3 right-1/3 w-[150px] h-[150px] rounded-full bg-pale-cyan/10 blur-[50px]" />
          </>
        )}

        {/* Individual stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 1.5, star.opacity], // Pulsing opacity
              scale: [1, 1.2, 1], // Subtle size change
            }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
            }}
          />
        ))}
      </div>
    )
  }
  // Minimal variant - just a subtle gradient
  if (variant === "minimal") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-rich-teal/5 to-muted-coral/5" />
      </div>
    )
  }
  // Default variant - animated gradient blobs
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
