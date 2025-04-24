"use client"
import { useState } from "react"
/**
 * Custom hook to manage article modal state
 *
 * @returns Functions and state for article modal management
 */
export function useArticleModal() {
  // State for modal visibility and current article
  const [isOpen, setIsOpen] = useState(false)
  const [article, setArticle] = useState(null)
  /**
   * Open the modal with the selected article
   */
  const openArticle = (selectedArticle) => {
    setArticle(selectedArticle)
    setIsOpen(true)
  }
  /**
   * Close the modal
   */
  const closeArticle = () => setIsOpen(false)
  return { isOpen, article, openArticle, closeArticle }
}
