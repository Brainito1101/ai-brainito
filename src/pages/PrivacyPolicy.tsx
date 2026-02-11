import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-6">
                Wockito Innovative Solutions PVT LTD ("Brainito", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and business details you provide when signing up or contacting us.</li>
                <li><strong>Website Data:</strong> Information about your website when you use our analysis tools.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited and features used.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Provide and improve our marketing analysis and planning services</li>
                <li>Communicate with you about our services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground mb-6">
                We do not sell your personal information. We may share your information with service providers who assist us in operating our platform, and when required by law or to protect our rights.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-muted-foreground">
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

export default PrivacyPolicy;
