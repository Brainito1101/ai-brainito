import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  ArrowRight,
  FileText,
  Users,
  Target,
  Zap,
  ClipboardCheck,
  BarChart3,
  Globe,
  Search,
  Share2,
  Megaphone,
  Mail,
  Youtube,
  PieChart,
  Settings,
  Video,
  TrendingUp,
  Building2,
  UserCheck,
  Briefcase,
  Star,
  Sparkles
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const HireMarketer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    website: "",
    monthly_budget: "",
    challenge: "",
    other_challenge: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loadingCaseStudies, setLoadingCaseStudies] = useState(true);

  // Fetch case studies from API
  useEffect(() => {
    api.getCaseStudies()
      .then((data) => {
        // Limit to 6 case studies (or 3 if you prefer)
        setCaseStudies(data.slice(0, 6));
      })
      .catch((err) => {
        console.error("Error fetching case studies:", err);
      })
      .finally(() => setLoadingCaseStudies(false));
  }, []);

  const scrollToForm = () => {
    const heroSection = document.getElementById('hero-form');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
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

  // Handle Calendly link opening
  const handleBookStrategyCall = () => {
    window.open("https://calendly.com/brainito/growth-session", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      await api.hireMarketer(formData);
      setSubmitSuccess(true);

      // Track Google Ads conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17618812380/0Pg7CNOS5PMbENz7ptFB',
          'value': 1.0,
          'currency': 'USD'
        });
      }

      // Open Calendly link in new tab
      window.open("https://calendly.com/brainito/growth-session", "_blank");

      // Reset form
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        website: "",
        monthly_budget: "",
        challenge: "",
        other_challenge: "",
      });
      setSelectedChallenge("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: "Share Your Requirements",
      description: "Submit your business goals, current challenges, and expectations.",
      icon: FileText,
      iconColor: "text-accent"
    },
    {
      title: "Strategy & Role Mapping",
      description: "We define the exact responsibilities, skill set, KPIs, and execution priorities.",
      icon: Target,
      iconColor: "text-primary"
    },
    {
      title: "Manager Matching",
      description: "We assign a marketing manager aligned with your industry and channels.",
      icon: Users,
      iconColor: "text-accent"
    },
    {
      title: "Execution Begins",
      description: "Your manager starts execution with daily check-ins and full transparency.",
      icon: Zap,
      iconColor: "text-primary"
    },
    {
      title: "Monitoring & Reporting",
      description: "Daily updates, weekly reviews, and monthly strategy reports.",
      icon: BarChart3,
      iconColor: "text-accent"
    }
  ];

  const responsibilities = [
    {
      title: "Research & Growth Planning",
      icon: Search,
      items: ["Deep market research, competitor mapping, and go-to-market planning to define where to play, how to win, and what to prioritize for growth."]
    },
    {
      title: "Website & Landing Pages",
      icon: Globe,
      items: ["Planning, coordination, and continuous optimization of websites and landing pages to improve clarity, engagement, and conversions."]
    },
    {
      title: "Search Visibility (SEO)",
      icon: Share2,
      items: ["End-to-end SEO execution covering on-page, technical, and off-page foundations, along with optimization for answer engines and generative search platforms."]
    },
    {
      title: "Social Media Presence",
      icon: Megaphone,
      items: ["Platform-specific strategy and daily execution across Instagram, Facebook, X, TikTok, LinkedIn, YouTube, and Pinterest to drive reach, engagement, and growth."]
    },
    {
      title: "PR & Influencer Outreach",
      icon: Target,
      items: ["Planning and managing PR campaigns and influencer collaborations to build credibility, visibility, and brand trust in your market."]
    },
    {
      title: "Email & Funnel Automation",
      icon: Mail,
      items: ["Email campaigns and automated workflows designed to nurture leads, move prospects through funnels, and increase lifetime value."]
    },
    {
      title: "YouTube Growth Strategy",
      icon: Youtube,
      items: ["Channel positioning, content planning, and performance optimization to build consistent visibility and long-term audience growth."]
    },
    {
      title: "Analytics & Performance Tracking",
      icon: PieChart,
      items: ["Complete tracking setup using analytics tools, tag management, and conversion tracking to ensure every decision is data-backed."]
    },
    {
      title: "CRM & Sales Pipeline Management",
      icon: Settings,
      items: ["CRM setup, integrations, and workflow management to improve lead handling, qualification, and sales follow-through."]
    },
    {
      title: "Events, Webinars & Podcasts",
      icon: Video,
      items: ["End-to-end coordination of online events, webinars, and podcasts to support lead generation and brand authority."]
    },
    {
      title: "Reporting & Optimization",
      icon: TrendingUp,
      items: ["Clear performance reporting, funnel analysis, and cross-channel insights to continuously refine strategy and improve outcomes."]
    }
  ];

  const notIncluded = [
    "Photoshoots or videography",
    "Video editing or motion graphics",
    "Video ad production",
    "Printing or physical media production"
  ];

  const comparisonData = [
    {
      aspect: "Cost Structure",
      inHouse: { text: "High fixed cost (salary, benefits, infra)", isPositive: false },
      freelancer: { text: "Fragmented billing, hidden costs", isPositive: false },
      agency: { text: "High retainers with limited flexibility", isPositive: false },
      brainito: { text: "Predictable monthly fee, all-inclusive", isPositive: true }
    },
    {
      aspect: "Hiring & Onboarding",
      inHouse: { text: "Long hiring cycles (2-4 months)", isPositive: false },
      freelancer: { text: "Quick but unreliable", isPositive: false },
      agency: { text: "No hiring, but slow onboarding", isPositive: false },
      brainito: { text: "Fast matching, immediate execution", isPositive: true }
    },
    {
      aspect: "Focus & Dedication",
      inHouse: { text: "100% dedicated to your business", isPositive: true },
      freelancer: { text: "Split across multiple clients", isPositive: false },
      agency: { text: "Junior staff, divided attention", isPositive: false },
      brainito: { text: "100% dedicated to your business", isPositive: true }
    },
    {
      aspect: "Accountability",
      inHouse: { text: "Single point of failure", isPositive: false },
      freelancer: { text: "Low accountability", isPositive: false },
      agency: { text: "Multiple layers, slow feedback", isPositive: false },
      brainito: { text: "Single owner, backed by experts", isPositive: true }
    },
    {
      aspect: "Strategy Depth",
      inHouse: { text: "Limited multi-industry exposure", isPositive: false },
      freelancer: { text: "Execution-focused only", isPositive: false },
      agency: { text: "Template-driven strategies", isPositive: false },
      brainito: { text: "Proven frameworks across industries", isPositive: true }
    },
    {
      aspect: "Transparency",
      inHouse: { text: "Depends on internal reporting", isPositive: false },
      freelancer: { text: "Limited visibility", isPositive: false },
      agency: { text: "Monthly reports only", isPositive: false },
      brainito: { text: "Daily updates, full transparency", isPositive: true }
    },
    {
      aspect: "Scalability",
      inHouse: { text: "Rehiring required to scale", isPositive: false },
      freelancer: { text: "Hard to scale reliably", isPositive: false },
      agency: { text: "Expensive to add resources", isPositive: false },
      brainito: { text: "Scale without rehiring risk", isPositive: true }
    }
  ];

  const faqs = [
    {
      question: "What is Hire Marketer?",
      answer: "Hire Marketer is a full-time, trained marketing manager dedicated to your business, acting as an accountable growth owner without in-house hiring complexity."
    },
    {
      question: "Are you an agency or freelancers?",
      answer: "We are neither; you get a dedicated full-time marketing manager supported by our internal strategy, content, design, and execution team."
    },
    {
      question: "Where is your team based?",
      answer: "Our team is based in Ahmedabad, India (380059)."
    },
    {
      question: "How does it work?",
      answer: "You share requirements, we define the role, match a manager, start execution, and track progress transparently."
    },
    {
      question: "How long does hiring take?",
      answer: "Hiring typically takes 2–4 weeks depending on role complexity and requirements."
    },
    {
      question: "Can I meet the Marketing Manager before starting?",
      answer: "Yes, interviews are arranged so you can meet and approve the manager before onboarding."
    },
    {
      question: "How long does onboarding take?",
      answer: "Onboarding takes approximately 15 days after the marketing manager is finalized."
    }
  ];

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <div className="min-h-screen bg-background">
        <Header />

        {/* Section 1: Hero Section */}
        <section id="hero-form" className="relative pt-12 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 overflow-hidden bg-gradient-to-b from-white via-purple-light/50 to-purple-medium">
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-80 h-48 sm:h-80 bg-primary/15 rounded-full blur-[80px] sm:blur-[100px] animate-float" />
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-purple-medium/20 rounded-full blur-[80px] sm:blur-[100px] animate-float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/3 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-accent/10 rounded-full blur-[60px] sm:blur-[80px] animate-pulse-glow" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left: Content */}
                <div className="text-center lg:text-left order-1 lg:order-1">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 animate-fade-up leading-tight">
                    <span className="royal-gradient-text">Hire Marketing</span>
                    <br />
                    <span className="royal-gradient-text-delayed">Manager</span>
                  </h1>

                  <p className="text-lg sm:text-xl text-foreground font-medium max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-up delay-100 leading-relaxed">
                    Full-time, trained, high-performance marketing manager. <span className="text-primary font-semibold">One accountable owner</span> for your growth, without the complexity of hiring in-house.
                  </p>

                  {/* Trust indicators - Hidden on mobile */}
                  <div className="hidden lg:flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-fade-up delay-200">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Managed by experts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">Immediate execution</span>
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="relative animate-fade-up order-2 lg:order-2">
                  {/* Glow effect behind form */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-60" />

                  <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-6 sm:p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Request a Free Strategy Discussion</h3>
                    </div>


                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {submitSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                          <p className="font-semibold">Thank you for your request!</p>
                          <p className="text-sm">Our team will contact you shortly.</p>
                        </div>
                      )}

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                          <p className="text-sm">{submitError}</p>
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="fullName" className="text-xs font-medium">Full Name</Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            className="h-11 rounded-[10px] bg-background/50"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-xs font-medium">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="h-11 rounded-[10px] bg-background/50"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-medium">Business Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="h-11 rounded-[10px] bg-background/50"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="website" className="text-xs font-medium">Website / App URL</Label>
                        <Input
                          id="website"
                          type="text"
                          placeholder="https://yourcompany.com"
                          className="h-11 rounded-[10px] bg-background/50"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="budget" className="text-xs font-medium">Monthly Budget</Label>
                          <Select
                            value={formData.monthly_budget}
                            onValueChange={(value) => setFormData({ ...formData, monthly_budget: value })}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="h-11 rounded-[10px] bg-background/50">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-5k">Under $5,000</SelectItem>
                              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50k-plus">$50,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium">#1 Challenge</Label>
                          <Select
                            value={formData.challenge}
                            onValueChange={(value) => {
                              setFormData({ ...formData, challenge: value });
                              setSelectedChallenge(value);
                            }}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="h-11 rounded-[10px] bg-background/50">
                              <SelectValue placeholder="Select challenge" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="branding">Branding & Awareness</SelectItem>
                              <SelectItem value="traffic">Traffic Growth</SelectItem>
                              <SelectItem value="leads">Lead Generation</SelectItem>
                              <SelectItem value="conversions">Conversions & Sales</SelectItem>
                              <SelectItem value="funnel">Funnel Optimization</SelectItem>
                              <SelectItem value="ads">Scaling Paid Ads</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {selectedChallenge === "other" && (
                        <div className="space-y-1.5">
                          <Label htmlFor="otherChallenge" className="text-xs font-medium">Describe your challenge</Label>
                          <Input
                            id="otherChallenge"
                            placeholder="Describe your marketing challenge..."
                            className="h-11 rounded-[10px] bg-background/50"
                            value={formData.other_challenge}
                            onChange={(e) => setFormData({ ...formData, other_challenge: e.target.value })}
                            disabled={isSubmitting}
                          />
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="hero"
                        className="w-full h-12 text-base font-bold group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Request Strategy Discussion"}
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="py-20 sm:py-28 bg-white border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                How it works?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                A structured hiring and execution process designed for speed and accountability
              </p>
            </div>

            {/* Steps Row with Connecting Line */}
            <div className="relative max-w-6xl mx-auto">
              {/* Connecting dashed line - hidden on mobile */}
              <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-border/60" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    {/* Icon box */}
                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-purple-light/50 flex items-center justify-center mb-5 shadow-sm border border-border/20">
                      <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: What Your Dedicated Marketing Manager Can Do */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-purple-medium via-purple-dark to-primary border-t border-border/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                What Your Dedicated Marketing Manager Can Do
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Your manager owns planning, execution, tracking, and optimization across channels.
              </p>
            </div>

            {/* Responsibilities Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
              {responsibilities.map((resp, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-border/40 p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <resp.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{resp.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {resp.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Not Included */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">What Marketing Managers Do NOT Handle</h3>
                <p className="text-sm text-white/60 mb-4 text-center">To maintain execution quality and focus, the following are not included:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {notIncluded.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/70">
                      <X className="w-3 h-3 text-red-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 text-center mt-4">(These can be coordinated with external vendors if required.)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why Companies Choose This Model - Comparison Table */}
        <section className="py-20 sm:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Why Companies Choose <span className="gradient-text">This Model</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Traditional Hiring Models vs Brainito's Dedicated Manager
              </p>
            </div>

            {/* Comparison Table */}
            <div className="max-w-7xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-foreground bg-muted/50 rounded-tl-xl">Aspect</th>
                    <th className="p-4 text-left text-sm font-semibold text-foreground bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        In-House Manager
                      </div>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-foreground bg-muted/50">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                        Freelancer
                      </div>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-foreground bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        Traditional Agency
                      </div>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-white bg-primary rounded-tr-xl">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Brainito's Manager
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="p-4 text-sm font-medium text-foreground border-b border-border/50">{row.aspect}</td>
                      <td className="p-4 text-sm text-muted-foreground border-b border-border/50">
                        <div className="flex items-start gap-2">
                          {row.inHouse.isPositive ? (
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <span>{row.inHouse.text}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground border-b border-border/50">
                        <div className="flex items-start gap-2">
                          {row.freelancer.isPositive ? (
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <span>{row.freelancer.text}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground border-b border-border/50">
                        <div className="flex items-start gap-2">
                          {row.agency.isPositive ? (
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <span>{row.agency.text}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground border-b border-primary/20 bg-primary/5">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{row.brainito.text}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Case Studies */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Proven Results <span className="gradient-text">Across Industries</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each case study demonstrates structured execution, consistent tracking, and measurable outcomes.
              </p>
            </div>

            {/* Case Studies Grid */}
            {loadingCaseStudies && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Loading case studies...</p>
              </div>
            )}

            {!loadingCaseStudies && caseStudies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No case studies available at the moment.</p>
              </div>
            )}

            {!loadingCaseStudies && caseStudies.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {caseStudies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-studies/${study.slug}`}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group block"
                  >
                    {/* Case Study Image/Banner */}
                    <div className="h-40 bg-gradient-to-br from-purple-100/80 to-orange-50/60 flex items-center justify-center overflow-hidden">
                      {study.thumbnail_url ? (
                        <img
                          src={study.thumbnail_url}
                          alt={study.project_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xl font-bold text-primary/60 group-hover:text-primary transition-colors">
                          {study.project_name}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Project Name */}
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {study.project_name}
                      </h3>

                      {/* Impact - 2 lines */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {study.impact}
                      </p>

                      {/* Key Results */}
                      <div className="flex flex-wrap gap-2">
                        {study.key_results.slice(0, 3).map((result: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* View All FAQs Button */}
          <div className="mt-8 text-center">
            <a
              href="/case-studies"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View all Case Studies
            </a>
          </div>
        </section>

        {/* Section 6: Pricing */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-purple-medium via-purple-dark to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                Pricing
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                A single monthly price with a friction-free working structure.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Dedicated Marketing Manager */}
              <div className="bg-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-bl-xl">
                  Most Popular
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">Dedicated Marketing Manager</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-primary">$2,999</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-sm font-semibold text-foreground">What's Included:</p>
                  {[
                    "Full-time marketing manager (40+ hours/week)",
                    "Office infrastructure (Laptop, High-speed internet, Workspace)",
                    "Tea, coffee, lunch, and dinner provided",
                    "Strategy planning and expert oversight",
                    "Access to premium marketing and analytics tools",
                    "Continuous monitoring and optimization",
                    "Daily execution updates",
                    "Weekly performance reviews",
                    "Monthly strategy and performance reports"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="xl"
                  className="w-full bg-gradient-to-r from-accent via-orange-500 to-accent hover:opacity-90 text-accent-foreground font-bold rounded-[10px]"
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Hire a Marketing Team */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-border/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Hire a Marketing Team</h3>
                    <p className="text-muted-foreground text-xs">For businesses requiring multiple specialists</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-primary">Custom</span>
                  <span className="text-muted-foreground">/ based on scope</span>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Custom team setup based on your goals",
                    "Combination of manager + channel specialists",
                    "Pricing based on scope and execution intensity",
                    "Dedicated account management",
                    "Cross-functional expertise"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-6 border-t border-border/40 pt-4">
                  Discuss requirements with our strategy team to design the right structure.
                </p>

                <Button
                  size="xl"
                  variant="outline"
                  className="w-full rounded-[10px] border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                  onClick={handleTalkToSales}
                >
                  Talk to Sales
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: FAQs */}
        <section className="py-20 sm:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about hiring a marketing manager
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/50 data-[state=open]:shadow-soft transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
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

        {/* Section 8: Bottom Form Section */}
        <section className="py-20 sm:py-32 relative overflow-hidden bg-gradient-to-b from-white via-purple-light/30 to-white">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  <span className="gradient-text">Let's Grow Your Business</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Share your details and we'll schedule a free strategy discussion to explore how we can help.
                </p>
              </div>

              {/* Form Card */}
              <div className="relative">
                {/* Subtle shadow/glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-lg opacity-30" />

                <div className="relative bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                  {/* Accent bar on top */}
                  <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

                  <div className="p-8 sm:p-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {submitSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                          <p className="font-semibold">🎉 Thank you for your request!</p>
                          <p className="text-sm">Our team will contact you shortly.</p>
                        </div>
                      )}

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                          <p className="text-sm">{submitError}</p>
                        </div>
                      )}

                      {/* Row 1: Name and Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="bottomFullName" className="text-sm font-semibold text-foreground">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="bottomFullName"
                            placeholder="John Doe"
                            className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bottomPhone" className="text-sm font-semibold text-foreground">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="bottomPhone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      {/* Row 2: Email and Website */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="bottomEmail" className="text-sm font-semibold text-foreground">
                            Business Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="bottomEmail"
                            type="email"
                            placeholder="john@company.com"
                            className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bottomWebsite" className="text-sm font-semibold text-foreground">
                            Website / App URL
                          </Label>
                          <Input
                            id="bottomWebsite"
                            type="text"
                            placeholder="https://yourcompany.com"
                            className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      {/* Row 3: Budget and Challenge */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="bottomBudget" className="text-sm font-semibold text-foreground">
                            Monthly Budget
                          </Label>
                          <Select
                            value={formData.monthly_budget}
                            onValueChange={(value) => setFormData({ ...formData, monthly_budget: value })}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-5k">Under $5,000</SelectItem>
                              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50k-plus">$50,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-foreground">
                            Your #1 Challenge
                          </Label>
                          <Select
                            value={formData.challenge}
                            onValueChange={(value) => {
                              setFormData({ ...formData, challenge: value });
                              setSelectedChallenge(value);
                            }}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select your main challenge" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="branding">Branding & Awareness</SelectItem>
                              <SelectItem value="traffic">Traffic Growth</SelectItem>
                              <SelectItem value="leads">Lead Generation</SelectItem>
                              <SelectItem value="conversions">Conversions & Sales</SelectItem>
                              <SelectItem value="funnel">Funnel Optimization</SelectItem>
                              <SelectItem value="ads">Scaling Paid Ads</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Conditional: Other Challenge */}
                      {selectedChallenge === "other" && (
                        <div className="space-y-2">
                          <Label htmlFor="bottomOtherChallenge" className="text-sm font-semibold text-foreground">
                            Describe Your Challenge
                          </Label>
                          <Input
                            id="bottomOtherChallenge"
                            placeholder="Tell us more about your marketing challenge..."
                            className="h-12 rounded-xl border-border/80 focus:border-primary transition-colors"
                            value={formData.other_challenge}
                            onChange={(e) => setFormData({ ...formData, other_challenge: e.target.value })}
                            disabled={isSubmitting}
                          />
                        </div>
                      )}

                      {/* Divider */}
                      <div className="border-t border-border/50 pt-6">
                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="xl"
                          variant="hero"
                          className="w-full h-14 text-lg font-bold group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Request Free Strategy Discussion
                              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HireMarketer;
