"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { Layout } from "@/components/Layout"

/**
 * Background images for the login page carousel
 */
const backgrounds = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kalen-emsley-Bkci_8qcdvQ-unsplash%20(2).jpg-7GmqLwWhhkg6yRrXs1hfpUphZmgIDU.jpeg",
    heading: "Welcome Back to Your Journey",
    subheading: "Continue your path to mindfulness and self-discovery",
  },
  {
    url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1920&q=80",
    heading: "Reconnect with Your Center",
    subheading: "Resume your practice of peace and presence",
  },
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    heading: "Return to Tranquility",
    subheading: "Pick up where you left off on your mindful living journey",
  },
]

/**
 * LoginPage component
 * Provides user authentication functionality with animated background
 */
export default function LoginPage() {
  // Form state
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Background image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Router and auth hooks
  const router = useRouter()
  const { login, user, isLoading } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Rotate background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgrounds.length)
    }, 15000)
    return () => clearInterval(timer)
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      await login(username, password)
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Invalid username or password. Please try again.",
      )
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

          {/* Login Form */}
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl">
            <div className="space-y-4 mb-8">
              <h1 className="text-3xl font-bold text-white">Welcome to Aranyaa</h1>
              <p className="text-white/80">Continue your journey to inner serenity</p>
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="mb-6 bg-red-500/20 text-white border-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Username/Email Field */}
                <div>
                  <Label htmlFor="username" className="text-white">
                    Username or Email
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter your username or email"
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                      placeholder="Enter your password"
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/50" />
                  <label htmlFor="remember" className="text-sm text-white/80">
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-white hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-white text-rich-teal hover:bg-white/90"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              {/* Social Login Options */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Google
                </Button>
                <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Apple
                </Button>
                <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Facebook
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-white/80">
                Not registered yet?{" "}
                <Link href="/auth/signup" className="text-white hover:underline font-medium">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
