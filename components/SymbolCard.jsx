"use client"
import { motion, useTransform } from "framer-motion"
import Image from "next/image"
import { Typography } from "@/components/ui/Typography"
/**
 * SymbolCard component
 * Creates a transitioning card that morphs between two images and text based on scroll progress
 */
export const SymbolCard = ({ leftImage, rightImage, leftText, rightText, progress }) => {
  // Transform values based on scroll progress
  const leftScale = useTransform(progress, [0, 0.5, 1], [0.95, 1.05, 1])
  const rightScale = useTransform(progress, [0, 0.5, 1], [1, 1.05, 0.95])
  const leftOpacity = useTransform(progress, [0, 0.5, 1], [1, 0, 1])
  const rightOpacity = useTransform(progress, [0, 0.5, 1], [0, 1, 0])
  const textOpacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      {/* Image container with transitions */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl mb-8">
        {/* Left image */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: leftOpacity,
            scale: leftScale,
          }}
        >
          <Image src={leftImage || "/placeholder.svg"} alt="Left" layout="fill" objectFit="cover" />
        </motion.div>

        {/* Right image */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: rightOpacity,
            scale: rightScale,
          }}
        >
          <Image src={rightImage || "/placeholder.svg"} alt="Right" layout="fill" objectFit="cover" />
        </motion.div>
      </div>

      {/* Text with transitions */}
      <motion.div
        className="text-center"
        style={{
          opacity: textOpacity,
        }}
      >
        <Typography variant="h2" className="text-4xl md:text-6xl text-white text-center mb-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {leftText}
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {rightText}
          </motion.span>
        </Typography>
      </motion.div>
    </div>
  )
}
