"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { DiscoveryQuestionnaire } from "@/components/DiscoveryQuestionnaire"
import { useAuth } from "@/lib/auth"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}
const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    year_of_birth: new Date().getFullYear() - 25, // Default to 25 years ago
  })
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const router = useRouter()
  const { login, register } = useAuth()

  const handleRegisterChange = (e) => {
    const { id, value } = e.target
    setRegisterData({
      ...registerData,
      [id]: value,
    })
  }

  const handleLoginChange = (e) => {
    const { id, value } = e.target
    setLoginData({
      ...loginData,
      [id.replace("login-", "")]: value,
    })
  }

  const handleGenderChange = (value) => {
    setRegisterData({
      ...registerData,
      gender: value,
    })
  }

  const handleYearChange = (e) => {
    const { id, value } = e.target
    // Ensure year is a number
    const yearValue = Number.parseInt(value, 10)
    if (!isNaN(yearValue)) {
      setRegisterData({
        ...registerData,
        year_of_birth: yearValue,
      })
    }
  }

  async function onLoginSubmit(event) {
    event.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      await login(loginData.email, loginData.password)
      router.push("/dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  async function onRegisterSubmit(event) {
    event.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    // Validate passwords match
    if (registerData.password !== registerData.confirm_password) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await register(registerData)
      setSuccessMessage(response.message || "Registration successful! You can now log in.")

      // Switch to login tab after successful registration
      document.querySelector('[value="login"]').click()

      // Clear form
      setRegisterData({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        gender: "Male",
        year_of_birth: new Date().getFullYear() - 25,
      })
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" className="w-full max-w-md">
      <Tabs defaultValue="signup" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <TabsContent value="signup">
            <motion.div variants={stagger} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <motion.div variants={fadeIn} className="space-y-4">
                <h2 className="font-serif text-h2 font-semibold text-brand-orange">Begin Your Aranya Journey</h2>
                <p className="font-sans text-body text-light-slate dark:text-off-white">
                  Sign up to start your path to inner serenity through nature.
                </p>
              </motion.div>
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
              )}
              <form onSubmit={onRegisterSubmit} className="space-y-4">
                <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-light-slate dark:text-off-white">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      value={registerData.first_name}
                      onChange={handleRegisterChange}
                      placeholder="Jane"
                      required
                      className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-light-slate dark:text-off-white">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      value={registerData.last_name}
                      onChange={handleRegisterChange}
                      placeholder="Doe"
                      required
                      className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                    />
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-2">
                  <Label htmlFor="username" className="text-light-slate dark:text-off-white">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    placeholder="janedoe"
                    required
                    className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-2">
                  <Label htmlFor="email" className="text-light-slate dark:text-off-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="jane@example.com"
                    type="email"
                    required
                    className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-light-slate dark:text-off-white">
                      Gender
                    </Label>
                    <Select value={registerData.gender} onValueChange={handleGenderChange}>
                      <SelectTrigger className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year_of_birth" className="text-light-slate dark:text-off-white">
                      Year of Birth
                    </Label>
                    <Input
                      id="year_of_birth"
                      value={registerData.year_of_birth}
                      onChange={handleYearChange}
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      required
                      className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                    />
                  </div>
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-2">
                  <Label htmlFor="password" className="text-light-slate dark:text-off-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    type="password"
                    required
                    className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-2">
                  <Label htmlFor="confirm_password" className="text-light-slate dark:text-off-white">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm_password"
                    value={registerData.confirm_password}
                    onChange={handleRegisterChange}
                    type="password"
                    required
                    className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-slate dark:text-off-white"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-muted-coral hover:underline">
                      terms & conditions
                    </a>
                  </label>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Button
                    className="w-full bg-rich-teal hover:bg-light-teal text-off-white"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </TabsContent>
          <TabsContent value="login">
            <motion.div variants={stagger} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <motion.div variants={fadeIn} className="space-y-4">
                <h2 className="font-serif text-h2 font-semibold text-rich-teal dark:text-light-teal">Welcome Back</h2>
                <p className="font-sans text-body text-light-slate dark:text-off-white">
                  Continue your journey of mindfulness and growth.
                </p>
              </motion.div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
              )}
              <form onSubmit={onLoginSubmit} className="space-y-6">
                <motion.div variants={fadeIn} className="space-y-2">
                  <Label htmlFor="login-email" className="text-light-slate dark:text-off-white">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="jane@example.com"
                    type="email"
                    required
                    className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-2">
                  <Label htmlFor="login-password" className="text-light-slate dark:text-off-white">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    type="password"
                    required
                    className="border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent"
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Button
                    className="w-full bg-rich-teal hover:bg-light-teal text-off-white"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
      {showQuestionnaire && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <DiscoveryQuestionnaire
            onClose={() => {
              setShowQuestionnaire(false)
              router.push("/dashboard")
            }}
          />
        </div>
      )}
    </motion.div>
  )
}
