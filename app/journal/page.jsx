import { Typography } from "@/components/ui/Typography"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
/**
 * JournalPage component
 * Simple placeholder for journal entries
 */
export default function JournalPage() {
  return (
    <div className="space-y-6">
      <Typography variant="h1">Journal</Typography>
      <Button className="mb-4">New Entry</Button>
      <div className="space-y-4">
        <Card className="p-6">
          <Typography variant="h3" className="mb-2">
            Today's Reflection
          </Typography>
          <Typography variant="body">
            I felt a sense of calm during my morning meditation. The day went smoothly, and I'm grateful for...
          </Typography>
        </Card>
        <Card className="p-6">
          <Typography variant="h3" className="mb-2">
            Yesterday's Insights
          </Typography>
          <Typography variant="body">
            Reflecting on yesterday's challenges, I realized that I need to focus more on...
          </Typography>
        </Card>
      </div>
    </div>
  )
}
