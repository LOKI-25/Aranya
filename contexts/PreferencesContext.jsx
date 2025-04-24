"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useTheme } from "next-themes"
/**
 * Default preferences
 */
const defaultPreferences = {
  soundEnabled: true,
  notificationsEnabled: true,
  language: "en",
  fontSize: "medium",
}
// Create context
const PreferencesContext = createContext(undefined)
/**
 * PreferencesProvider component
 * Provides user preferences and theme settings to the application
 */
export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultPreferences)
  const { theme, setTheme } = useTheme()
  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences")
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences))
      } catch (error) {
        console.error("Failed to parse saved preferences", error)
      }
    }
  }, [])
  // Update preferences
  const updatePreferences = (newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences }
    setPreferences(updatedPreferences)
    localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences))
  }
  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, theme, setTheme }}>
      {children}
    </PreferencesContext.Provider>
  )
}
/**
 * Hook to use preferences context
 */
export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
