"use client"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useParallax } from "react-scroll-parallax"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import {
  Search,
  Heart,
  Compass,
  Clock,
  ArrowRight,
  Brain,
  Activity,
  Feather,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react"
// Import the GradientBackground component at the top of the file
import { GradientBackground } from "@/components/ui/GradientBackground"
import api from "@/lib/api"
// Categories data with icons, descriptions and images
import { ArticleModal } from "@/components/ArticleModal"
import { toast } from "@/components/ui/use-toast"

const categories = [
  {
    id: 1,
    name: "Mindfulness & Self-Awareness",
    icon: Compass,
    color: "from-pale-cyan/20 to-rich-teal/20",
    description: "Discover practices to cultivate present-moment awareness and deeper self-understanding.",
    image: "/placeholder.svg?height=400&width=600&text=Mindfulness",
  },
  {
    id: 2,
    name: "Mental Resilience & Regulation",
    icon: Brain,
    color: "from-soft-peach/20 to-muted-coral/20",
    description: "Build mental strength and learn techniques to regulate thoughts and emotions.",
    image: "/placeholder.svg?height=400&width=600&text=Resilience",
  },
  {
    id: 3,
    name: "Body & Nervous System",
    icon: Activity,
    color: "from-light-coral/20 to-muted-coral/20",
    description: "Explore the mind-body connection and somatic practices for wellbeing.",
    image: "/placeholder.svg?height=400&width=600&text=Body",
  },
  {
    id: 4,
    name: "Wisdom & Philosophy",
    icon: Feather,
    color: "from-light-teal/20 to-rich-teal/20",
    description: "Delve into timeless wisdom traditions and philosophical insights for modern life.",
    image: "/placeholder.svg?height=400&width=600&text=Wisdom",
  },
  {
    id: 5,
    name: "Daily Practices & Tools",
    icon: Calendar,
    color: "from-muted-coral/20 to-soft-peach/20",
    description: "Practical techniques and tools to integrate mindfulness into everyday living.",
    image: "/placeholder.svg?height=400&width=600&text=Practices",
  },
  {
    id: 6,
    name: "Emotions & Inner Patterns",
    icon: Heart,
    color: "from-rich-teal/20 to-pale-cyan/20",
    description: "Understand emotional intelligence and transform limiting patterns.",
    image: "/placeholder.svg?height=400&width=600&text=Emotions",
  },
  {
    id: 7,
    name: "Integration & Alignment",
    icon: Layers,
    color: "from-pale-cyan/20 to-light-teal/20",
    description: "Bring all aspects of your practice together for wholeness and purpose.",
    image: "/placeholder.svg?height=400&width=600&text=Integration",
  },
]
// Featured articles - one from each category
const featuredArticles = [
  {
    id: 1,
    title: "The Art of Present Moment Awareness",
    excerpt: "Learn how to cultivate mindfulness in everyday activities and transform your experience of life.",
    category: "Mindfulness & Self-Awareness",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "7 min",
    difficulty: "Beginner",
    author: {
      name: "Dr. Sarah Mitchell",
      image: "/placeholder.svg",
    },
  },
  {
    id: 2,
    title: "Building Mental Fortitude in Challenging Times",
    excerpt:
      "Discover evidence-based techniques to strengthen your mental resilience and navigate life's difficulties.",
    category: "Mental Resilience & Regulation",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "9 min",
    difficulty: "Intermediate",
    author: {
      name: "Michael Chang",
      image: "/placeholder.svg",
    },
  },
  {
    id: 3,
    title: "Understanding Your Nervous System States",
    excerpt: "Learn to recognize and regulate your nervous system for better emotional balance and physical wellbeing.",
    category: "Body & Nervous System",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "8 min",
    difficulty: "Beginner",
    author: {
      name: "Dr. Elena Rodriguez",
      image: "/placeholder.svg",
    },
  },
  {
    id: 4,
    title: "Ancient Wisdom for Modern Challenges",
    excerpt: "How timeless philosophical principles can guide us through contemporary life challenges.",
    category: "Wisdom & Philosophy",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "10 min",
    difficulty: "Intermediate",
    author: {
      name: "Professor James Wilson",
      image: "/placeholder.svg",
    },
  },
  {
    id: 5,
    title: "Five-Minute Practices for Busy Lives",
    excerpt: "Simple yet powerful daily practices that can be integrated into even the busiest schedules.",
    category: "Daily Practices & Tools",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "5 min",
    difficulty: "Beginner",
    author: {
      name: "Lisa Johnson",
      image: "/placeholder.svg",
    },
  },
  {
    id: 6,
    title: "Mapping Your Emotional Landscape",
    excerpt: "A guide to identifying and working with emotional patterns for greater self-awareness and growth.",
    category: "Emotions & Inner Patterns",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "12 min",
    difficulty: "Advanced",
    author: {
      name: "Dr. Robert Kim",
      image: "/placeholder.svg",
    },
  },
  {
    id: 7,
    title: "Living in Alignment with Your Values",
    excerpt: "Practical steps to identify your core values and bring your daily actions into alignment with them.",
    category: "Integration & Alignment",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "8 min",
    difficulty: "Intermediate",
    author: {
      name: "Maya Patel",
      image: "/placeholder.svg",
    },
  },
]
/**
 * KnowledgeHubContent component displays the main knowledge hub page
 * Features parallax effects, category cards, and article carousel
 */
export default function KnowledgeHubContent() {
  // State for search, categories and articles
  const [searchTerm, setSearchTerm] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0)
  const [shuffledCategories, setShuffledCategories] = useState([...categories])
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 3
  // Refs for scroll effects
  const containerRef = useRef(null)
  const carouselRef = useRef(null)
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  // Parallax effect for hero section
  const parallaxRef = useParallax({
    speed: -10,
  })
  // Shuffle categories on component mount for variety
  useEffect(() => {
    const shuffled = [...categories].sort(() => Math.random() - 0.5)
    setShuffledCategories(shuffled)
  }, [])
  // Auto-advance carousel for featured articles

  const [knowledgeHubs, setKnowledgeHubs] = useState([])
  const [articles, setArticles] = useState([])
  const [isLoadingHubs, setIsLoadingHubs] = useState(false)
  const [isLoadingArticles, setIsLoadingArticles] = useState(false)
  const [error, setError] = useState(null)
  // Add state for article modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    if (articles.length === 0) return

    const interval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [articles])
  // Carousel navigation functions

  const nextArticle = () => {
    if (articles.length === 0) return
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length)
  }

  const prevArticle = () => {
    if (articles.length === 0) return
    setCurrentArticleIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length)
  }
  // Search function
  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    setIsSearching(true)
    setHasSearched(true)
    setCurrentPage(1)
    setSearchResults([])

    try {
      // Fetch knowledge hub categories that match the search term
      const hubsResponse = await api.get(`/api/knowledge-hub?search=${encodeURIComponent(searchTerm)}`)

      // Fetch articles that match the search term
      const articlesResponse = await api.get(`/articles?search=${encodeURIComponent(searchTerm)}`)

      // Combine the results
      const combinedResults = [
        ...hubsResponse.data.map((hub) => ({
          ...hub,
          isHub: true, // Flag to identify this as a hub
          icon: BookOpen, // Default icon
          description: hub.content,
        })),
        ...articlesResponse.data,
      ]

      setSearchResults(combinedResults)

      if (combinedResults.length === 0) {
        toast({
          title: "No results found",
          description: `No results found for "${searchTerm}". Try a different search term.`,
        })
      } else {
        toast({
          title: "Search results",
          description: `Found ${combinedResults.length} results for "${searchTerm}".`,
        })
      }
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to perform search. Please try again.")

      toast({
        variant: "destructive",
        title: "Search failed",
        description: "Failed to perform search. Please try again.",
      })
    } finally {
      setIsSearching(false)
    }
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

  // Add this useEffect to fetch knowledge hubs when component mounts
  useEffect(() => {
    fetchKnowledgeHubs()
  }, [])

  // Add these functions to fetch data from the API
  const fetchKnowledgeHubs = async () => {
    setIsLoadingHubs(true)
    setError(null)
    try {
      const response = await api.get("/knowledge-hub/")
      setKnowledgeHubs(response.data)

      // If we have knowledge hubs, fetch articles for the first one
      if (response.data && response.data.length > 0) {
        fetchArticles(response.data[0].id)
      }
    } catch (err) {
      console.error("Error fetching knowledge hubs:", err)
      setError("Failed to load knowledge hub categories. Please try again.")

      toast({
        variant: "destructive",
        title: "Error loading content",
        description: "Failed to load knowledge hub categories. Please try again.",
      })
    } finally {
      setIsLoadingHubs(false)
    }
  }

  const fetchArticles = async (knowledgeHubId) => {
    setIsLoadingArticles(true)
    setError(null)
    try {
      const response = await api.get(`/articles?k_id=${knowledgeHubId}`)
      setArticles(response.data)
    } catch (err) {
      console.error("Error fetching articles:", err)
      setError("Failed to load articles. Please try again.")
    } finally {
      setIsLoadingArticles(false)
    }
  }

  return (
    <div ref={containerRef} className="bg-black text-off-white">
      {/* Hero Section */}
      <section ref={parallaxRef.ref} className="relative py-24 px-4 overflow-hidden">
        {/* Background Effects */}
        <GradientBackground intensity="medium" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
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

            {/* Hero Text */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
              Aranya
            </h1>
            <h5 className="text-2xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
              Dive into the Wilderness of Wisdom
            </h5>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Discover the path to inner serenity through nature's teachings
            </p>

            {/* Search Bar */}
            <motion.div className="relative max-w-2xl mx-auto" whileHover={{ scale: 1.02 }}>
              <div className="flex items-stretch">
                <Input
                  type="text"
                  placeholder="Search for wisdom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-12 py-6 text-lg h-[60px] bg-white/5 border-white/10 backdrop-blur-xl rounded-l-2xl rounded-r-none"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-rich-teal hover:bg-rich-teal/90 rounded-l-none rounded-r-2xl h-[60px] px-6"
                >
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Results Section */}
      <AnimatePresence>
        {hasSearched && (
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
                    {currentResults.map((result, index) => (
                      <motion.div
                        key={result.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <div className="p-4 flex flex-col h-full">
                          {/* Display category or article based on the result type */}
                          {result.isHub ? (
                            // This is a knowledge hub category
                            <Link
                              href={`/knowledge-hub/${result.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                              onClick={(e) => {
                                e.preventDefault()
                                fetchArticles(result.id)
                              }}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-black/20 rounded-lg">
                                  <BookOpen className="w-5 h-5" />
                                </div>
                                <h3 className="font-medium">{result.title}</h3>
                              </div>
                              <p className="text-sm text-white/60 mb-4 line-clamp-2">{result.content}</p>
                              <div className="mt-auto flex justify-end">
                                <span className="text-white/60 hover:text-white transition-colors flex items-center text-sm">
                                  Explore <ArrowRight className="ml-1 w-3 h-3" />
                                </span>
                              </div>
                            </Link>
                          ) : (
                            // This is an article
                            <div>
                              <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                                <Image
                                  src={result.image_url || "/placeholder.svg"}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <Badge className="absolute top-2 left-2 bg-rich-teal/80 text-white text-xs">
                                  {result.knowledgehub?.title || "Article"}
                                </Badge>
                              </div>
                              <h3 className="font-medium mb-1">{result.title}</h3>
                              <p className="text-sm text-white/60 mb-4 line-clamp-2">{result.summary}</p>
                              <div className="mt-auto flex justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-white/10 text-xs"
                                  onClick={() => {
                                    setSelectedArticle(result)
                                    setIsModalOpen(true)
                                  }}
                                >
                                  Read More
                                </Button>
                              </div>
                            </div>
                          )}
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
                <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                  <Search className="w-16 h-16 mx-auto text-white/20 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-white/60 mb-4">Try a different search term or explore our categories below</p>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Learning Paths Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Explore Wisdom Paths</h2>
            <p className="text-white/60">Discover knowledge across different domains of mindfulness and growth</p>
          </motion.div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingHubs ? (
              // Loading state
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 h-64 animate-pulse"
                  />
                ))
            ) : error ? (
              // Error state
              <div className="col-span-3 text-center py-12 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/60 mb-4">{error}</p>
                <Button onClick={fetchKnowledgeHubs} variant="outline" className="border-white/10">
                  Try Again
                </Button>
              </div>
            ) : knowledgeHubs.length === 0 ? (
              // Empty state
              <div className="col-span-3 text-center py-12 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/60">No knowledge hub categories found.</p>
              </div>
            ) : (
              // Display knowledge hubs
              knowledgeHubs.map((hub, index) => (
                <Link
                  key={hub.id}
                  href={`/knowledge-hub/${hub.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                  className="block"
                  onClick={(e) => {
                    e.preventDefault()
                    fetchArticles(hub.id)
                  }}
                >
                  <motion.div
                    className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-rich-teal/20 to-pale-cyan/20 backdrop-blur-sm border border-white/10 group transition-transform duration-200 hover:scale-105 h-full flex flex-col`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Category Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={hub.image_url || "/placeholder.svg"}
                        alt={hub.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Category Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-black/20 rounded-xl">
                          {/* Use a default icon since we don't have specific icons from the API */}
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold">{hub.title}</h3>
                      </div>

                      <p className="text-white/80 mb-6 flex-grow">{hub.content}</p>

                      <div className="flex justify-end items-center mt-auto">
                        <span className="text-white/60 group-hover:text-white transition-colors flex items-center">
                          Explore <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Articles Carousel */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-rich-teal/20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              View All
            </Button>
          </div>

          <div className="relative" ref={carouselRef}>
            {/* Navigation Buttons */}
            <button
              onClick={prevArticle}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextArticle}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Next article"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden rounded-2xl">
              {isLoadingArticles ? (
                // Loading state
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative h-64 rounded-xl bg-white/5 animate-pulse" />
                    <div className="flex flex-col justify-between space-y-4">
                      <div className="h-8 bg-white/5 rounded-md animate-pulse" />
                      <div className="h-24 bg-white/5 rounded-md animate-pulse" />
                      <div className="h-10 bg-white/5 rounded-md animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : error ? (
                // Error state
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6 text-center py-12">
                  <p className="text-white/60 mb-4">{error}</p>
                  <Button
                    onClick={() => knowledgeHubs.length > 0 && fetchArticles(knowledgeHubs[0].id)}
                    variant="outline"
                    className="border-white/10"
                  >
                    Try Again
                  </Button>
                </div>
              ) : articles.length === 0 ? (
                // Empty state
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6 text-center py-12">
                  <p className="text-white/60">No articles found for this category.</p>
                </div>
              ) : (
                // Display articles
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentArticleIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      {/* Article Image */}
                      <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                        <Image
                          src={articles[currentArticleIndex].image_url || "/placeholder.svg?height=400&width=600"}
                          alt={articles[currentArticleIndex].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge
                          className="absolute top-4 left-4 bg-rich-teal/80 text-white backdrop-blur-sm"
                          variant="secondary"
                        >
                          {articles[currentArticleIndex].knowledgehub?.title || "Article"}
                        </Badge>
                      </div>

                      {/* Article Content */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <Badge variant="secondary" className="bg-rich-teal/20 text-pale-cyan flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {articles[currentArticleIndex].level === 1
                                ? "Beginner"
                                : articles[currentArticleIndex].level === 2
                                  ? "Intermediate"
                                  : "Advanced"}
                            </Badge>
                            <Badge variant="secondary" className="bg-muted-coral/20 text-soft-peach">
                              {new Date(articles[currentArticleIndex].date_added).toLocaleDateString()}
                            </Badge>
                          </div>

                          <h3 className="text-2xl font-bold mb-2">{articles[currentArticleIndex].title}</h3>
                          <p className="text-white/60 mb-4">{articles[currentArticleIndex].summary}</p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{articles[currentArticleIndex].tags}</span>
                          </div>
                          <Button variant="outline" className="border-white/10 hover:bg-white/5">
                            Read More →
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Pagination Dots */}
            {articles.length > 0 && (
              <div className="flex justify-center mt-6 space-x-2">
                {articles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentArticleIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentArticleIndex ? "bg-rich-teal w-4" : "bg-white/20"}`}
                    aria-label={`Go to article ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Article Modal */}
      <ArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} article={selectedArticle} />
    </div>
  )
}
