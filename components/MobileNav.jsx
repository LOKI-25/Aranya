"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function MobileNav({ navItems }) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 rounded-b-lg"
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                pathname === item.href ? "bg-rich-teal/20 text-pale-cyan" : "text-white hover:bg-rich-teal/10",
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="text-lg font-medium px-4 py-2 rounded-md transition-colors bg-rich-teal text-white"
          >
            Dashboard
          </Link>
        </nav>
      </motion.div>
    </AnimatePresence>
  )
}
