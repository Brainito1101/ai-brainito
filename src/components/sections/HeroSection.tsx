import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

import { ReportGenerationLoader } from "@/components/ReportGenerationLoader";

// Domain validation regex
const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

// Extract clean domain from input
const extractDomain = (input: string): string => {
  try {
    let cleaned = input.trim().toLowerCase();
    cleaned = cleaned.replace(/^https?:\/\//, ""); // remove http(s)://
    cleaned = cleaned.replace(/^www\./, "");       // remove www.
    cleaned = cleaned.split("/")[0];               // remove path
    cleaned = cleaned.split("?")[0];               // remove query
    return cleaned;
  } catch {
    return "";
  }
};


// Validate domain
const isValidDomain = (domain: string): boolean => {
  return domainRegex.test(domain);
};

const HeroSection = () => {
  const { user, logout } = useAuth();
  const [count, setCount] = useState(1758);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all previous errors
    setErrorMessage("");
    setWebsiteError("");
    setEmailError("");

    const domain = extractDomain(websiteUrl);

    if (!isValidDomain(domain)) {
      setErrorMessage("Please enter a valid domain (e.g., example.com)");
      return;
    }

    setLoading(true);
    const cleanedURL = `https://${domain}`;

    // API base URL - use environment variable or fallback
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app.brainito.com/api";
    // Dashboard URL - use environment variable or fallback
    const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";

    try {
      // GUEST MODE: Generate report without login
      // If user is logged in, use authenticated endpoint; otherwise use guest endpoint
      const endpoint = user
        ? `${API_BASE_URL}/analyze/`
        : `${API_BASE_URL}/analyze-guest/`;

      const accessToken = user ? localStorage.getItem("access_token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          website: cleanedURL,
          email: email.trim(),
          source: user ? "From Website" : "From Website (Guest)",
        }),
      });

      const data = await res.json();

      // Handle 401 Unauthorized (token expired) - only relevant for logged-in users
      if (res.status === 401 && user) {
        logout();
        setIsAuthModalOpen(true);
        setErrorMessage("Your session expired. Please login again.");
        return;
      }

      // Handle validation errors from backend
      if (!res.ok) {
        if (data.error === "validation_failed" && data.errors) {
          // Set field-specific errors
          if (data.errors.website) {
            setWebsiteError(data.errors.website);
          }
          if (data.errors.email) {
            setEmailError(data.errors.email);
          }
          if (data.errors.general) {
            setErrorMessage(data.errors.general);
          }

          // If no specific field errors, show general message
          if (!data.errors.website && !data.errors.email && !data.errors.general) {
            setErrorMessage(data.message || "Please check your input and try again");
          }
        } else {
          // Handle other types of errors
          setErrorMessage(data.message || "Something went wrong. Please try again.");
        }
        return;
      }

      if (data.result || data.success) {
        // Redirect to the dashboard with analysis_id
        // Add guest=true parameter if not logged in
        const guestParam = user ? "" : "&guest=true";
        window.location.href = `${DASHBOARD_URL}/dashboard?analysis_id=${data.analysis_id}${guestParam}`;
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle successful auth
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // User will be logged in, they can now submit the form
  };

  // Handle login button click - redirect if already logged in
  const handleLoginClick = () => {
    if (user) {
      // User is already logged in, redirect to dashboard
      const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
      window.location.href = `${DASHBOARD_URL}/dashboard`;
    } else {
      // User is not logged in, show auth modal
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <section className="relative flex flex-col pt-40 sm:pt-52 pb-48 sm:pb-64 px-4 overflow-visible bg-gradient-to-b from-white via-purple-light to-purple-dark">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-80 h-48 sm:h-80 bg-primary/15 rounded-full blur-[80px] sm:blur-[100px] animate-float" />
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-purple-medium/20 rounded-full blur-[80px] sm:blur-[100px] animate-float delay-500" />
          <div className="absolute top-1/3 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-primary/10 rounded-full blur-[60px] sm:blur-[80px] animate-pulse-glow" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trusted counter */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-5 bg-gradient-to-br from-accent via-accent to-orange-300/40 backdrop-blur-sm rounded-full animate-fade-up">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Trusted by <span className="tabular-nums">{count.toLocaleString()}</span> Businesses
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-5 animate-fade-up leading-tight">
              <span className="royal-gradient-text">Marketing Audit Report</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-foreground font-semibold max-w-2xl mx-auto mb-6 sm:mb-8 animate-fade-up delay-100 leading-relaxed">
              Data-driven website insights and audit backed by 10+ years of research.
            </p>

            {/* Opt-in Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-up delay-200 max-w-2xl mx-auto"
            >
              <div className="w-full sm:flex-1">
                <input
                  type="text"
                  placeholder="Enter your website"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value);
                    setWebsiteError("");
                    setErrorMessage("");
                  }}
                  className="h-12 sm:h-14 w-full px-5 rounded-[10px] bg-white border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                  required
                  disabled={loading}
                />
                {websiteError && (
                  <p className="text-red-500 text-xs mt-1 text-left">{websiteError}</p>
                )}
              </div>
              <div className="w-full sm:flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    setErrorMessage("");
                  }}
                  className="h-12 sm:h-14 w-full px-5 rounded-[10px] bg-white border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                  required
                  disabled={loading}
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1 text-left">{emailError}</p>
                )}
              </div>
              <Button
                type="submit"
                variant="hero"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base group w-full sm:w-auto"
                disabled={loading}
              >
                <span className="flex items-center justify-center font-bold">

                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />

                </span>
              </Button>
            </form>
            {/* Full Screen Loader */}
            {loading && <ReportGenerationLoader />}

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm max-w-2xl mx-auto">
                {errorMessage}
              </div>
            )}

            {/* Login link */}
            <p className="text-sm text-muted-foreground mt-6 animate-fade-up delay-300">
              <button
                type="button"
                onClick={handleLoginClick}
                className="text-primary hover:text-accent font-semibold transition-colors"
              >
                Login
              </button> if account already exists
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - Half in hero, half in white section */}
      <div className="relative z-20 -mt-32 sm:-mt-48 animate-fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Dashboard with shadow */}
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dvu1dtynf/image/upload/v1770822039/web_1_2_nepslq.webp"
                alt="Brainito Marketing Dashboard showing AI Trust Score, traffic analytics, and competitor insights"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
