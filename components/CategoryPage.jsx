"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import {
  Search,
  Clock,
  Filter,
  SortAsc,
  SortDesc,
  BookOpen,
  ArrowLeft,
  Compass,
  Brain,
  Activity,
  Feather,
  Calendar,
  Heart,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { ArticleModal } from "@/components/ArticleModal"
import api from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
// Map category names to their respective icons for visual representation
const categoryIcons = {
  "Mindfulness & Self-Awareness": Compass,
  "Mental Resilience & Regulation": Brain,
  "Body & Nervous System": Activity,
  "Wisdom & Philosophy": Feather,
  "Daily Practices & Tools": Calendar,
  "Emotions & Inner Patterns": Heart,
  "Integration & Alignment": Layers,
}
// Difficulty badge colors for visual differentiation
const difficultyColors = {
  Beginner: "bg-pale-cyan/20 text-pale-cyan",
  Intermediate: "bg-muted-coral/20 text-soft-peach",
  Advanced: "bg-rich-teal/20 text-rich-teal",
}
// Placeholder article data (would be replaced with API data in production)
// const placeholderArticles = Array(15)
//   .fill(null)
//   .map((_, index) => ({
//     id: index + 1,
//     title: `Article Title ${index + 1}`,
//     excerpt:
//       "This is a placeholder for the article excerpt. It will be replaced with actual content from the database.",
//     image: `/placeholder.svg?height=300&width=500&text=Article+${index + 1}`,
//     coverImage: `/placeholder.svg?height=800&width=1200&text=Article+${index + 1}+Cover`,
//     readingTime: `${Math.floor(Math.random() * 15) + 5} min`,
//     difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
//     tags: ["mindfulness", "meditation", "self-awareness", "practice"].slice(0, Math.floor(Math.random() * 3) + 1),
//     content: `
//       <p>This is the full content of the article. It would include multiple paragraphs, possibly headings, lists, and other formatting to present the information in a clear and engaging way.</p>

//       <h2>Section Heading</h2>
//       <p>This section would dive deeper into the topic, providing more detailed information and insights.</p>

//       <h3>Subsection</h3>
//       <p>Further details and explanations would be provided here, along with practical examples or exercises.</p>

//       <ul>
//         <li>Key point one about the topic</li>
//         <li>Key point two with additional information</li>
//         <li>Key point three with practical application</li>
//       </ul>

//       <p>The article would conclude with a summary of the main points and possibly suggestions for further exploration or practice.</p>
//     `,
//     reflectiveQuestions: [
//       {
//         id: "q1",
//         question: "How does this topic relate to your personal experience?",
//         placeholder: "Reflect on your own experiences...",
//       },
//       {
//         id: "q2",
//         question: "What insights from this article might you apply in your life?",
//         placeholder: "Consider practical applications...",
//       },
//     ],
//   }))
/**
 * CategoryPage component displays articles for a specific knowledge category
 * Includes filtering, sorting, pagination and article modal functionality
 */
export default function CategoryPage({ slug }) {
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [articles, setArticles] = useState([])
  const [sortOrder, setSortOrder] = useState("asc")
  const [activeFilter, setActiveFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState(null)

  // Ref for scrolling when changing pages
  const containerRef = useRef(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 3

  // Article modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)

  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [authLoading, isAuthenticated, router])

  // Fetch category and articles on component mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // First, fetch all knowledge hubs to find the one matching our slug
        const hubsResponse = await api.get("/knowledge-hub/")

        // Find the hub that matches our slug
        const matchingHub = hubsResponse.data.find(
          (hub) => hub.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") === slug,
        )

        if (!matchingHub) {
          setError("Category not found")
          setIsLoading(false)
          return
        }

        setCategory({
          id: matchingHub.id,
          name: matchingHub.title,
          description: matchingHub.content,
        })

        // Now fetch articles for this knowledge hub
        const articlesResponse = await api.get(`/articles?k_id=${matchingHub.id}`)
        setArticles(articlesResponse.data)
      } catch (err) {
        console.error("Error fetching category data:", err)
        setError("Failed to load category data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryData()
  }, [slug])

  // Filter articles based on search term and active filter
  const filteredArticles = articles.filter((article) => {
    if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (activeFilter && !article.tags.includes(activeFilter)) return false
    return true
  })

  // Sort articles based on sort order
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  })

  // Calculate pagination values
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle)

  // Get the appropriate icon for this category
  const CategoryIcon = BookOpen // Default icon

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, activeFilter, sortOrder])

  // Pagination functions
  const paginate = (pageNumber) => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setCurrentPage(pageNumber)
  }

  const nextPage = () => currentPage < totalPages && paginate(currentPage + 1)
  const prevPage = () => currentPage > 1 && paginate(currentPage - 1)

  // Toggle sort order function
  const toggleSortOrder = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))

  // Open article modal
  const openArticle = (article) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  // Update the search functionality to use the API
  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    setIsLoading(true)
    setHasSearched(true)

    try {
      // Fetch articles that match the search term for this category
      const response = await api.get(`/articles?search=${encodeURIComponent(searchTerm)}&k_id=${category.id}`)
      setArticles(response.data)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to perform search. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rich-teal"></div>
      </div>
    )
  }

  // If error, show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-off-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{error}</h2>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // If no category found, show 404
  // if (!category) {
  //   return notFound()
  // }

  return (
    <div className="bg-black text-off-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rich-teal/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted-coral/20 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Back to Knowledge Hub link */}
            <Link
              href="/knowledge-hub"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Hub
            </Link>

            {/* Category Icon */}
            <div className="flex justify-center items-center mb-6">
              <div className="p-4 bg-black/20 rounded-full backdrop-blur-sm">
                <CategoryIcon className="w-12 h-12 text-rich-teal" />
              </div>
            </div>

            {/* Category Title and Description */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">{category.description}</p>

            {/* Search Input */}
            <motion.div className="relative max-w-2xl mx-auto" whileHover={{ scale: 1.02 }}>
              <div className="flex items-stretch">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg bg-white/5 border-white/10 backdrop-blur-xl rounded-l-2xl rounded-r-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <Button
                  onClick={handleSearch}
                  className="bg-rich-teal hover:bg-rich-teal/90 rounded-l-none rounded-r-2xl h-[60px] px-6"
                >
                  <Search className="w-6 h-6" />
                </Button>
              </div>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Articles Gallery Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <div className="text-2xl font-bold">
              {filteredArticles.length} {filteredArticles.length === 1 ? "Article" : "Articles"}
            </div>
            <div className="flex items-center space-x-2">
              {/* Sort Button */}
              <Button variant="outline" size="sm" className="border-white/10" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                <span className="ml-2">Sort</span>
              </Button>

              {/* Filter Button */}
              <Button
                variant="outline"
                size="sm"
                className={`border-white/10 ${activeFilter ? "bg-white/10" : ""}`}
                onClick={() => setActiveFilter(null)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {activeFilter || "All"}
              </Button>
            </div>
          </div>

          {/* Articles Grid */}
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentArticles.map((article) => {
                // Determine difficulty level
                const difficulty = article.level === 1 ? "Beginner" : article.level === 2 ? "Intermediate" : "Advanced"

                // Determine difficulty color
                const difficultyColor =
                  article.level === 1
                    ? "bg-pale-cyan/20 text-pale-cyan"
                    : article.level === 2
                      ? "bg-muted-coral/20 text-soft-peach"
                      : "bg-rich-teal/20 text-rich-teal"

                return (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-colors h-full flex flex-col"
                  >
                    {/* Article Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge variant="secondary" className={`absolute bottom-4 left-4 ${difficultyColor}`}>
                        {difficulty}
                      </Badge>
                    </div>

                    {/* Article Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-white/60 mb-4 line-clamp-3">{article.summary}</p>

                      {/* Article Footer */}
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-white/40" />
                          <span className="text-sm text-white/40">
                            {new Date(article.date_added).toLocaleDateString()}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 hover:bg-white/10"
                          onClick={() => openArticle(article)}
                        >
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {sortedArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/5 rounded-xl"
            >
              <BookOpen className="w-16 h-16 mx-auto text-white/20 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                {hasSearched ? "No articles found" : "No articles available"}
              </h3>
              <p className="text-white/60 mb-4">
                {hasSearched ? "Try adjusting your search or filters" : "This category doesn't have any articles yet"}
              </p>
              {hasSearched && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveFilter(null)
                    setHasSearched(false)
                    // Reload the original articles for this category
                    if (category) {
                      const fetchArticles = async () => {
                        setIsLoading(true)
                        try {
                          const response = await api.get(`/articles?k_id=${category.id}`)
                          setArticles(response.data)
                        } catch (err) {
                          console.error("Error fetching articles:", err)
                        } finally {
                          setIsLoading(false)
                        }
                      }
                      fetchArticles()
                    }
                  }}
                >
                  Clear search
                </Button>
              )}
            </motion.div>
          )}

          {/* Pagination Controls */}
          {sortedArticles.length > 0 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              {/* Previous Page Button */}
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 hover:bg-white/10"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page Number Buttons */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    className={
                      currentPage === number
                        ? "bg-rich-teal hover:bg-rich-teal/90"
                        : "border-white/10 hover:bg-white/10"
                    }
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                ))}
              </div>

              {/* Next Page Button */}
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 hover:bg-white/10"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Page indicator */}
          {sortedArticles.length > 0 && (
            <div className="text-center mt-4 text-white/60">
              Page {currentPage} of {totalPages} ({filteredArticles.length} articles)
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      <ArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} article={selectedArticle} />
    </div>
  )
}
