import { Layout } from "@/components/Layout"
import { Typography } from "@/components/ui/Typography"
import { PageHeader } from "@/components/PageHeader"
export default function TermsOfServicePage() {
  return (
    <Layout>
      <div className="bg-black text-off-white min-h-screen">
        <PageHeader title="Terms of Service" subtitle="Guidelines for using our platform" />

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <Typography variant="h2" className="mb-6">
                Terms and Conditions
              </Typography>

              <Typography variant="body" className="mb-6">
                Welcome to Aranya. By accessing or using our services, you agree to be bound by these Terms of Service.
                Please read them carefully.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                Use of Services
              </Typography>
              <Typography variant="body" className="mb-6">
                You may use our services only as permitted by these terms and any applicable laws. You may not misuse
                our services, interfere with their operation, or attempt to access them using a method other than the
                interface and instructions we provide.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                User Accounts
              </Typography>
              <Typography variant="body" className="mb-6">
                To access certain features of our platform, you may need to create an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that occur under your
                account.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                Content and Intellectual Property
              </Typography>
              <Typography variant="body" className="mb-6">
                Our services contain content owned or licensed by Aranya. This content is protected by copyright,
                trademark, and other laws, and you may not use it without our permission.
              </Typography>

              <Typography variant="h3" className="mt-8 mb-4">
                Termination
              </Typography>
              <Typography variant="body" className="mb-6">
                We may suspend or terminate your access to our services if you violate these terms or engage in
                fraudulent or illegal activities.
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
