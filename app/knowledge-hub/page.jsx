"use client"
import dynamic from "next/dynamic"
import { ParallaxProvider } from "react-scroll-parallax"
import { Layout } from "@/components/Layout"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Dynamic import of KnowledgeHubContent to avoid SSR issues
 * with scroll and parallax effects
 */
const DynamicKnowledgeHubContent = dynamic(() => import("@/components/KnowledgeHubContent"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})
/**
 * KnowledgeHubPage component
 * Wraps the dynamic content with necessary providers
 */
export default function KnowledgeHubPage() {
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
  return (
    <Layout>
      <ParallaxProvider>
        <DynamicKnowledgeHubContent />
      </ParallaxProvider>
    </Layout>
  )
}
