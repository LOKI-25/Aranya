"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
/**
 * Footer component
 *
 * Provides consistent footer across all pages with links,
 * newsletter signup, and scroll-to-top functionality.
 */
export function Footer() {
  /**
   * Scroll to top of page
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <footer className="bg-gradient-to-b from-black to-rich-teal/30 text-off-white relative z-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250211_124203_Canva.jpg-MFGUwzCJRN5TUx2f4Msr0b0cWGQNMl.jpeg"
                alt="Aranya Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-brand-orange">Aranya</span>
            </div>
            <p className="text-white/70">
              Embrace the wilderness within and discover your path to inner serenity through mindful living.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-rich-teal dark:text-pale-cyan">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/knowledge-hub"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/journaling" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Journaling
                </Link>
              </li>
              <li>
                <Link
                  href="/habit-tracker"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Habit Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/vision-board"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Vision Board
                </Link>
              </li>
              <li>
                <Link
                  href="/book-recommendations"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Book Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-rich-teal dark:text-pale-cyan">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-support"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-rich-teal/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-rich-teal dark:text-pale-cyan">Stay Connected</h3>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for mindfulness tips and updates.</p>
            <div className="flex space-x-0">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none bg-white/10 border-white/20 focus:border-rich-teal"
              />
              <Button className="rounded-l-none bg-rich-teal hover:bg-rich-teal/90">Subscribe</Button>
            </div>
            <p className="text-xs text-white/50 mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/50 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aranya. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
              Accessibility
            </a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
              Sitemap
            </a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-rich-teal text-off-white p-3 rounded-full shadow-lg z-10"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
