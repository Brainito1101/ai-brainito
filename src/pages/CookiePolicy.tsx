import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Data & Cookie Policy
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground mb-6">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve user experience.</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Essential Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling out forms.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Analytics Cookies</h3>
              <p className="text-muted-foreground mb-4">
                We use analytics tools like Google Analytics to understand how visitors use our site. These cookies collect information in an anonymous form.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Marketing Cookies</h3>
              <p className="text-muted-foreground mb-6">
                These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant ads on other sites.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-6">
                We may use third-party services that place cookies on your device. These include analytics providers, advertising networks, and social media platforms. These third parties have their own privacy policies.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">You can control and manage cookies in several ways:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through settings.</li>
                <li><strong>Opt-Out Tools:</strong> Use industry opt-out tools to decline tracking cookies.</li>
                <li><strong>Our Cookie Settings:</strong> Use our cookie consent banner to manage your preferences.</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                Note: Disabling certain cookies may affect the functionality of our website.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground mb-6">
                We retain cookie data for varying periods depending on the type of cookie. Session cookies are deleted when you close your browser. Persistent cookies remain until they expire or you delete them.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Updates to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please contact us at:<br />
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

export default CookiePolicy;
