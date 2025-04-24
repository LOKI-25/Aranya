"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
// Import the GradientBackground component at the top of the file
import { GradientBackground } from "@/components/ui/GradientBackground"
// Sample book data for the recommendations
const recommendedBooks = [
  {
    id: 1,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Mindfulness",
    image: "/placeholder.svg?height=400&width=260",
    summary:
      "A transformative guide to spiritual awakening and living in the present moment. This book helps reduce mental noise and brings peace by teaching you how to separate yourself from your mind and live in the eternal present.",
    link: "https://example.com/power-of-now",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Personal Growth",
    image: "/placeholder.svg?height=400&width=260",
    summary:
      "A powerful framework for building better habits based on identity shifts, tiny improvements, and long-term consistency. Learn how small changes compound into remarkable results and how to design your environment for success.",
    link: "https://example.com/atomic-habits",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Spiritual Fiction",
    image: "/placeholder.svg?height=400&width=260",
    summary:
      "A poetic tale about a young shepherd's journey to find treasure and how the real treasure lies within. This allegorical novel teaches us about following our dreams, recognizing opportunities, and understanding the Language of the World.",
    link: "https://example.com/the-alchemist",
  },
  {
    id: 4,
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    category: "Spiritual Growth",
    image: "/placeholder.svg?height=400&width=260",
    summary:
      "An exploration of the voice inside our heads and how to live in freedom from it. This book opens the door to profound inner peace by teaching you how to let go of painful thoughts and memories that limit your consciousness.",
    link: "https://example.com/untethered-soul",
  },
  {
    id: 5,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Psychology",
    image: "/placeholder.svg?height=400&width=260",
    summary:
      "A life-changing reflection on suffering, survival, and the deep human need for meaning based on the author's time in concentration camps. Frankl argues that we cannot avoid suffering but we can choose how to cope with it and find meaning in it.",
    link: "https://example.com/mans-search",
  },
]
/**
 * BookRecommendationsContent component
 * Displays curated book recommendations with a carousel interface
 * Includes search functionality and detailed book information
 */
export function BookRecommendationsContent() {
  // State for carousel and interaction
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 3
  const timerRef = useRef(null)
  // Get current book based on index
  const currentBook = recommendedBooks[currentIndex]
  // Navigation functions for carousel
  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendedBooks.length)
  }
  const prevBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendedBooks.length) % recommendedBooks.length)
  }
  const goToBook = (index) => {
    setCurrentIndex(index)
  }
  // Search function
  const handleSearch = () => {
    if (!searchTerm.trim()) return
    setIsSearching(true)
    setCurrentPage(1)
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Filter books that match the search term
      const results = recommendedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }
  // Handle Enter key press in search input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  // Calculate pagination
  const totalPages = Math.ceil(searchResults.length / resultsPerPage)
  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult)
  // Pagination functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  // Auto-advance carousel when not paused
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        nextBook()
      }, 6000)
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, isPaused])
  return (
    <div className="bg-black text-off-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
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
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-white rounded-full opacity-20 blur-md"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250211_124203_Canva.jpg-MFGUwzCJRN5TUx2f4Msr0b0cWGQNMl.jpeg"
                alt="Aranya Logo"
                width={160}
                height={160}
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
              Aranyaa
            </h1>
            <h3 className="text-2xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
              Literary Journeys for the Soul
            </h3>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Discover transformative books that illuminate the path to self-awareness and inner peace
            </p>
            <motion.div className="relative max-w-2xl mx-auto" whileHover={{ scale: 1.02 }}>
              <div className="flex items-stretch">
                <Input
                  type="text"
                  placeholder="Search for books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-12 py-6 text-lg bg-white/5 border-white/10 backdrop-blur-xl rounded-l-2xl h-[60px]"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-rich-teal hover:bg-rich-teal/90 rounded-r-2xl px-6 h-[60px] text-lg"
                >
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
              <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Results Section */}
      <AnimatePresence>
        {searchTerm && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="py-8 px-4 bg-gradient-to-b from-rich-teal/10 to-transparent"
          >
            <div className="container mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {isSearching
                    ? "Searching..."
                    : searchResults.length > 0
                      ? `Search Results for "${searchTerm}"`
                      : `No results found for "${searchTerm}"`}
                </h2>
              </div>

              {isSearching ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rich-teal"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {currentResults.map((book, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <div className="p-4 flex gap-4">
                          <div className="relative w-20 h-28 flex-shrink-0">
                            <Image
                              src={book.image || "/placeholder.svg"}
                              alt={book.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{book.title}</h3>
                              <p className="text-sm text-white/60">by {book.author}</p>
                            </div>
                            <Link href={book.link} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="mt-2 border-white/10">
                                Details <ExternalLink className="ml-1 w-3 h-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mb-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="border-white/10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="border-white/10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                searchTerm &&
                !isSearching && (
                  <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                    <BookOpen className="w-16 h-16 mx-auto text-white/20 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No books found</h3>
                    <p className="text-white/60 mb-4">
                      Try a different search term or browse our recommendations below
                    </p>
                  </div>
                )
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Book Carousel Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-black to-rich-teal/20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Recommended Readings</h2>
            <p className="text-white/60">Curated books to guide your journey toward self-discovery</p>
          </div>

          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevBook}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Previous book"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextBook}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Next book"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Book Display */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                >
                  {/* Book Cover */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rich-teal/30 to-pale-cyan/30 rounded-lg blur-xl transform -translate-x-2 translate-y-2"></div>
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="relative"
                    >
                      <Image
                        src={currentBook.image || "/placeholder.svg"}
                        alt={currentBook.title}
                        width={250}
                        height={400}
                        className="rounded-lg shadow-2xl"
                      />
                    </motion.div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 text-center md:text-left">
                    <Badge variant="secondary" className="mb-4 bg-rich-teal/20 text-pale-cyan">
                      {currentBook.category}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentBook.title}</h2>
                    <p className="text-lg text-white/60 mb-6">by {currentBook.author}</p>
                    <p className="text-white/80 text-lg mb-8 leading-relaxed">{currentBook.summary}</p>
                    <Link href={currentBook.link} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-rich-teal hover:bg-rich-teal/90">
                        More Information
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Background Animation */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 bg-rich-teal/10 rounded-full filter blur-3xl"
              />
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {recommendedBooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToBook(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-rich-teal" : "bg-white/20"}`}
                  aria-label={`Go to book ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rich-teal/20 to-pale-cyan/20 border border-white/10 p-8 md:p-12 text-center"
          >
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 bg-rich-teal/20 rounded-full filter blur-3xl"
            />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Why We Recommend Books</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Books have the power to transform our perspectives, expand our minds, and guide us on our journey toward
                self-awareness and inner peace. Our carefully curated recommendations are selected to support your
                personal growth and provide wisdom from diverse traditions and approaches.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
