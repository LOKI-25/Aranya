"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PreferencesProvider } from "@/contexts/PreferencesContext"
/**
 * ThemeProvider component
 *
 * Wraps the application with theme context for light/dark mode
 * and user preferences. Handles hydration to prevent flicker.
 */
export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = React.useState(false)
  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return (
    <NextThemesProvider {...props}>
      <PreferencesProvider>{children}</PreferencesProvider>
    </NextThemesProvider>
  )
}
