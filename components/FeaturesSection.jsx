"use client"
import { motion } from "framer-motion"
import { BookOpen, BarChart2, Smile, Layout } from "lucide-react"
import { Typography } from "@/components/ui/Typography"
const features = [
  {
    icon: BookOpen,
    title: "Journaling",
    description: "Capture your thoughts and insights with our intuitive journaling tools.",
  },
  {
    icon: BarChart2,
    title: "Habit Tracking",
    description: "Build and maintain positive habits with our comprehensive tracking system.",
  },
  {
    icon: Smile,
    title: "Mood Insights",
    description: "Gain deeper understanding of your emotional patterns and triggers.",
  },
  {
    icon: Layout,
    title: "Vision Board",
    description: "Visualize and manifest your goals with our interactive vision board.",
  },
]
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}
export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-pale-cyan/20 to-soft-peach/20 dark:from-rich-teal/20 dark:to-dark-slate/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="mb-4">
            Transform Your Journey
          </Typography>
          <Typography variant="body" className="max-w-2xl mx-auto">
            Discover powerful tools and insights to support your personal growth and mindfulness practice.
          </Typography>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-rich-teal dark:text-pale-cyan mb-4" />
              <Typography variant="h3" className="mb-2">
                {feature.title}
              </Typography>
              <Typography variant="body">{feature.description}</Typography>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
