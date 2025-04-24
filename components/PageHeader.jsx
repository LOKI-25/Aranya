"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Typography } from "@/components/ui/Typography"
import { GradientBackground } from "@/components/ui/GradientBackground"
/**
 * PageHeader component
 *
 * Provides a consistent header layout for all pages with
 * animated title, optional subtitle, and logo.
 */
export function PageHeader({ title, subtitle, showLogo = true }) {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <GradientBackground intensity="medium" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {showLogo && (
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-white rounded-full opacity-20 blur-md"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250211_124203_Canva.jpg-MFGUwzCJRN5TUx2f4Msr0b0cWGQNMl.jpeg"
                alt="Aranya Logo"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
          )}
          <Typography
            variant="h1"
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </div>
    </section>
  )
}
