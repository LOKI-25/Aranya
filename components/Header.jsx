"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileNav } from "@/components/MobileNav"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuth } from "@/lib/auth"
import { useTheme } from "next-themes"
import { MainNav } from "@/components/MainNav"
import { ProfileDialog } from "@/components/ProfileDialog"

/**
 * Main navigation items for the header
 */
const mainNavItems = [
  { name: "Home", href: "/" },
  { name: "Knowledge Hub", href: "/knowledge-hub" },
  { name: "Journaling", href: "/journaling" },
  { name: "Habit Tracker", href: "/habit-tracker" },
  { name: "Vision Board", href: "/vision-board" },
  { name: "Book Recommendations", href: "/book-recommendations" },
]

/**
 * Header component with responsive navigation
 * Features mobile navigation, theme toggle, and user profile
 */
export function Header() {
  // State for header appearance and navigation
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const logoSize = useTransform(scrollY, [0, 100], [60, 40])

  // User authentication and profile state
  const { user, logout, loading } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  // Navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Theme state
  const { theme } = useTheme()

  // Update header appearance on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 0)
    })
    return () => unsubscribe()
  }, [scrollY])

  /**
   * Get login button gradient based on theme
   */
  const getLoginButtonColor = () => {
    switch (theme) {
      case "dark":
        return "from-pale-cyan to-rich-teal"
      case "light":
        return "from-muted-coral to-soft-peach"
      default:
        return "from-rich-teal to-pale-cyan"
    }
  }

  // Handle opening profile dialog
  const handleProfileClick = () => {
    setIsDropdownOpen(false)
    setProfileOpen(true)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <motion.div style={{ scale: useTransform(logoSize, (size) => size / 60) }} className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250211_124203_Canva.jpg-MFGUwzCJRN5TUx2f4Msr0b0cWGQNMl.jpeg"
              alt="Aranya Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-brand-orange">Aranya</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Only shown for logged in users */}
        {user && <MainNav />}

        {/* Mobile Navigation Toggle - Only shown for logged in users */}
        {user && (
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            {isMobileMenuOpen && <MobileNav navItems={mainNavItems} />}
          </div>
        )}

        {/* Right Side: Theme Toggle and User Menu */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {loading ? (
            // Show loading indicator while checking auth status
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <>
              {/* Dashboard Button - Only for logged in users */}

              {/* User Avatar with Dropdown */}
              <div className="relative z-50">
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-white/20"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium">{user.name || "User"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email || ""}</p>
                      </div>

                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleProfileClick}
                      >
                        Profile
                      </button>

                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>

                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          logout()
                          setIsDropdownOpen(false)
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Login Button - Only for non-logged in users */
            <Button
              asChild
              className={`bg-gradient-to-r ${getLoginButtonColor()} text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              <Link href="/auth/login">Log In</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Dialog */}
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} user={user} />
    </motion.header>
  )
}
