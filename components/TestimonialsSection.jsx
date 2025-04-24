"use client"
import { motion } from "framer-motion"
import { Typography } from "@/components/ui/Typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const testimonials = [
  {
    quote: "Prajnayana has transformed my daily mindfulness practice. The journaling features are exceptional.",
    author: "Sarah J.",
    role: "Mindfulness Practitioner",
    avatar: "/placeholder.svg",
  },
  {
    quote: "The habit tracking system has helped me build consistent meditation practice.",
    author: "Michael R.",
    role: "Yoga Instructor",
    avatar: "/placeholder.svg",
  },
  {
    quote: "I love how the mood insights help me understand my emotional patterns.",
    author: "Emma L.",
    role: "Life Coach",
    avatar: "/placeholder.svg",
  },
]
export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-pale-cyan/20 dark:from-black dark:to-rich-teal/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="mb-4">
            What Our Community Says
          </Typography>
          <Typography variant="body" className="max-w-2xl mx-auto">
            Join thousands of practitioners who have transformed their mindfulness journey with Prajnayana.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-sm"
            >
              <Typography variant="body" className="mb-6 italic">
                "{testimonial.quote}"
              </Typography>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Typography variant="h3" className="text-sm font-semibold">
                    {testimonial.author}
                  </Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    {testimonial.role}
                  </Typography>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
