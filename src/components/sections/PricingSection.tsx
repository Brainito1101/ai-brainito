import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
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

const PricingSection = () => {
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
                "Website audit",
                "Basic strategy",
                "AI-powered insights",
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

                    "Full marketing strategy",
                    "Execution roadmap",
                    "30-day action plan",
                    "1 Hour Consultation",
                  ]
                  : isMarketer
                    ? [
                      "Dedicated marketer",
                      "Full execution",
                      "Weekly reporting",
                      "Strategy optimization",
                      "Priority support",
                    ]
                    : [
                      "Custom features",
                      "Dedicated support",
                    ],
                cta: "Subscribe Now",
                stripe_price_id: plan.stripe_price_id,
                variant: isMarketer ? "accent" : "gradient",
                popular: isMarketer,
              };
            }),
          ];

          setPlans(mappedPlans);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
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

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <section id="pricing" className="py-24 bg-gradient-to-b from-purple-medium via-purple-dark to-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Pricing
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A single monthly price with a friction-free working structure.
            </p>
          </div>

          {/* Pricing Cards */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-large ${plan.popular
                    ? "border-primary shadow-glow scale-105 md:scale-110"
                    : "border-border hover:border-primary/30"
                    }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg-cta rounded-full">
                      <span className="text-sm font-semibold text-primary-foreground">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
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
          )}
        </div>
      </section>
    </>
  );
};

export default PricingSection;
