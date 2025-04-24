"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { usePreferences } from "@/contexts/PreferencesContext"
/**
 * ThemeToggle component for switching between light and dark themes
 * Features smooth animations for icon transitions
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = usePreferences()
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-full"
      aria-label="Toggle theme"
    >
      {/* Sun Icon with Animation */}
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-rich-teal dark:text-pale-cyan" />
      </motion.div>

      {/* Moon Icon with Animation */}
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-rich-teal dark:text-pale-cyan" />
      </motion.div>
    </Button>
  )
}
