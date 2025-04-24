"use client"
import { useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import { Header } from "@/components/Header"
/**
 * Layout component provides consistent page structure
 * Includes header with scroll-based styling and main content area
 */
export function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  // Update header appearance based on scroll position
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])
  return (
    <div className="relative">
      {/* Header is included directly in the Layout */}
      <Header />

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
