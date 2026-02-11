import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, Heart, Zap, ArrowRight, Eye, Rocket } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const About = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Handle Get Started button click - redirect if logged in, show modal otherwise
  const handleGetStarted = () => {
    if (user) {
      // User is logged in, redirect to dashboard
      const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
      window.location.href = `${dashboardUrl}/dashboard`;
    } else {
      // User is not logged in, show auth modal
      setIsAuthModalOpen(true);
    }
  };

  // Handle successful auth
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // User is now logged in, redirect to dashboard
    const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
    window.location.href = `${dashboardUrl}/dashboard`;
  };

  const timelineEvents = [
    { year: "2015", title: "The First Startup and the Cost of Experimentation", description: "Straight out of college, our founder launched her first startup. The product was built, funding was raised, and early momentum looked promising. However, most of the budget was spent experimenting across marketing channels without real clarity on the market, users, or growth direction. The business model became clear too late. In 2018, the startup shut down not because the product lacked potential, but because marketing lacked direction.\n\nThis failure created a lasting conviction. Growth fails faster without clarity than without effort." },
    { year: "2018", title: "The Birth of Clarity", description: "Determined to prevent others from repeating the same mistake, she began helping founders gain clarity before spending money. This work evolved into what later became the DIY Marketing Plan, a structured approach to understanding market demand, users, competitors, and a clear path to growth." },
    { year: "2019–2023", title: "Building and Scaling the DIY Approach", description: "A small team formed around this idea. Between 2019 and 2023, we helped more than 1,800 businesses create clear, actionable marketing plans they could execute themselves without guesswork, channel hopping, or wasted budgets." },
    { year: "January 2024", title: "Value Bridge Analysis", description: "Years of learning were formalized into the Value Bridge Analysis, a timeless marketing framework connecting product value, user demand, market reality, and execution. The belief was simple: channels change, but the fundamentals of growth do not." },
    { year: "May 2024", title: "From Strategy to Execution", description: "A new pattern emerged. Many businesses returned not for strategy, but for execution. They struggled with freelancers who lacked ownership, agencies with poor communication, and in-house hiring that was too expensive or risky. To solve this, we launched the Remote Marketing Manager model, a full-time, dedicated marketing manager working from our office and acting like an internal team member. The result was consistent execution, clear accountability, and measurable growth." },
    { year: "2025", title: "Refinement and Maturity", description: "We continued refining both the Value Bridge framework and the Remote Marketing Manager service, strengthening how strategy is created and how execution is owned." },
    { year: "2026", title: "Productizing the Mission", description: "Our mission expanded. We launched our product to serve more founders globally helping them gain clarity, grow with direction, and stop wasting time, money, and effort.\n\nThe story continues, but the belief remains unchanged.\n\nMarketing works when there is clarity, ownership, and consistency." },
  ];

  const values = [
    {
      icon: Target,
      title: "Devotion",
      description: "We commit deeply to every business we work with. When we take ownership, we stay invested in outcomes, not just activities."
    },
    {
      icon: Lightbulb,
      title: "Honesty",
      description: "We believe growth starts with truth. We communicate clearly, set realistic expectations, and never sell false promises."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Everything we do is visible and explainable. From strategy to execution, clients always know what is happening and why."
    },
    {
      icon: Zap,
      title: "Problem Solving",
      description: "We focus on fixing real growth blockers, not chasing trends. Every decision is backed by research, data, and clear reasoning."
    },
    {
      icon: Zap,
      title: "Consistent Effort",
      description: "Growth is built through steady, daily execution. We value disciplined progress over short-term wins or experimentation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <main>
        {/* Hero Section - Asana-inspired */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Business Growth with clarity and ownership
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Where AI-driven insights meet human-led execution. Helping businesses grow through clarity and data.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our story started with a mistake that shaped everything we do today.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You want to grow your business. You're motivated by impact and purpose.
                And you want your marketing to make a difference. We want the same thing.
              </p>
            </div>

            {/* Modern Timeline */}
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Center vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-accent/40 to-primary/20" />

                <div className="space-y-16">
                  {timelineEvents.map((event, index) => (
                    <div key={event.year} className="relative">
                      {/* Year badge in center */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="relative">
                          <div className="px-4 py-3 min-w-[100px] rounded-full bg-gradient-to-br from-accent via-orange-400 to-accent flex items-center justify-center shadow-lg animate-pulse-slow transition-all duration-700 ease-out">
                            <div className="px-3 py-2 rounded-full bg-white flex items-center justify-center">
                              <span className={`font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-nowrap ${event.year.length > 6 ? 'text-xs' : 'text-sm'
                                }`}>
                                {event.year}
                              </span>
                            </div>
                          </div>
                          {/* Connector dots */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-accent/60 transition-all duration-500" />
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-accent/60 transition-all duration-500" />
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="pt-12">
                        <div className="bg-gradient-to-br from-purple-light/40 via-white to-purple-light/20 rounded-3xl p-8 border border-border/30 shadow-lg transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.02] hover:border-accent/30 group will-change-transform">
                          {/* Gradient accent bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-3xl transition-all duration-700" />

                          {/* Icon background */}
                          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

                          <div className="relative">
                            {/* Title with gradient */}
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pr-4 transition-all duration-500">
                              {event.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base transition-colors duration-500 group-hover:text-foreground/80">
                              {event.description}
                            </p>

                            {/* Decorative element */}
                            <div className="mt-6 flex items-center gap-2">
                              <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full transition-all duration-700 group-hover:w-16" />
                              <div className="h-1 w-8 bg-gradient-to-r from-primary/50 to-transparent rounded-full transition-all duration-700 group-hover:w-12" />
                              <div className="h-1 w-4 bg-gradient-to-r from-accent/30 to-transparent rounded-full transition-all duration-700 group-hover:w-8" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final decorative element */}
                <div className="relative mt-16 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-xl transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:rotate-12">
                    <Rocket className="w-8 h-8 text-white transition-transform duration-700 hover:translate-y-[-2px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-purple-light/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-border/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Mission */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 text-primary-foreground">
                <div className="w-16 h-16 rounded-2xl bg-background/20 flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-primary-foreground/90 text-lg leading-relaxed">
                  To create positive change by making marketing a meaningful part of the value creation chain, helping good products find clarity, direction, and consistent growth without waste.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-10 text-background">
                <div className="w-16 h-16 rounded-2xl bg-background/20 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-background/90 text-lg leading-relaxed">
                  To empower purpose-driven businesses globally by ensuring valuable products reach the right people and contribute to the world in a positive and sustainable way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-purple-medium via-purple-dark to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust Brainito for their marketing success.
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
