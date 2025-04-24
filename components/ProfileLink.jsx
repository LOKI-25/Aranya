"use client"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
export function ProfileLink() {
  const { user } = useAuth()
  if (!user) {
    return null
  }
  return (
    <Link href="/profile" className="font-sans text-body hover:text-soft-peach transition-colors">
      Profile
    </Link>
  )
}
