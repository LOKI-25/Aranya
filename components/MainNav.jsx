"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
/**
 * Navigation items for the main navigation menu
 */
const navItems = [
  { name: "Home", href: "/" },
  { name: "Knowledge Hub", href: "/knowledge-hub" },
  { name: "Journaling", href: "/journaling" },
  { name: "Habit Tracker", href: "/habit-tracker" },
  { name: "Vision Board", href: "/vision-board" },
  { name: "Book Recommendations", href: "/book-recommendations" },
]
/**
 * MainNav component
 * Displays the main navigation links with active state highlighting
 */
export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "relative text-sm font-medium transition-colors hover:text-rich-teal dark:hover:text-pale-cyan",
            pathname === item.href ? "text-rich-teal dark:text-pale-cyan" : "text-dark-slate/80 dark:text-off-white/80",
          )}
        >
          <span>{item.name}</span>

          {/* Animated underline for active nav item */}
          {pathname === item.href && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 h-0.5 bg-rich-teal dark:bg-pale-cyan bottom-[-4px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </Link>
      ))}
    </nav>
  )
}
