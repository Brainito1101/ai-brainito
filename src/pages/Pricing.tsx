import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "https://app.brainito.com/api";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  stripe_price_id?: string;
  variant: "outline" | "gradient" | "accent";
  popular: boolean;
}

const faqs = [
  {
    question: "How is billing handled?",
    answer: "Billing is done monthly on a subscription basis. All paid plans are recurring subscriptions.",
  },
  {
    question: "When will I be charged?",
    answer: "You are charged at the start of each billing cycle for all paid plans.",
  },
  {
    question: "Are there any long-term contracts?",
    answer: "No, subscription plans are month-to-month and can be canceled anytime.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, plans can be changed at any time. Changes take effect at the start of the next billing cycle.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No separate setup fee for any plan.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards and debit cards through Stripe.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Refunds are handled on a case-by-case basis. Please contact support for assistance.",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${API_URL}/payments/plans/`);
        const data = await response.json();

        if (data.success && data.plans) {
          // Map backend plans to frontend format
          const mappedPlans: Plan[] = [
            {
              name: "Free AI Plan",
              price: "$0",
              period: "",
              description: "Perfect for exploring Brainito",
              features: [
                "1 Free AI Marketing Report",
                "Basic strategy insights",
                "AI-powered recommendations",
                "Limited access to features",
              ],
              cta: "Start Free",
              variant: "outline",
              popular: false,
            },
            ...data.plans.map((plan: any) => {
              const isDIY = plan.name.includes("DIY");
              const isMarketer = plan.name.includes("Marketer");

              return {
                name: plan.name,
                price: `$${plan.price_monthly}`,
                period: "/month",
                description: isDIY
                  ? "For teams ready to execute"
                  : isMarketer
                    ? "Done-for-you marketing"
                    : "Custom solution",
                features: isDIY
                  ? [
                    "1 AI Marketing Report",
                    "Full marketing strategy",
                    "Competitor analysis",
                    "Budget ROI analysis",
                    "Execution roadmap",
                    "30-day action plan",
                  ]
                  : isMarketer
                    ? [
                      "Unlimited AI Reports",
                      "Dedicated marketing manager",
                      "Full execution & management",
                      "Weekly reporting & insights",
                      "Strategy optimization",
                      "Priority support",
                    ]
                    : [
                      "Custom features",
                      "Dedicated support",
                    ],
                cta: isDIY ? "Subscribe Now" : isMarketer ? "Subscribe Now" : "Get Started",
                stripe_price_id: plan.stripe_price_id,
                variant: isMarketer ? "accent" : "gradient",
                popular: isMarketer,
              };
            }),
            {
              name: "Hire a Team",
              price: "Custom",
              period: "",
              description: "Enterprise marketing team",
              features: [
                "Full marketing team",
                "Multiple specialists",
                "Custom strategy & execution",
                "Dedicated account manager",
                "Priority support",
                "Custom integrations",
              ],
              cta: "Contact Sales",
              variant: "outline",
              popular: false,
            },
          ];

          setPlans(mappedPlans);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Error",
          description: "Failed to load pricing plans. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle plan selection
  const handlePlanClick = async (plan: Plan) => {
    // Free plan - just show auth modal or redirect to dashboard
    if (plan.name === "Free AI Plan") {
      if (user) {
        window.location.href = "https://app.brainito.com/dashboard";
      } else {
        setIsAuthModalOpen(true);
      }
      return;
    }

    // Custom/Contact plans
    if (plan.name === "Hire a Team") {
      navigate("/contact");
      return;
    }

    // Paid plans - require authentication
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    // User is authenticated, proceed with Stripe checkout
    if (plan.stripe_price_id) {
      setProcessingPlan(plan.name);
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(`${API_URL}/payments/create-checkout-session/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            price_id: plan.stripe_price_id,
          }),
        });

        const data = await response.json();

        if (data.checkout_url) {
          // Redirect to Stripe checkout
          window.location.href = data.checkout_url;
        } else {
          throw new Error(data.error || "Failed to create checkout session");
        }
      } catch (error: any) {
        console.error("Checkout error:", error);
        toast({
          title: "Payment Error",
          description: error.message || "Failed to start checkout. Please try again.",
          variant: "destructive",
        });
      } finally {
        setProcessingPlan(null);
      }
    }
  };

  // Handle successful auth
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    window.location.href = "https://app.brainito.com/dashboard";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

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
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                Pricing
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Choose the perfect plan for your marketing needs. Start free or scale with our premium options.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-24 bg-gradient-to-b from-purple-medium via-purple-dark to-primary relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-card rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-large ${plan.popular
                    ? "border-accent shadow-glow scale-105"
                    : "border-border hover:border-primary/30"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg-cta rounded-full">
                      <span className="text-sm font-semibold text-primary-foreground">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full"
                    onClick={() => handlePlanClick(plan)}
                    disabled={processingPlan === plan.name}
                  >
                    {processingPlan === plan.name ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about our pricing and plans.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-purple-light/30 rounded-xl border border-border/20 px-6"
                  >
                    <AccordionTrigger className="text-foreground hover:text-primary text-left py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          {/* View All FAQs Button */}
          <div className="mt-8 text-center">
            <a
              href="https://help.brainito.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View all FAQs
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-purple-medium via-purple-dark to-primary relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                Ready to Transform Your Marketing?
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                Join thousands of businesses already growing with Brainito.
                Start free today and see the difference AI-powered marketing can make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="gradient"
                  size="xl"
                  className="group"
                  onClick={() => {
                    if (user) {
                      window.location.href = "https://app.brainito.com/dashboard";
                    } else {
                      setIsAuthModalOpen(true);
                    }
                  }}
                >
                  Get Started for FREE
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate("/contact")}
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
