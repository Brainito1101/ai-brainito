import { FileText, Users, Rocket, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const steps = [
  {
    icon: FileText,
    title: "Get Your DIY Marketing Plan",
    description: "AI audits your website and delivers a ready-to-execute 30-day strategy with actionable insights.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Hire a Marketer",
    description: "Work with a dedicated marketer who turns your strategy into measurable execution.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Rocket,
    title: "Build Your Growth Engine",
    description: "Scale ads, content, funnels, and reporting like a pro inside Brainito.",
    color: "bg-purple-medium/20 text-primary",
  },
];

const GrowthJourneySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle button click - redirect if logged in, show modal otherwise
  const handleStartJourney = () => {
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

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <section
        ref={sectionRef}
        className="pt-16 sm:pt-24 pb-20 sm:pb-28 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              How it works?
            </h2>
          </div>

          {/* Steps Grid with connectors */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
              {/* Dotted connector line - desktop only */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] border-t-2 border-dashed border-border/60" />

              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Icon box */}
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm relative z-10 bg-white`}>
                    <div className={`w-full h-full rounded-2xl ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className={`text-center mt-14 sm:mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button
              size="lg"
              className="group h-14 px-8 text-base"
              onClick={handleStartJourney}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default GrowthJourneySection;