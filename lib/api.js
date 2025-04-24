import axios from "axios"
import { toast } from "@/hooks/use-toast"

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "https://aranya-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token")

    // If token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle common response scenarios
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        const response = await axios.post(`${"https://aranya-backend.onrender.com/api"}/auth/token/refresh/`, {
          refresh: refreshToken,
        })

        // Store the new token
        localStorage.setItem("token", response.data.access)

        // Update the Authorization header
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`

        // Show token refresh toast
        toast({
          title: "Session refreshed",
          description: "Your session has been refreshed.",
        })

        // Retry the original request
        return axios(originalRequest)
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")

        // Show session expired toast
        toast({
          title: "Session expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })

        // Only redirect if we're in the browser
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login"
        }

        return Promise.reject(refreshError)
      }
    }

    // For other errors, show a toast message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status
      const message = error.response.data?.message || error.response.data?.detail || "An error occurred"

      if (status === 403) {
        toast({
          title: "Access denied",
          description: "You don't have permission to perform this action.",
          variant: "destructive",
        })
      } else if (status === 404) {
        toast({
          title: "Not found",
          description: "The requested resource was not found.",
          variant: "destructive",
        })
      } else if (status === 500) {
        toast({
          title: "Server error",
          description: "An internal server error occurred. Please try again later.",
          variant: "destructive",
        })
      } else if (status !== 401) {
        // We already handle 401 above
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        })
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast({
        title: "Network error",
        description: "Unable to connect to the server. Please check your internet connection.",
        variant: "destructive",
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    }

    return Promise.reject(error)
  },
)

export default api
