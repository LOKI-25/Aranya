/**
 * Format a date string to a readable format
 *
 * @param dateString ISO date string to format
 * @param options Formatting options
 * @returns Formatted date string
 */
export function formatDate(dateString, options = {}) {
  const defaultOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
  const mergedOptions = { ...defaultOptions, ...options }
  return new Date(dateString).toLocaleDateString(undefined, mergedOptions)
}
/**
 * Get today's date as a string in YYYY-MM-DD format
 *
 * @returns Today's date in YYYY-MM-DD format
 */
export function getTodayKey() {
  return new Date().toISOString().split("T")[0]
}
/**
 * Calculate the difference in days between two dates
 *
 * @param date1 First date
 * @param date2 Second date (defaults to today)
 * @returns Number of days between the dates
 */
export function getDaysDifference(date1, date2 = new Date()) {
  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
  return diffDays
}
