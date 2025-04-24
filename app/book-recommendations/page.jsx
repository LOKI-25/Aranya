import { Layout } from "@/components/Layout"
import { BookRecommendationsContent } from "@/components/BookRecommendationsContent"
/**
 * Metadata for the book recommendations page
 */
export const metadata = {
  title: "Book Recommendations | Aranya",
  description:
    "Discover transformative books that promote self-awareness, mindfulness, resilience, and holistic living.",
}
/**
 * BookRecommendationsPage component
 * Displays curated book recommendations for mindfulness and personal growth
 */
export default function BookRecommendationsPage() {
  return (
    <Layout>
      <BookRecommendationsContent />
    </Layout>
  )
}
