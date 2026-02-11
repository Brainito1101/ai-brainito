import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-foreground/70">
              Last updated: January 1, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using the Brainito platform and services provided by Wockito Innovative Solutions PVT LTD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground mb-6">
                Brainito provides AI-powered marketing analysis, strategy planning, and dedicated marketing services. Our services include the Free AI Plan, DIY Marketing Plan, and Hire a Marketer services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">To access certain features, you may need to create an account. You agree to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground mb-6">
                Paid services are billed in advance on a monthly basis. All fees are non-refundable except as specified in our Refund Policy. We reserve the right to modify pricing with 30 days notice.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">
                All content, features, and functionality of our platform are owned by Wockito Innovative Solutions PVT LTD and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. User Conduct</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Reproduce or distribute our content without permission</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                To the maximum extent permitted by law, Brainito shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
              <p className="text-muted-foreground mb-6">
                We may terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or our business.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground mb-6">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, contact us at:<br />
                <strong>Email:</strong> support@brainito.com<br />
                <strong>Address:</strong> Wockito Innovative Solutions PVT LTD, 1101, 11th Floor, Satyamev Elite, Ambli-Bopal, Vakil Saheb Bridge, T Junction, Ahmedabad, Gujarat 380058, India
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
