"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { useRouter } from "next/navigation"
export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    // Add your sign-up logic here
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Enter your name" required disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" type="email" required disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Create a password" required disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest">Area of Interest</Label>
          <Select disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select your interests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meditation">Meditation</SelectItem>
              <SelectItem value="mindfulness">Mindfulness</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="breathing">Breathing Exercises</SelectItem>
              <SelectItem value="journaling">Journaling</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <a href="#" className="text-muted-coral hover:underline">
            terms & conditions
          </a>
        </label>
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  )
}
