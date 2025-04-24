import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/Toaster"

/**
 * Inter font configuration with Latin subset
 */
const inter = Inter({ subsets: ["latin"] })

/**
 * Metadata for the application
 */
export const metadata = {
  title: "Aranya",
  description: "Embrace the Wilderness, Discover Inner Serenity",
  generator: "v0.dev",
}

/**
 * Root layout component that wraps all pages
 * Provides theme support and consistent structure
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="aranya-theme">
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
