"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  Zap,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format, parseISO, isToday, isYesterday, addDays, subDays } from "date-fns"
import { GradientBackground } from "@/components/ui/GradientBackground"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import api from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Map mood to icon for visual representation
const moodIcons = {
  Happy: <Smile className="text-green-400" />,
  Sad: <Frown className="text-blue-400" />,
  Neutral: <Meh className="text-gray-400" />,
  Excited: <Zap className="text-yellow-400" />,
  Stressed: <AlertTriangle className="text-red-400" />,
}

/**
 * Format date for display with relative terms
 */
const formatDateWithRelative = (dateString) => {
  const date = parseISO(dateString)

  if (isToday(date)) {
    return "Today"
  } else if (isYesterday(date)) {
    return "Yesterday"
  } else {
    return format(date, "MMMM d, yyyy")
  }
}

/**
 * Format date as YYYY-MM-DD for API requests
 */
const formatDateForApi = (date) => {
  return format(date, "yyyy-MM-dd")
}

/**
 * JournalingPage component
 * Provides a journaling interface for users to create, edit, and manage journal entries
 * Now using API instead of localStorage and organized by date
 */
export default function JournalingPage() {
  // State for journal entries and form
  const [entries, setEntries] = useState([])
  const [newEntry, setNewEntry] = useState("")
  const [newMood, setNewMood] = useState("Neutral")
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState("")
  const [editMood, setEditMood] = useState("Neutral")

  // State for API interactions
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // State for delete confirmation
  const [deleteId, setDeleteId] = useState(null)

  // State for date navigation
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dateLabel, setDateLabel] = useState("Today")

  // Ref for textarea focus when editing
  const textareaRef = useRef(null)

  // Fetch journal entries for the current date on component mount and when date changes
  useEffect(() => {
    fetchEntriesForDate(currentDate)

    // Update date label
    if (isToday(currentDate)) {
      setDateLabel("Today")
    } else if (isYesterday(currentDate)) {
      setDateLabel("Yesterday")
    } else {
      setDateLabel(format(currentDate, "MMMM d, yyyy"))
    }
  }, [currentDate])

  // Focus textarea when editing
  useEffect(() => {
    if (editingId && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [editingId])

  /**
   * Fetch journal entries for a specific date
   */
  const fetchEntriesForDate = async (date) => {
    setIsLoading(true)
    setError(null)

    try {
      const formattedDate = formatDateForApi(date)
      const response = await api.get(`/journal/?search=${formattedDate}`)

      // Sort entries by timestamp (newest first)
      const sortedEntries = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

      setEntries(sortedEntries)
    } catch (err) {
      console.error("Error fetching journal entries:", err)
      setError("Failed to load journal entries. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Navigate to previous day
   */
  const goToPreviousDay = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1))
  }

  /**
   * Navigate to next day
   */
  const goToNextDay = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1))
  }

  /**
   * Go to today
   */
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  /**
   * Create a new journal entry
   */
  const handleSubmit = async () => {
    if (!newEntry.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Create new entry via API
      await api.post("/journal/", {
        mood: newMood,
        content: newEntry,
      })

      // Refresh entries to show the new one
      await fetchEntriesForDate(currentDate)

      // Clear form
      setNewEntry("")
      setNewMood("Neutral")

      // Show success toast
      toast({
        title: "Journal entry created",
        description: "Your journal entry has been saved successfully.",
      })
    } catch (err) {
      console.error("Error creating journal entry:", err)
      setError("Failed to save your journal entry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Start editing an entry
   */
  const handleEdit = (entry) => {
    setEditingId(entry.id)
    setEditContent(entry.content)
    setEditMood(entry.mood)
  }

  /**
   * Save edited entry
   */
  const handleSaveEdit = async () => {
    if (!editingId) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Update entry via API
      await api.put(`/journal/${editingId}/`, {
        mood: editMood,
        content: editContent,
      })

      // Refresh entries to show the updated one
      await fetchEntriesForDate(currentDate)

      // Exit edit mode
      setEditingId(null)
      setEditContent("")
      setEditMood("Neutral")

      // Show success toast
      toast({
        title: "Journal entry updated",
        description: "Your journal entry has been updated successfully.",
      })
    } catch (err) {
      console.error("Error updating journal entry:", err)
      setError("Failed to update your journal entry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Cancel editing
   */
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditContent("")
    setEditMood("Neutral")
  }

  /**
   * Confirm deletion of an entry
   */
  const confirmDelete = (id) => {
    setDeleteId(id)
  }

  /**
   * Delete an entry after confirmation
   */
  const handleDelete = async () => {
    if (!deleteId) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Delete entry via API
      await api.delete(`/journal/${deleteId}/`)

      // Refresh entries
      await fetchEntriesForDate(currentDate)

      // Close confirmation dialog
      setDeleteId(null)

      // Show success toast
      toast({
        title: "Journal entry deleted",
        description: "Your journal entry has been deleted successfully.",
      })
    } catch (err) {
      console.error("Error deleting journal entry:", err)
      setError("Failed to delete your journal entry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Format time for display
   */
  const formatTime = (dateString) => {
    const date = parseISO(dateString)
    return format(date, "h:mm a")
  }

  return (
    <Layout>
      <div className="bg-black text-off-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-black">
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
              {/* Logo */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-white rounded-full opacity-20 blur-md"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250211_124203_Canva.jpg-MFGUwzCJRN5TUx2f4Msr0b0cWGQNMl.jpeg"
                  alt="Aranya Logo"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Page Title */}
              <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-orange to-brand-white bg-clip-text text-transparent">
                My Journal
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
                Capture your thoughts, reflections, and experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Journal Entry Form - Only show for today */}
        {isToday(currentDate) && (
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-rich-teal/10 to-pale-cyan/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-10"
              >
                <h2 className="text-xl font-semibold mb-4">New Entry</h2>

                {/* Error message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-white/90">{error}</p>
                  </div>
                )}

                {/* Mood selector */}
                <div className="mb-4">
                  <Label htmlFor="mood" className="block mb-2 text-white/80">
                    How are you feeling today?
                  </Label>
                  <Select value={newMood} onValueChange={setNewMood}>
                    <SelectTrigger className="w-full bg-white/5 border-white/10">
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Happy">
                        <div className="flex items-center">
                          <Smile className="mr-2 h-4 w-4 text-green-400" />
                          Happy
                        </div>
                      </SelectItem>
                      <SelectItem value="Sad">
                        <div className="flex items-center">
                          <Frown className="mr-2 h-4 w-4 text-blue-400" />
                          Sad
                        </div>
                      </SelectItem>
                      <SelectItem value="Neutral">
                        <div className="flex items-center">
                          <Meh className="mr-2 h-4 w-4 text-gray-400" />
                          Neutral
                        </div>
                      </SelectItem>
                      <SelectItem value="Excited">
                        <div className="flex items-center">
                          <Zap className="mr-2 h-4 w-4 text-yellow-400" />
                          Excited
                        </div>
                      </SelectItem>
                      <SelectItem value="Stressed">
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                          Stressed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Journal content */}
                <Textarea
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="What's on your mind today?"
                  className="min-h-[150px] bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 mb-4"
                />

                <div className="flex items-center justify-between">
                  {/* Current date and time */}
                  <div className="flex items-center text-white/60 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(), "MMMM d, yyyy")}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{format(new Date(), "h:mm a")}</span>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!newEntry.trim() || isSubmitting}
                    className="bg-rich-teal hover:bg-rich-teal/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Entry"
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Journal Entries List with Date Navigation */}
        <section className="py-8 px-4 pb-24">
          <div className="container mx-auto max-w-3xl">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" onClick={goToPreviousDay} className="border-white/10">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Day
              </Button>

              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-white/90">{dateLabel}</h2>
                <span className="text-sm text-white/60">{format(currentDate, "EEEE, MMMM d, yyyy")}</span>
                {!isToday(currentDate) && (
                  <Button variant="link" size="sm" onClick={goToToday} className="text-rich-teal mt-1">
                    Go to Today
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={goToNextDay}
                disabled={isToday(currentDate)}
                className="border-white/10"
              >
                Next Day <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-rich-teal" />
              </div>
            )}

            {/* Entries for the selected date */}
            <AnimatePresence>
              {!isLoading && entries.length > 0
                ? entries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6"
                    >
                      {editingId === entry.id ? (
                        // Edit mode
                        <>
                          {/* Mood selector for edit mode */}
                          <div className="mb-4">
                            <Label htmlFor={`edit-mood-${entry.id}`} className="block mb-2 text-white/80">
                              Mood
                            </Label>
                            <Select value={editMood} onValueChange={setEditMood}>
                              <SelectTrigger id={`edit-mood-${entry.id}`} className="w-full bg-white/5 border-white/10">
                                <SelectValue placeholder="Select your mood" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Happy">
                                  <div className="flex items-center">
                                    <Smile className="mr-2 h-4 w-4 text-green-400" />
                                    Happy
                                  </div>
                                </SelectItem>
                                <SelectItem value="Sad">
                                  <div className="flex items-center">
                                    <Frown className="mr-2 h-4 w-4 text-blue-400" />
                                    Sad
                                  </div>
                                </SelectItem>
                                <SelectItem value="Neutral">
                                  <div className="flex items-center">
                                    <Meh className="mr-2 h-4 w-4 text-gray-400" />
                                    Neutral
                                  </div>
                                </SelectItem>
                                <SelectItem value="Excited">
                                  <div className="flex items-center">
                                    <Zap className="mr-2 h-4 w-4 text-yellow-400" />
                                    Excited
                                  </div>
                                </SelectItem>
                                <SelectItem value="Stressed">
                                  <div className="flex items-center">
                                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                                    Stressed
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Textarea
                            ref={textareaRef}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[120px] bg-white/5 border-white/10 text-white/90 mb-4"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelEdit}
                              className="border-white/10 hover:bg-white/10"
                              disabled={isSubmitting}
                            >
                              <X className="w-4 h-4 mr-1" /> Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveEdit}
                              className="bg-rich-teal hover:bg-rich-teal/90"
                              disabled={!editContent.trim() || isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4 mr-1" /> Save
                                </>
                              )}
                            </Button>
                          </div>
                        </>
                      ) : (
                        // View mode
                        <>
                          {/* Time indicator */}
                          <div className="flex justify-between items-center mb-3">
                            {/* Mood indicator */}
                            <div className="flex items-center">
                              <div className="bg-white/10 rounded-full p-2 mr-2">
                                {moodIcons[entry.mood] || <Meh className="text-gray-400" />}
                              </div>
                              <span className="text-sm font-medium">{entry.mood}</span>
                            </div>

                            <div className="text-white/60 text-sm">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{formatTime(entry.timestamp)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="whitespace-pre-wrap text-white/90 mb-4">{entry.content}</div>
                          <div className="flex justify-end">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(entry)}
                                className="border-white/10 hover:bg-white/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => confirmDelete(entry.id)}
                                className="border-white/10 hover:bg-white/10 hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))
                : !isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center py-12 text-white/60 bg-white/5 rounded-xl border border-white/10"
                    >
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-white/30" />
                      <p className="mb-2">No journal entries for {dateLabel.toLowerCase()}.</p>
                      {isToday(currentDate) ? (
                        <p>Start writing to create your first entry!</p>
                      ) : (
                        <Button variant="outline" size="sm" onClick={goToToday} className="mt-2 border-white/10">
                          Go to Today
                        </Button>
                      )}
                    </motion.div>
                  )}
            </AnimatePresence>
          </div>
        </section>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent className="bg-black/95 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Delete Journal Entry</DialogTitle>
              <DialogDescription className="text-white/70">
                Are you sure you want to delete this journal entry? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                className="border-white/10"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
