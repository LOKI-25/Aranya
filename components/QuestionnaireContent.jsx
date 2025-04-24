"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Typography } from "@/components/ui/Typography"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const questions = [
  {
    id: "experience",
    question: "How would you describe your experience with mindfulness?",
    type: "radio",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "goals",
    question: "What are your primary goals for practicing mindfulness?",
    type: "text",
  },
  {
    id: "challenges",
    question: "What challenges do you face in your mindfulness practice?",
    type: "textarea",
  },
]
export function QuestionnaireContent() {
  const [answers, setAnswers] = useState({})
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted answers:", answers)
    // In a real application, you would send this data to your backend here
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h1" className="mb-6">
        Discovery Questionnaire
      </Typography>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <Label htmlFor={q.id}>{q.question}</Label>
              {q.type === "radio" ? (
                <RadioGroup
                  onValueChange={(value) => handleInputChange(q.id, value)}
                  className="flex flex-col space-y-1"
                >
                  {q.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                      <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : q.type === "textarea" ? (
                <Textarea
                  id={q.id}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Enter your answer here"
                />
              ) : (
                <Input
                  id={q.id}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="Enter your answer here"
                />
              )}
            </div>
          ))}
          <Button type="submit">Submit Questionnaire</Button>
        </form>
      </Card>
    </motion.div>
  )
}
