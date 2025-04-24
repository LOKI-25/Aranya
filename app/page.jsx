"use client"
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/ui/GradientBackground"
/**
 * Section title component with animation
 */
const SectionTitle = ({ children, className = "" }) => (
  <motion.h2
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
    className={`text-7xl md:text-[200px] font-bold text-center leading-tight tracking-tighter ${className}`}
  >
    {children}
  </motion.h2>
)
/**
 * Parallax section component for scrolling effects
 */
const ParallaxSection = ({
  scrollProgress,
  start,
  end,
  imageUrl,
  title,
  description,
  quote,
  isFinal = false,
  index,
  totalSections,
}) => {
  const controls = useAnimation()
  const [isMounted, setIsMounted] = useState(false)
  // Responsive spring configuration
  const responsiveSpringConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1,
  }
  useEffect(() => {
    setIsMounted(true)
    if (isFinal) {
      controls.start({
        opacity: 1,
        transition: { duration: 2, ease: "easeInOut" },
      })
    }
  }, [isFinal, controls])
  // Special handling for the last two sections
  const isLastSection = index === totalSections - 1
  const isSecondLastSection = index === totalSections - 2
  // Define opacity transitions based on section position
  let opacityProgressPoints, opacityProgressValues
  if (isLastSection) {
    // Last section (Symphony of Self) - fade out earlier and more decisively
    opacityProgressPoints = [
      start - 0.02, // Start fade in
      start, // Fully visible
      (start + end) / 2 - 0.1, // Start fade out earlier
      (start + end) / 2, // Completely gone by midpoint
    ]
    opacityProgressValues = [0, 0.7, 1, 0]
  } else if (isSecondLastSection) {
    // Second last section (Moon) - standard transition but ensure it's gone before last section
    opacityProgressPoints = [start - 0.02, start, (start + end) / 2, end - 0.05, end]
    opacityProgressValues = [0, 0.7, 1, 0.7, 0]
  } else {
    // All other sections - standard transitions
    opacityProgressPoints = [start - 0.02, start, (start + end) / 2, end - 0.02, end]
    opacityProgressValues = [0, 0.7, 1, 0.7, 0]
  }
  const opacityProgress = useTransform(scrollProgress, opacityProgressPoints, opacityProgressValues)
  // Apply spring physics with more responsive settings
  const smoothOpacity = useSpring(opacityProgress, responsiveSpringConfig)
  // More subtle vertical movement
  const yProgress = useTransform(scrollProgress, [start, end], ["5vh", "-5vh"])
  // Apply spring physics with more responsive settings
  const smoothY = useSpring(yProgress, responsiveSpringConfig)
  // More subtle scale effect
  const scaleProgress = useTransform(scrollProgress, [start, (start + end) / 2, end], [1.02, 1, 0.98])
  // Apply spring physics with more responsive settings
  const smoothScale = useSpring(scaleProgress, responsiveSpringConfig)
  // Create a more decisive z-index transition
  // Special handling for the last section to ensure it doesn't overlap with the final CTA
  const zIndexProgressLast = useTransform(scrollProgress, [start - 0.01, start, (start + end) / 2 - 0.1], [0, 10, 0])
  const zIndexProgressDefault = useTransform(scrollProgress, [start - 0.01, start, end - 0.01, end], [0, 10, 10, 0])
  const zIndexProgress = isLastSection ? zIndexProgressLast : zIndexProgressDefault
  // Alternate image position (left/right) based on index
  const isImageOnRight = index % 2 === 0
  return (
    <motion.section
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{
        opacity: smoothOpacity,
        zIndex: zIndexProgress,
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-center ${isImageOnRight ? "" : "md:grid-flow-dense"}`}
        >
          {/* Text Content */}
          <motion.div
            className={`flex flex-col ${isImageOnRight ? "md:order-first" : "md:order-last"} bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-xl`}
            style={{ y: smoothY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="mb-6"
            >
              <p className="text-base md:text-lg text-white/90">{description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-auto pt-4 border-t border-white/20"
            >
              <p className="text-lg md:text-xl italic font-medium bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
                {quote}
              </p>
            </motion.div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            className={`relative aspect-square md:aspect-[4/3] w-full h-auto overflow-hidden rounded-xl ${isImageOnRight ? "md:order-last" : "md:order-first"}`}
            style={{ scale: smoothScale }}
          >
            <motion.div
              className="w-full h-full relative"
              initial={{ filter: "blur(8px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover rounded-xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2} // Only prioritize loading first two images
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />

              {/* Enhanced background animations */}
              <motion.div
                className="absolute top-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-rich-teal/10 blur-[50px]"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-muted-coral/10 blur-[50px]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.25, 0.1],
                  x: [0, -40, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 2,
                }}
              />
              <motion.div
                className="absolute top-2/3 right-1/3 w-[150px] h-[150px] rounded-full bg-pale-cyan/10 blur-[50px]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.2, 0.1],
                  x: [0, 20, 0],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 4,
                }}
              />
            </motion.div>

            {isFinal && isMounted && (
              <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={controls}>
                <ParticleEffect />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
/**
 * Particle effect component for the final section
 */
const ParticleEffect = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    // Set dimensions only after component is mounted
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  // Don't render particles until we have dimensions
  if (dimensions.width === 0) return null
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(30)].map((_, i) => {
        // Generate random positions based on dimensions
        const randomX = Math.random() * dimensions.width
        const randomY = Math.random() * dimensions.height
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            initial={{
              x: randomX,
              y: randomY,
              opacity: 0,
            }}
            animate={{
              x: dimensions.width / 2,
              y: dimensions.height / 2,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          />
        )
      })}
    </motion.div>
  )
}
/**
 * HomePage component
 *
 * Main landing page with parallax scrolling effects and
 * animated sections that reveal as the user scrolls.
 */
export default function HomePage() {
  const containerRef = useRef(null)
  // Use a more optimized scroll configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  // More responsive spring configuration
  const responsiveSpringConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1,
  }
  // Apply spring physics to the scroll progress for overall smoothness
  const smoothScrollProgress = useSpring(scrollYProgress, responsiveSpringConfig)
  // Use the smooth scroll progress for all animations
  const titleScale = useTransform(smoothScrollProgress, [0, 0.1], [1, 0.7])
  const titleY = useTransform(smoothScrollProgress, [0, 0.1], [0, -50])
  // Gradual transition for the Aranya title opacity
  const opacity = useTransform(smoothScrollProgress, [0, 0.05, 0.1], [1, 0.8, 0])
  // Section spacing to reduce overlap
  const sectionSpacing = 0.12 // Reduced spacing to ensure we can reach the end
  // Content for parallax sections
  const parallaxSections = [
    {
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolf%204.jpg-hYCKVrMpTlJKGC0jnJ86Jgp0EQCmJs.jpeg",
      title: "The Call of the Wild Within",
      description:
        "Emotions are neither our enemies nor our masters. They are signals—deep instincts guiding us through the unknown. The more we listen, the more we understand ourselves.",
      quote: "He who controls others may be powerful, but he who has mastered himself is mightier still. — Lao Tzu",
    },
    {
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Stag%205.jpg-LulRf5FAzKEIoMgyd56QfLh1c5CtjQ.jpeg",
      title: "Grace in the Midst of Chaos",
      description:
        "True strength is not found in resistance but in stillness. The ability to pause, reflect, and choose a response over reaction is the mark of true mastery.",
      quote: "In the midst of movement and chaos, keep stillness inside of you. — Deepak Chopra",
    },
    {
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WARRIOR2.jpg-ccThcKr8fAEAp6Ik2wJD2KxuKl48oJ.jpeg",
      title: "The Strength to Endure, The Wisdom to Yield",
      description:
        "Discipline sharpens the mind, but wisdom guides the blade. The strongest warriors are those who know when to fight and when to walk away.",
      quote:
        "A warrior is not about perfection or victory or invulnerability. He's about absolute vulnerability. — Dan Millman",
    },
    {
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artist.jpg-rAF64n7jCqsLgIugQ5K1Gb2REd8yLu.jpeg",
      title: "The Architect of Possibilities",
      description:
        "Your mind is a canvas, your thoughts the brushstrokes. What you create in your inner world reflects in your outer life.",
      quote: "The creative adult is the child who survived. — Ursula K. Le Guin",
    },
    {
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sun%202.jpg-kbz1O390mJeV65B3FZOqZ7e0HaqEVm.jpeg",
      title: "Light to See, Fire to Transform",
      description:
        "Awareness is the first step to change. When we shine light on our fears, habits, and thoughts, we begin the process of transformation.",
      quote: "Your thoughts are the architects of your destiny. — David O. McKay",
    },
    {
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Moon%204.jpg-9Pcdz6vPqw8F1dalusuK6Us2risZKx.jpeg",
      title: "The Silent Wisdom of the Shadows",
      description:
        "Not all truths are found in light; some must be uncovered in the depths of the unknown. Learn to trust your inner voice—it knows the way.",
      quote: "The moon is a friend for the lonesome to talk to. — Carl Sandburg",
    },
    {
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unified-symbol.jpg",
      title: "The Symphony of Self",
      description:
        "When all aspects of self align—instinct, grace, strength, creativity, awareness, and intuition—we discover our true potential.",
      quote: "Knowing yourself is the beginning of all wisdom. — Aristotle",
      isFinal: true,
    },
  ]
  // Make the CTA appear at 85% of the scroll progress
  const ctaStartPoint = 0.85
  // Create a special transition for the final CTA section
  const finalCTAOpacity = useTransform(
    smoothScrollProgress,
    [ctaStartPoint - 0.05, ctaStartPoint, ctaStartPoint + 0.05, 0.95],
    [0, 0.5, 1, 0],
  )
  // Z-index should be high enough to appear on top but below footer
  const finalCTAzIndex = useTransform(smoothScrollProgress, [ctaStartPoint - 0.05, ctaStartPoint, 0.95], [0, 15, 0])
  return (
    <Layout>
      <div ref={containerRef} className="relative min-h-[800vh] bg-black">
        {/* Starry Background */}
        <GradientBackground variant="starry" intensity="medium" />

        {/* Hero Section */}
        <motion.section className="fixed inset-0 flex items-center justify-center" style={{ opacity }}>
          <div className="container mx-auto px-4 text-center">
            {/* Add enhanced background animations */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-rich-teal/10 blur-[80px]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-orange/10 blur-[80px]"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.25, 0.1],
                x: [0, -60, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 3,
              }}
            />

            <motion.div style={{ scale: titleScale, y: titleY }}>
              <SectionTitle className="bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
                Aranya
              </SectionTitle>
              <p className="text-xl md:text-2xl text-white/90 mt-4">Embrace the Wilderness Within</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Parallax Sections with increased spacing to reduce overlap */}
        {parallaxSections.map((section, index) => (
          <ParallaxSection
            key={index}
            index={index}
            totalSections={parallaxSections.length}
            scrollProgress={smoothScrollProgress}
            start={0.1 + index * sectionSpacing}
            end={0.1 + (index + 1) * sectionSpacing}
            imageUrl={section.imageUrl}
            title={section.title}
            description={section.description}
            quote={section.quote}
            isFinal={section.isFinal}
          />
        ))}

        {/* Final CTA Section with fixed timing */}
        <motion.section
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: finalCTAOpacity,
            zIndex: finalCTAzIndex,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 1, scale: 1 }} className="pointer-events-auto">
              {/* Direct h1 implementation with proper styling */}
              <h1
                className="text-6xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent", // Fallback for older browsers
                }}
              >
                Transform Within
              </h1>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-off-white px-12 py-8 text-xl rounded-full"
                >
                  Begin Your Journey
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Spacer for scroll height with footer visibility */}
        <div className="h-[750vh]" />
        {/* This final spacer ensures the footer is visible at the end */}
        <div className="h-[50vh] relative z-10"></div>
      </div>
    </Layout>
  )
}
