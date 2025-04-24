"use client"
import { useState, useEffect } from "react"
/**
 * Custom hook for using localStorage with React state
 *
 * Provides a way to persist state in localStorage while
 * maintaining the same API as useState.
 *
 * @param key - The localStorage key to store the value under
 * @param initialValue - The initial value to use if no value exists in localStorage
 * @returns A stateful value and a function to update it
 *
 * @example
 * const [count, setCount] = useLocalStorage('count', 0);
 * // count will be persisted in localStorage
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key)
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })
  // Update localStorage whenever the state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    }
  }, [key, storedValue])
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }
  return [storedValue, setValue]
}
