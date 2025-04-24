"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/Typography"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { X, Clock, Calendar } from "lucide-react"
import Image from "next/image"
/**
 * ArticleModal component
 * Modal for displaying full article content with reflective questions
 */
export function ArticleModal({ isOpen, onClose, article }) {
  // Track user's responses to reflective questions
  const [reflections, setReflections] = useState({})

  // Don't render anything if no article is provided
  if (!article) return null

  /**
   * Handle changes to reflection text inputs
   */
  const handleReflectionChange = (questionId, value) => {
    setReflections((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-white/10 text-off-white p-0">
        {/* Close button */}
        <DialogClose className="absolute right-4 top-4 z-10">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>

        {/* Cover Image with title overlay */}
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={article.image_url || "/placeholder.svg?height=800&width=1200"}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <Badge variant="secondary" className="mb-2">
              {article.level === 1 ? "Beginner" : article.level === 2 ? "Intermediate" : "Advanced"}
            </Badge>
            <Typography variant="h1" className="text-2xl md:text-3xl font-bold text-white">
              {article.title}
            </Typography>
          </div>
        </div>

        <div className="p-6">
          {/* Article Metadata */}
          <div className="flex flex-wrap gap-4 mb-6 text-white/60 text-sm">
            {/* Reading time - using a placeholder since it's not in the API */}
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{article.level === 1 ? "5-10 min" : article.level === 2 ? "10-15 min" : "15-20 min"}</span>
            </div>

            {/* Publication date */}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(article.date_added).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.split(",").map((tag) => (
                <Badge key={tag.trim()} variant="outline" className="bg-white/5 hover:bg-white/10">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert max-w-none mb-8">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <Typography variant="body">{article.summary}</Typography>
            )}
          </div>

          {/* Reflective Questions */}
          {(article.reflective_question_1 || article.reflective_question_2) && (
            <div className="space-y-6 mt-8 border-t border-white/10 pt-6">
              <Typography variant="h3" className="text-xl font-semibold">
                Reflective Questions
              </Typography>

              <div className="grid gap-6 md:grid-cols-2">
                {article.reflective_question_1 && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <Typography variant="h4" className="text-lg font-medium mb-3">
                      {article.reflective_question_1}
                    </Typography>
                    
                  </div>
                )}

                {article.reflective_question_2 && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <Typography variant="h4" className="text-lg font-medium mb-3">
                      {article.reflective_question_2}
                    </Typography>
                    
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
