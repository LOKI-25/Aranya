"use client"
import { motion } from "framer-motion"
import { Typography } from "@/components/ui/Typography"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-rich-teal to-pale-cyan dark:from-dark-slate dark:to-rich-teal text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <Typography variant="h2" className="mb-4 text-off-white dark:text-pale-cyan">
            Begin Your Journey Today
          </Typography>
          <Typography variant="body" className="mb-8 text-off-white/90">
            Join our community of mindful practitioners and start your path to inner peace and personal growth.
          </Typography>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-rich-teal hover:bg-off-white dark:bg-pale-cyan dark:text-dark-slate dark:hover:bg-pale-cyan/90"
            >
              Start Your Free Trial
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
