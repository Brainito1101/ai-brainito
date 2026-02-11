import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const FinalCTASection = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Handle Get Started button - redirect if logged in, show modal otherwise
  const handleGetStarted = () => {
    if (user) {
      // User is logged in, redirect to dashboard
      window.location.href = "https://app.brainito.com/dashboard";
    } else {
      // User is not logged in, show auth modal
      setIsAuthModalOpen(true);
    }
  };

  // Handle successful auth
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // User is now logged in, they can proceed
  };

  // Handle navigation to contact page
  const handleTalkToSales = () => {
    navigate("/contact");
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-medium via-purple-dark to-primary">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Unlock Your Growth Strategy?
            </h2>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto">
              Start with a free AI audit, upgrade anytime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-accent hover:bg-accent/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleGetStarted}
              >
                Get Started for FREE
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                onClick={handleTalkToSales}
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalCTASection;
