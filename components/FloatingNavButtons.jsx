"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
/**
 * FloatingNavButtons component
 * Provides floating navigation buttons for scrolling to top and bottom of the page
 */
export function FloatingNavButtons() {
  // State to control button visibility
  const [showButtons, setShowButtons] = useState(false)
  // Handle scroll events to show/hide buttons
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      // Show buttons when user has scrolled down a bit but not near the bottom
      setShowButtons(scrollPosition > windowHeight * 0.2 && scrollPosition < documentHeight - windowHeight * 1.2)
    }
    // Add scroll listener
    window.addEventListener("scroll", handleScroll)
    // Clean up listener on unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  /**
   * Scroll to top of page
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  /**
   * Scroll to bottom of page
   */
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
  }
  return (
    <AnimatePresence>
      {showButtons && (
        <>
          {/* Scroll to top button */}
          <motion.button
            className="fixed right-6 top-24 bg-rich-teal text-off-white p-2 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>

          {/* Scroll to bottom button */}
          <motion.button
            className="fixed right-6 bottom-6 bg-rich-teal text-off-white p-2 rounded-full shadow-lg z-50"
            onClick={scrollToBottom}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={24} />
          </motion.button>
        </>
      )}
    </AnimatePresence>
  )
}
