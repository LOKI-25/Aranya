import { Layout } from "@/components/Layout"
import { Typography } from "@/components/ui/Typography"
import { PageHeader } from "@/components/PageHeader"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
export default function ContactSupportPage() {
  return (
    <Layout>
      <div className="bg-black text-off-white min-h-screen">
        <PageHeader title="Contact Support" subtitle="We're here to help with any questions or concerns" />

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <Typography variant="h3" className="mb-6">
                  Send us a message
                </Typography>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" className="bg-white/5 border-white/20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/5 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/20">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Questions</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="bg-white/5 border-white/20 min-h-[150px]"
                    />
                  </div>

                  <Button className="w-full bg-rich-teal hover:bg-rich-teal/90">Send Message</Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <Typography variant="h3" className="mb-4">
                    Support Hours
                  </Typography>
                  <Typography variant="body" className="mb-2">
                    Monday - Friday: 9am - 6pm EST
                  </Typography>
                  <Typography variant="body" className="mb-2">
                    Saturday: 10am - 4pm EST
                  </Typography>
                  <Typography variant="body">Sunday: Closed</Typography>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <Typography variant="h3" className="mb-4">
                    Email Support
                  </Typography>
                  <Typography variant="body" className="mb-2">
                    General Inquiries: support@aranya.com
                  </Typography>
                  <Typography variant="body" className="mb-2">
                    Technical Support: tech@aranya.com
                  </Typography>
                  <Typography variant="body">Feedback: feedback@aranya.com</Typography>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <Typography variant="h3" className="mb-4">
                    Response Time
                  </Typography>
                  <Typography variant="body">
                    We strive to respond to all inquiries within 24 hours during business days. Complex issues may
                    require additional time for investigation.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
