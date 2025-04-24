"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Typography } from "@/components/ui/typography"
import { Layout } from "@/components/Layout"
import axios from "axios"

/**
 * Background images for the signup page carousel
 */
const backgrounds = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kalen-emsley-Bkci_8qcdvQ-unsplash%20(2).jpg-7GmqLwWhhkg6yRrXs1hfpUphZmgIDU.jpeg",
    heading: "Begin Your Inner Journey",
    subheading: "Where mindfulness meets self-discovery",
  },
  {
    url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=80",
    heading: "Find Your Center",
    subheading: "Cultivate peace and presence in your daily life",
  },
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    heading: "Embrace Tranquility",
    subheading: "Your path to mindful living starts here",
  },
]

// Generate years for the year of birth dropdown
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

/**
 * SignUpPage component
 * Provides user registration functionality with animated background
 */
export default function SignUpPage() {
  // Background image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    gender: "",
    year_of_birth: currentYear - 25, // Default to 25 years ago
  })

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Rotate background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgrounds.length)
    }, 15000)
    return () => clearInterval(timer)
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Basic validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match")
      return
    }

    try {
      setIsSubmitting(true)

      // Call the registration API
      const response = await axios.post("https://aranya-backend.onrender.com/api/auth/register/", formData)

      // Handle successful registration
      setSuccess(response.data.message || "Registration successful! Redirecting to questionnaire...")

      // Store the token if it's returned
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }

      // Redirect to questionnaire page after a short delay
      setTimeout(() => {
        router.push("/questionnaire")
      }, 2000)
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error)
      setError(error.response?.data?.message || error.response?.data?.error || "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden pt-16">
        {/* Background Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={backgrounds[currentImageIndex].url || "/placeholder.svg"}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10 px-4 flex-grow flex items-center">
          {/* Form Section */}
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl">
            <div className="space-y-4 mb-8">
              <Typography variant="h1" className="mb-4 text-brand-orange">
                Join Aranyaa
              </Typography>
              <Typography variant="body" className="text-white/80">
                Begin your journey to wilderness and inner peace
              </Typography>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-white">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Username Field */}
                <div>
                  <Label htmlFor="username" className="text-white">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Choose a username"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <Label htmlFor="confirm_password" className="text-white">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Gender Selection */}
                <div>
                  <Label htmlFor="gender" className="text-white">
                    Gender
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year of Birth */}
                <div>
                  <Label htmlFor="year_of_birth" className="text-white">
                    Year of Birth
                  </Label>
                  <Select
                    value={formData.year_of_birth.toString()}
                    onValueChange={(value) => handleSelectChange("year_of_birth", Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select year of birth" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required className="border-white/50" />
                <label htmlFor="terms" className="text-sm text-white/80">
                  I agree to the{" "}
                  <Link href="/terms-of-service" className="text-white hover:underline">
                    terms & conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-white text-rich-teal hover:bg-white/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-white/80">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-white hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </div>

          {/* Welcome Message (desktop only) */}
          <div className="hidden md:block text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              {backgrounds[currentImageIndex].heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl"
            >
              {backgrounds[currentImageIndex].subheading}
            </motion.p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
