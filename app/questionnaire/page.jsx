"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DiscoveryQuestionnaire } from "@/components/DiscoveryQuestionnaire"

/**
 * QuestionnairePage component
 * Displays the discovery questionnaire and handles completion
 */
export default function QuestionnairePage() {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)

  /**
   * Handle questionnaire completion
   * Shows success message and redirects to dashboard
   */
  const handleCompletion = () => {
    setIsCompleted(true)
    // You can add logic here to save the questionnaire results
    setTimeout(() => {
      router.push("/auth/login")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-pale-cyan dark:from-dark-slate dark:to-rich-teal flex items-center justify-center p-4">
      {isCompleted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Thank you for completing the questionnaire!</h2>
          <p>Redirecting you to your login...</p>
        </div>
      ) : (
        <DiscoveryQuestionnaire onComplete={handleCompletion} />
      )}
    </div>
  )
}
