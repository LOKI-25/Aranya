"use client"
import { motion } from "framer-motion"
/**
 * FadeIn component
 *
 * Provides consistent fade-in animations for content with
 * configurable direction, delay, and duration.
 *
 * @example
 * <FadeIn direction="up" delay={0.3}>
 *   <p>This content will fade in from below</p>
 * </FadeIn>
 */
export function FadeIn({ children, delay = 0, duration = 0.5, direction = "up", className = "" }) {
  // Set initial and animate values based on direction
  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: 20 }, animate: { y: 0 } }
      case "down":
        return { initial: { y: -20 }, animate: { y: 0 } }
      case "left":
        return { initial: { x: 20 }, animate: { x: 0 } }
      case "right":
        return { initial: { x: -20 }, animate: { x: 0 } }
      case "none":
        return { initial: {}, animate: {} }
      default:
        return { initial: { y: 20 }, animate: { y: 0 } }
    }
  }
  const { initial, animate } = getDirectionValues()
  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, ...animate }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
