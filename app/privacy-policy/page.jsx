import { Layout } from "@/components/Layout"
import { Typography } from "@/components/ui/Typography"
import { PageHeader } from "@/components/PageHeader"
export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="bg-black text-off-white min-h-screen">
        <PageHeader title="Privacy Policy" subtitle="How we protect and manage your data" />

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <Typography variant="h2" className="mb-6">
                Our Commitment to Privacy
              </Typography>

              <Typography variant="body" className="mb-6">
                At Aranya, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect
                your personal information when you use our services.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                Information We Collect
              </Typography>
              <Typography variant="body" className="mb-6">
                We collect information that you provide directly to us, such as when you create an account, update your
                profile, or interact with features on our platform. This may include your name, email address, and other
                personal details.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                How We Use Your Information
              </Typography>
              <Typography variant="body" className="mb-6">
                We use the information we collect to provide, maintain, and improve our services, to communicate with
                you, and to personalize your experience on our platform.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                Data Security
              </Typography>
              <Typography variant="body" className="mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                Your Rights
              </Typography>
              <Typography variant="body" className="mb-6">
                You have the right to access, correct, or delete your personal information at any time. You can manage
                your preferences through your account settings or by contacting our support team.
              </Typography>

              <Typography variant="body" className="mt-8 text-white/60">
                Last updated: April 10, 2025
              </Typography>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
