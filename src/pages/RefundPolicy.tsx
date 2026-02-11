import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Refund Policy
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Overview</h2>
              <p className="text-muted-foreground mb-6">
                At Brainito, we strive to ensure your complete satisfaction with our services. This Refund Policy outlines the terms and conditions for refunds on our various service offerings.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. DIY Marketing Plan Refunds</h2>
              <p className="text-muted-foreground mb-4">For our DIY Marketing Plan subscription:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>7-Day Money-Back Guarantee:</strong> If you're not satisfied within the first 7 days of your subscription, you may request a full refund.</li>
                <li><strong>After 7 Days:</strong> No refunds will be provided for the current billing period, but you may cancel to prevent future charges.</li>
                <li><strong>Annual Plans:</strong> Pro-rated refunds may be available for annual subscriptions canceled within the first 30 days.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. Hire a Marketer Refunds</h2>
              <p className="text-muted-foreground mb-4">For our Hire a Marketer service:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>First Month:</strong> If you're not satisfied within the first 14 days, you may request a pro-rated refund for unused time.</li>
                <li><strong>Ongoing Service:</strong> After the first 14 days, refunds are not available for the current billing period.</li>
                <li><strong>Cancellation:</strong> You may cancel with 30 days written notice. No refunds for partial months.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Free AI Plan</h2>
              <p className="text-muted-foreground mb-6">
                Our Free AI Plan is provided at no cost, and therefore no refunds apply.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. How to Request a Refund</h2>
              <p className="text-muted-foreground mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Email us at support@brainito.com with your account details</li>
                <li>Include the reason for your refund request</li>
                <li>Provide your order/subscription ID</li>
                <li>Our team will respond within 2-3 business days</li>
              </ol>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. Refund Processing</h2>
              <p className="text-muted-foreground mb-6">
                Approved refunds will be processed within 5-7 business days. Refunds will be credited to the original payment method. Please note that your bank may take additional time to reflect the refund in your account.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Non-Refundable Items</h2>
              <p className="text-muted-foreground mb-4">The following are not eligible for refunds:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Services that have been fully delivered</li>
                <li>Custom marketing strategies after initial delivery</li>
                <li>Third-party advertising spend or tools purchased on your behalf</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">8. Disputes</h2>
              <p className="text-muted-foreground mb-6">
                If you have a dispute regarding a refund decision, please contact our support team. We will review your case and work with you to find a fair resolution.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground">
                For refund inquiries, please contact:<br />
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

export default RefundPolicy;
