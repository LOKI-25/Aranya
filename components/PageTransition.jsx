"use client"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
/**
 * Animation variants for page transitions
 */
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: "-10%",
  },
}
/**
 * Animation transition settings
 */
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
}
/**
 * PageTransition component
 * Wraps page content with smooth transitions between route changes
 */
export const PageTransition = ({ children }) => {
  // Get current pathname to use as animation key
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
