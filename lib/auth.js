"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

/**
 * Custom hook for authentication
 *
 * Provides user state and authentication methods.
 * Uses JWT tokens for authentication with Django backend.
 */
export function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  // Check for existing user on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        if (token && userData) {
          setUser(JSON.parse(userData))

          // Optionally verify token with backend
          try {
            await axios.get("https://aranya-backend.onrender.com/api/auth/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          } catch (err) {
            // If token verification fails, log out
            console.error("Token verification failed:", err)
            toast({
              title: "Session expired",
              description: "Your session has expired. Please log in again.",
              variant: "destructive",
            })
            logout()
            router.push("/auth/login") // Redirect to login
            return
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        setError("Failed to authenticate user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  /**
   * Log in a user
   * @param username User username or email
   * @param password User password
   */
  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post("https://aranya-backend.onrender.com/api/auth/login/", {
        username,
        password,
      })

      const { token, refresh, user: userData } = response.data

      // Store tokens and user data
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refresh)
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)

      // Show success toast
      toast({
        title: "Welcome back!",
        description: `You've successfully signed in as ${userData.username || userData.email}`,
      })

      return userData
    } catch (err) {
      console.error("Login failed:", err)
      setError(err.response?.data?.message || "Invalid credentials")

      // Show error toast
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      })

      throw err
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Log out the current user
   */
  const logout = async () => {
    setIsLoading(true)
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      setUser(null)

      // Show logout toast
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/auth/login") // Redirect to login
    } catch (err) {
      console.error("Logout failed:", err)

      // Show error toast
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Register a new user
   * @param userData User registration data
   */
  const register = async (userData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post("https://aranya-backend.onrender.com/api/auth/register/", userData)

      // Show success toast
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      })

      return response.data
    } catch (err) {
      console.error("Registration failed:", err)
      setError(err.response?.data?.message || "Registration failed")

      // Show error toast
      toast({
        title: "Registration failed",
        description: err.response?.data?.message || "Registration failed. Please try again.",
        variant: "destructive",
      })

      throw err
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Refresh the access token using the refresh token
   */
  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken")
      if (!refresh) throw new Error("No refresh token available")

      const response = await axios.post("https://aranya-backend.onrender.com/api/auth/token/refresh/", {
        refresh,
      })

      localStorage.setItem("token", response.data.access)
      return response.data.access
    } catch (err) {
      console.error("Token refresh failed:", err)

      // Show error toast
      toast({
        title: "Session expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive",
      })

      logout()
      router.push("/auth/login") // Redirect to login
      throw err
    }
  }

  return {
    user,
    login,
    logout,
    register,
    refreshToken,
    isLoading,
    error,
    isAuthenticated: !!user,
  }
}

export default useAuth
