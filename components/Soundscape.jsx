"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
export function Soundscape() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  useEffect(() => {
    const savedPreference = localStorage.getItem("soundscapePreference")
    if (savedPreference === "on") {
      setIsPlaying(true)
    }
    audioRef.current = new Audio("/path-to-your-audio-file.mp3") // Replace with your audio file
    audioRef.current.loop = true
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
        localStorage.setItem("soundscapePreference", "on")
      } else {
        audioRef.current.pause()
        localStorage.setItem("soundscapePreference", "off")
      }
    }
  }, [isPlaying])
  const toggleSound = () => {
    setIsPlaying(!isPlaying)
  }
  return (
    <motion.button
      className="p-2 rounded-full bg-pale-cyan dark:bg-rich-teal text-rich-teal dark:text-pale-cyan"
      onClick={toggleSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </motion.button>
  )
}
