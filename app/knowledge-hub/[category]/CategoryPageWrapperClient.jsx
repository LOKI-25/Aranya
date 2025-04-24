"use client"

import { Layout } from "@/components/Layout"
import CategoryPage from "@/components/CategoryPage"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
/**
 * Categories with descriptions for the knowledge hub
 */
const categories = {
  "Mindfulness & Self-Awareness":
    "Discover practices to cultivate present-moment awareness and deeper self-understanding.",
  "Mental Resilience & Regulation": "Build mental strength and learn techniques to regulate thoughts and emotions.",
  "Body & Nervous System": "Explore the mind-body connection and somatic practices for wellbeing.",
  "Wisdom & Philosophy": "Delve into timeless wisdom traditions and philosophical insights for modern life.",
  "Daily Practices & Tools": "Practical techniques and tools to integrate mindfulness into everyday living.",
  "Emotions & Inner Patterns": "Understand emotional intelligence and transform limiting patterns.",
  "Integration & Alignment": "Bring all aspects of your practice together for wholeness and purpose.",
}
/**
 * CategoryPageWrapper component
 * Handles routing and category selection for knowledge hub categories
 */
export default function CategoryPageWrapperClient({ params }) {
  // Convert URL slug back to category name
  const slug = params.category

  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div className="min-h-screen bg-black text-off-white flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null // Or a "redirecting..." message
  }

  // We'll pass the slug to the CategoryPage component
  // The component will handle fetching the appropriate data
  return (
    <Layout>
      <CategoryPage slug={slug} />
    </Layout>
  )
}
