import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    ArrowRight,
    Heart,
    Loader2,
    TrendingUp,
    Target,
    Users,
    Zap,
    Shield,
    BarChart,
    MessageSquare,
    Clock,
    CheckCircle2,
    Star,
    Sparkles,
    Globe,
    Rocket,
    Eye,
    Award,
    Check,
    Upload,
    Search,
    Settings,
    ChevronRight,
    Quote,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HomepageDemo = () => {
    const { user } = useAuth();
    const [count, setCount] = useState(1758);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => Math.min(prev + 1, 2100));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % 4);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthModalOpen(false);
    };

    const handleGetStarted = () => {
        if (user) {
            const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
            window.location.href = `${DASHBOARD_URL}/dashboard`;
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <>
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onAuthSuccess={handleAuthSuccess}
            />

            <div className="min-h-screen bg-white">
                <Header />

                <main>
                    {/* Hero Section */}
                    <section className="relative flex flex-col pt-24 sm:pt-32 pb-32 sm:pb-48 px-4 overflow-hidden bg-[#FAFBFC]">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {/* Large circles */}
                            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border-4 border-purple-200 opacity-50" />
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border-4 border-orange-200 opacity-50" />

                            {/* Gradient blobs */}
                            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-200 opacity-40 blur-3xl animate-pulse-slow" />
                            <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-orange-200 opacity-40 blur-3xl" />

                            {/* Grid pattern */}
                            <div className="absolute top-1/4 right-20 grid grid-cols-6 gap-4 opacity-30">
                                {[...Array(24)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                ))}
                            </div>

                            {/* Diagonal lines */}
                            <div className="absolute top-1/3 left-1/4 w-32 h-0.5 bg-purple-300 opacity-40 rotate-45" />
                            <div className="absolute bottom-1/3 right-1/4 w-40 h-0.5 bg-orange-300 opacity-40 -rotate-45" />

                            {/* Small accent circles */}
                            <div className="absolute top-1/2 left-32 w-24 h-24 rounded-full bg-purple-300 opacity-30" />
                            <div className="absolute top-2/3 right-48 w-16 h-16 rounded-full bg-orange-300 opacity-30" />

                            {/* Squares */}
                            <div className="absolute bottom-1/4 left-64 w-12 h-12 border-2 border-purple-300 opacity-40 rotate-12" />
                            <div className="absolute top-1/4 right-80 w-8 h-8 border-2 border-orange-300 opacity-40 -rotate-12" />
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="max-w-5xl mx-auto text-center">
                                {/* Trusted counter */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-gray-200 rounded-full shadow-sm animate-fade-up">
                                    <Heart className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
                                    <span className="text-sm font-semibold text-gray-900">
                                        Trusted by <span className="tabular-nums font-bold text-[#7C3AED]">{count.toLocaleString()}</span>+ Businesses
                                    </span>
                                </div>

                                {/* Headline */}
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6 animate-fade-up leading-[1.1] text-gray-900">
                                    Unlock Your{" "}
                                    <span className="text-[#7C3AED]">Brand's Potential</span>{" "}
                                    with AI and{" "}
                                    <span className="text-[#F97316]">Data-Driven</span>{" "}
                                    Insights
                                </h1>

                                {/* Subtitle */}
                                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto mb-10 animate-fade-up delay-100 leading-relaxed">
                                    Transform your marketing strategy with{" "}
                                    <span className="text-gray-900 font-semibold">AI-powered insights</span>,{" "}
                                    <span className="text-gray-900 font-semibold">real-time analytics</span>, and{" "}
                                    <span className="text-gray-900 font-semibold">actionable recommendations</span>{" "}
                                    tailored to your business.
                                </p>

                                {/* Input Form */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-3xl mx-auto animate-fade-up delay-200 w-full">
                                    <div className="relative w-full md:w-1/3 group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-[#7C3AED] transition-colors" />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="Enter your website URL"
                                            className="block w-full pl-10 pr-3 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all duration-300 bg-white"
                                        />
                                    </div>
                                    <div className="relative w-full md:w-1/3 group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-[#F97316] transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="block w-full pl-10 pr-3 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/10 transition-all duration-300 bg-white"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleGetStarted}
                                        size="lg"
                                        className="w-full md:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] h-[58px] px-8 text-lg font-bold text-white group shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 rounded-xl whitespace-nowrap"
                                    >
                                        Get Started
                                        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </div>

                                {/* Trust indicators */}
                                <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-up delay-300">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span className="text-sm text-gray-600">No credit card required</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span className="text-sm text-gray-600">Free forever plan</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span className="text-sm text-gray-600">Cancel anytime</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trusted By Logos Section */}
                    <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
                                Trusted by innovative teams worldwide
                            </p>
                            <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
                                <div className="flex gap-12 sm:gap-20 items-center w-max animate-scroll hover:[animation-play-state:paused]">
                                    {/* Duplicated for seamless loop */}
                                    {[...Array(2)].map((_, groupIndex) => (
                                        <div key={groupIndex} className="flex gap-12 sm:gap-20 items-center shrink-0">
                                            {[
                                                { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
                                                { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                                                { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
                                                { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
                                                { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
                                                { name: "Adobe", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Corporate_Horizontal_Red_HEX.svg" },
                                                { name: "Zoom", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" },
                                                { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
                                                { name: "HubSpot", url: "https://upload.wikimedia.org/wikipedia/commons/1/11/HubSpot_Logo.svg" },
                                                { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
                                            ].map((logo, index) => (
                                                <img
                                                    key={index}
                                                    src={logo.url}
                                                    alt={logo.name}
                                                    className="h-6 sm:h-8 md:h-9 w-auto opacity-90 hover:opacity-100 transition-all duration-300 object-contain"
                                                    loading="lazy"
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                                <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-2 border-purple-100 opacity-60" />
                            <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-orange-100 opacity-50" />

                            {/* Crosses pattern */}
                            <div className="absolute top-1/3 left-20 opacity-30">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-4 h-0.5 bg-purple-300 mb-6 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-purple-300" />
                                    </div>
                                ))}
                            </div>

                            {/* Ring pattern */}
                            <div className="absolute bottom-1/4 right-24">
                                <div className="w-16 h-16 rounded-full border-2 border-orange-200 opacity-40" />
                                <div className="w-24 h-24 rounded-full border-2 border-orange-200 opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
                                    <span className="text-[#7C3AED]">Features</span> Built for Growth
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Everything you need to scale your marketing efforts and drive real business results
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {[
                                    {
                                        icon: TrendingUp,
                                        title: "Real-Time Analytics",
                                        description: "Get instant insights into your marketing performance with live data and AI-powered recommendations",
                                        color: "text-[#7C3AED]",
                                        bgColor: "bg-purple-50",
                                    },
                                    {
                                        icon: Target,
                                        title: "Precision Targeting",
                                        description: "Reach the right audience at the right time with our advanced targeting algorithms",
                                        color: "text-[#F97316]",
                                        bgColor: "bg-orange-50",
                                    },
                                    {
                                        icon: Users,
                                        title: "Audience Insights",
                                        description: "Understand your customers deeply with comprehensive demographic and psychographic data",
                                        color: "text-blue-600",
                                        bgColor: "bg-blue-50",
                                    },
                                    {
                                        icon: Zap,
                                        title: "Automated Workflows",
                                        description: "Save time with intelligent automation that handles repetitive tasks seamlessly",
                                        color: "text-yellow-600",
                                        bgColor: "bg-yellow-50",
                                    },
                                    {
                                        icon: Shield,
                                        title: "Brand Protection",
                                        description: "Monitor and protect your brand reputation across all digital channels",
                                        color: "text-green-600",
                                        bgColor: "bg-green-50",
                                    },
                                    {
                                        icon: BarChart,
                                        title: "Performance Tracking",
                                        description: "Track KPIs and ROI with beautiful, easy-to-understand dashboards",
                                        color: "text-purple-600",
                                        bgColor: "bg-purple-50",
                                    },
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#7C3AED] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="py-24 bg-[#FAFBFC] relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 left-0 w-80 h-80 rounded-full bg-purple-100 opacity-50 blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-100 opacity-50 blur-3xl" />

                            {/* Diagonal stripes */}
                            <div className="absolute top-20 right-40 space-y-4 opacity-30 rotate-12">
                                <div className="w-24 h-1 bg-purple-300" />
                                <div className="w-32 h-1 bg-purple-300" />
                                <div className="w-20 h-1 bg-purple-300" />
                            </div>

                            {/* Circle grid */}
                            <div className="absolute bottom-20 left-20 grid grid-cols-3 gap-6 opacity-40">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 rounded-full border-2 border-orange-300" />
                                ))}
                            </div>

                            {/* Large square outline */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-200 opacity-20 rotate-45" />
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
                                    How <span className="text-[#7C3AED]">It Works</span>
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Get started in minutes with our simple 4-step process
                                </p>
                            </div>

                            <div className="max-w-5xl mx-auto">
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        {
                                            number: "01",
                                            icon: Upload,
                                            title: "Sign Up",
                                            description: "Create your free account in seconds. No credit card required.",
                                            color: "bg-[#7C3AED]",
                                        },
                                        {
                                            number: "02",
                                            icon: Search,
                                            title: "Connect Data",
                                            description: "Link your website and connect your data sources seamlessly.",
                                            color: "bg-[#F97316]",
                                        },
                                        {
                                            number: "03",
                                            icon: Settings,
                                            title: "Get Insights",
                                            description: "Our AI analyzes your data and provides actionable insights.",
                                            color: "bg-blue-600",
                                        },
                                        {
                                            number: "04",
                                            icon: Rocket,
                                            title: "Grow Faster",
                                            description: "Implement recommendations and watch your business grow.",
                                            color: "bg-green-600",
                                        },
                                    ].map((step, index) => (
                                        <div key={index} className="relative group">
                                            {/* Connector line */}
                                            {index < 3 && (
                                                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                                            )}

                                            <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#7C3AED] transition-all duration-300 hover:shadow-xl h-full">
                                                {/* Number badge */}
                                                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                                                    <span className="text-white font-bold text-sm">{step.number}</span>
                                                </div>

                                                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                                    <step.icon className="w-7 h-7 text-white" />
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mt-12">
                                    <Button
                                        onClick={handleGetStarted}
                                        size="lg"
                                        className="bg-[#7C3AED] hover:bg-[#6D28D9] h-12 px-8 text-base font-bold text-white group shadow-lg shadow-purple-500/20"
                                    >
                                        Start Your Journey
                                        <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Influencer Connect Section */}
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-purple-100 opacity-40 blur-2xl" />
                            <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-orange-100 opacity-40 blur-2xl" />
                            <div className="absolute top-1/2 right-32 w-20 h-20 border-4 border-purple-200 opacity-50 rounded-full" />
                            <div className="absolute bottom-1/3 left-40 grid grid-cols-4 gap-3 opacity-30">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-orange-400" />
                                ))}
                            </div>
                        </div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-6xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-50 rounded-full border border-orange-200">
                                            <Sparkles className="w-4 h-4 text-[#F97316]" />
                                            <span className="text-sm font-semibold text-gray-900">Influencer Marketing</span>
                                        </div>
                                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                                            <span className="text-[#7C3AED]">Connect</span> with Influencers{" "}
                                            <span className="text-[#F97316]">At Once</span>
                                        </h2>
                                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                            Find, connect, and collaborate with the perfect influencers for your brand. Our AI-powered matching system ensures you work with creators who align with your values and audience.
                                        </p>
                                        <ul className="space-y-4 mb-8">
                                            {[
                                                "AI-powered influencer matching",
                                                "Real-time campaign tracking",
                                                "ROI analytics and reporting",
                                                "Automated outreach and follow-ups",
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-gray-900 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            onClick={handleGetStarted}
                                            size="lg"
                                            className="bg-[#7C3AED] hover:bg-[#6D28D9] h-12 px-6 text-base font-bold text-white group shadow-lg shadow-purple-500/20"
                                        >
                                            Find Influencers
                                            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                    <div className="relative">
                                        <div className="aspect-square rounded-2xl bg-purple-50 flex items-center justify-center border-2 border-purple-100">
                                            <MessageSquare className="w-32 h-32 text-purple-200" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* All-in-One Management Section */}
                    <section className="py-24 bg-[#FAFBFC] relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-orange-100 opacity-50 blur-3xl" />
                            <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-purple-100 opacity-50 blur-3xl" />
                            <div className="absolute top-1/4 right-20 w-16 h-16 border-2 border-orange-200 opacity-50 rotate-45" />
                            <div className="absolute bottom-1/4 left-32 space-y-3 opacity-40">
                                <div className="w-16 h-0.5 bg-purple-300" />
                                <div className="w-20 h-0.5 bg-purple-300" />
                                <div className="w-12 h-0.5 bg-purple-300" />
                            </div>
                        </div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-6xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <div className="order-2 lg:order-1">
                                        <div className="aspect-square rounded-2xl bg-blue-50 flex items-center justify-center border-2 border-blue-100">
                                            <Globe className="w-32 h-32 text-blue-200" />
                                        </div>
                                    </div>
                                    <div className="order-1 lg:order-2">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-50 rounded-full border border-purple-200">
                                            <Clock className="w-4 h-4 text-[#7C3AED]" />
                                            <span className="text-sm font-semibold text-gray-900">All-in-One Platform</span>
                                        </div>
                                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                                            <span className="text-[#7C3AED]">Manage Everything</span> in One Place
                                        </h2>
                                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                            From content creation to analytics, manage all your marketing activities from a single, intuitive dashboard. No more jumping between tools.
                                        </p>
                                        <div className="grid grid-cols-2 gap-6 mb-8">
                                            {[
                                                { icon: Rocket, title: "Campaign Management" },
                                                { icon: BarChart, title: "Analytics Dashboard" },
                                                { icon: Users, title: "Team Collaboration" },
                                                { icon: Shield, title: "Brand Protection" },
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-1">
                                                        <item.icon className="w-5 h-5 text-[#7C3AED]" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            onClick={handleGetStarted}
                                            variant="outline"
                                            size="lg"
                                            className="h-12 px-6 text-base font-semibold border-2 border-gray-300 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-purple-50"
                                        >
                                            Learn More
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Why Brainito Section */}
                    <section className="py-24 bg-[#F3F0FF] relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full border-4 border-purple-200 opacity-40" />
                            <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full border-4 border-purple-200 opacity-40" />
                            <div className="absolute top-1/4 left-1/4 grid grid-cols-5 gap-5 opacity-50">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-purple-300" />
                                ))}
                            </div>
                            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-purple-300 opacity-30 rotate-12" />
                            <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full bg-purple-200 opacity-40" />
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
                                    Why Brainito?
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Join thousands of businesses that trust Brainito to power their marketing success
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                                {[
                                    {
                                        icon: Award,
                                        title: "10+ Years Experience",
                                        description: "Built on a decade of marketing expertise and industry insights",
                                    },
                                    {
                                        icon: Zap,
                                        title: "AI-Powered",
                                        description: "Cutting-edge AI technology that learns and adapts to your needs",
                                    },
                                    {
                                        icon: Users,
                                        title: "1,700+ Happy Clients",
                                        description: "Trusted by businesses of all sizes across 50+ countries",
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Proven Results",
                                        description: "Average 3x ROI increase within the first 6 months",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-8 rounded-2xl bg-white border border-purple-200 hover:border-[#7C3AED] hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-5">
                                            <item.icon className="w-8 h-8 text-[#7C3AED]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-100 opacity-50 blur-3xl" />
                            <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-orange-100 opacity-50 blur-3xl" />
                            <div className="absolute top-1/4 right-40 w-20 h-20 border-2 border-purple-200 opacity-50 rotate-45" />
                            <div className="absolute bottom-1/3 left-48 grid grid-cols-3 gap-4 opacity-40">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-purple-400" />
                                ))}
                            </div>
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
                                    Loved by <span className="text-[#7C3AED]">Thousands</span>
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                                    See what our customers have to say about their experience with Brainito
                                </p>
                            </div>

                            {/* Testimonial Slider */}
                            <div className="relative max-w-7xl mx-auto mb-12">
                                <div className="overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-500 ease-out gap-6"
                                        style={{ transform: `translateX(-${(testimonialIndex * 100) / 3}%)` }}
                                    >
                                        {[
                                            {
                                                name: "Sarah Johnson",
                                                role: "CEO at TechStart Inc",
                                                avatar: "SJ",
                                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
                                                text: "Brainito transformed our marketing strategy. We saw a 300% increase in qualified leads within 3 months. The AI insights are incredibly accurate.",
                                            },
                                            {
                                                name: "Michael Chen",
                                                role: "Marketing Director at GrowthLabs",
                                                avatar: "MC",
                                                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                                                text: "The automation saves us 20+ hours per week, and the ROI tracking is phenomenal. Best marketing platform we've used!",
                                            },
                                            {
                                                name: "Emily Rodriguez",
                                                role: "Founder at BrandBoost",
                                                avatar: "ER",
                                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
                                                text: "The influencer matching feature alone has generated over $500K in revenue for our clients. Absolutely worth every penny.",
                                            },
                                            {
                                                name: "David Park",
                                                role: "CMO at EcomPro",
                                                avatar: "DP",
                                                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                                                text: "Finally, a marketing tool that understands our business. The custom reports have been game-changers for our team.",
                                            },
                                            {
                                                name: "Lisa Thompson",
                                                role: "Agency Owner at Digital Edge",
                                                avatar: "LT",
                                                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
                                                text: "We manage 50+ client accounts on Brainito. The white-label features are perfect for agencies. Clients love the results!",
                                            },
                                            {
                                                name: "James Williams",
                                                role: "VP Marketing at ScaleUp Co",
                                                avatar: "JW",
                                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
                                                text: "The dedicated account manager and priority support are exceptional. Brainito is a true growth partner.",
                                            },
                                        ].map((testimonial, index) => (
                                            <div
                                                key={index}
                                                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                            >
                                                <div className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-200 transition-all duration-300 h-full">
                                                    {/* Rating Stars */}
                                                    <div className="flex gap-0.5 mb-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                                                        ))}
                                                    </div>

                                                    {/* Testimonial Text */}
                                                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                                                        "{testimonial.text}"
                                                    </p>

                                                    {/* Author Info */}
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                            loading="lazy"
                                                        />
                                                        <div>
                                                            <div className="font-semibold text-gray-900 text-sm">
                                                                {testimonial.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {testimonial.role}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Dots */}
                                <div className="flex justify-center gap-2 mt-8">
                                    {[0, 1, 2, 3].map((index) => (
                                        <button
                                            key={index}
                                            onClick={() => setTestimonialIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${testimonialIndex === index
                                                ? 'bg-[#7C3AED] w-8'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="flex gap-1 justify-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                                        ))}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                </div>

                                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                                    <Users className="w-6 h-6 text-[#7C3AED] mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-gray-900 mb-1">1,700+</div>
                                    <div className="text-sm text-gray-600">Clients</div>
                                </div>

                                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                                    <Globe className="w-6 h-6 text-[#7C3AED] mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                                    <div className="text-sm text-gray-600">Countries</div>
                                </div>

                                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                                    <Award className="w-6 h-6 text-[#7C3AED] mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                                    <div className="text-sm text-gray-600">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className="py-24 bg-[#FAFBFC] relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-purple-100 opacity-50 blur-3xl" />
                            <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-orange-100 opacity-50 blur-3xl" />
                            <div className="absolute top-1/3 left-20 w-32 h-32 border-3 border-purple-200 opacity-50" />
                            {/* Dots grid */}
                            <div className="absolute bottom-1/4 right-1/4 grid grid-cols-4 gap-3 opacity-30">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                ))}
                            </div>
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
                                    <span className="text-[#7C3AED]">Simple Pricing</span> for Everyone
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Choose the plan that's right for your business. All plans include core features.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {[
                                    {
                                        name: "Free",
                                        price: "$0",
                                        period: "/forever",
                                        description: "Perfect for getting started",
                                        features: [
                                            "1 Website Analysis",
                                            "Basic AI Insights",
                                            "Email Support",
                                            "7-Day Data History",
                                        ],
                                        cta: "Start Free",
                                        popular: false,
                                    },
                                    {
                                        name: "Standard",
                                        price: "$99",
                                        period: "/month",
                                        description: "For growing businesses",
                                        features: [
                                            "Unlimited Website Analysis",
                                            "Advanced AI Insights",
                                            "Priority Support",
                                            "30-Day Data History",
                                            "Team Collaboration",
                                            "Custom Reports",
                                        ],
                                        cta: "Get Started",
                                        popular: true,
                                    },
                                    {
                                        name: "Premium",
                                        price: "$2,999",
                                        period: "/month",
                                        description: "For enterprises & agencies",
                                        features: [
                                            "Everything in Standard",
                                            "Dedicated Account Manager",
                                            "White-Label Reports",
                                            "Unlimited Data History",
                                            "API Access",
                                            "Custom Integrations",
                                            "24/7 Phone Support",
                                        ],
                                        cta: "Contact Sales",
                                        popular: false,
                                    },
                                ].map((plan, index) => (
                                    <div
                                        key={index}
                                        className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${plan.popular
                                            ? "border-[#7C3AED] bg-white shadow-lg shadow-purple-500/10 scale-105"
                                            : "border-gray-200 bg-white hover:border-[#7C3AED]"
                                            }`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#7C3AED] rounded-full">
                                                <span className="text-sm font-semibold text-white flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-white" />
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {plan.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {plan.description}
                                            </p>
                                            <div className="mb-6">
                                                <span className="text-5xl font-extrabold text-gray-900">
                                                    {plan.price}
                                                </span>
                                                <span className="text-gray-600 text-lg">
                                                    {plan.period}
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-900">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button
                                            onClick={handleGetStarted}
                                            variant={plan.popular ? "default" : "outline"}
                                            size="lg"
                                            className={`w-full ${plan.popular
                                                ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold shadow-lg shadow-purple-500/20"
                                                : "border-2 border-gray-300 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-purple-50 font-semibold"
                                                }`}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-24 bg-white relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-10 right-0 w-80 h-80 rounded-full bg-purple-100 opacity-40 blur-3xl" />
                            <div className="absolute -bottom-10 left-0 w-72 h-72 rounded-full bg-orange-100 opacity-40 blur-3xl" />
                            <div className="absolute top-1/2 left-20 w-16 h-16 border-2 border-purple-200 opacity-40 rotate-12" />
                            <div className="absolute bottom-1/4 right-32 space-y-2 opacity-30">
                                <div className="w-20 h-1 bg-purple-300" />
                                <div className="w-16 h-1 bg-purple-300" />
                                <div className="w-24 h-1 bg-purple-300" />
                            </div>
                        </div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
                                    Frequently Asked <span className="text-[#7C3AED]">Questions</span>
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Got questions? We've got answers. Here are the most common questions about Brainito.
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                <Accordion type="single" collapsible className="space-y-4">
                                    <AccordionItem value="item-1" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            What makes Brainito different from other marketing platforms?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Brainito combines cutting-edge AI technology with 10+ years of marketing expertise. Unlike other platforms that just provide data, we deliver actionable insights tailored to your specific business goals. Our platform integrates seamlessly with your existing tools and provides real-time recommendations that actually drive growth.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            Do I need a credit card to start the free plan?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            No! You can start with our free plan without entering any credit card information. The free plan includes 1 website analysis, basic AI insights, and email support - perfect for testing out Brainito and seeing the value it can bring to your business.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            Can I upgrade or downgrade my plan at any time?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Absolutely! You can upgrade, downgrade, or cancel your plan at any time with no penalties. If you upgrade mid-month, you'll only pay the prorated difference. If you downgrade, the change takes effect at the start of your next billing cycle.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            What kind of support do you offer?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Free plan users get email support with 24-48 hour response times. Standard plan users receive priority email support with same-day responses. Premium plan users get a dedicated account manager and 24/7 phone support for immediate assistance.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            How long does it take to see results?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Most of our clients start seeing improvements within the first 30 days. However, the timeline depends on your industry, current marketing efforts, and how quickly you implement our recommendations. On average, clients see a 3x ROI increase within the first 6 months.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-6" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            Is my data secure?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Yes, we take data security very seriously. All data is encrypted in transit and at rest using industry-standard encryption (AES-256). We're GDPR and CCPA compliant, and we never sell or share your data with third parties. You can read more in our comprehensive privacy policy.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-7" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            Can I use Brainito for multiple websites or clients?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Yes! The Standard plan includes unlimited website analyses, making it perfect for agencies and businesses managing multiple brands. The Premium plan adds white-label reports and advanced team collaboration features, ideal for agencies serving multiple clients.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-8" className="border border-gray-200 rounded-xl px-6 bg-white">
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#7C3AED]">
                                            Do you offer custom enterprise solutions?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 leading-relaxed">
                                            Yes! For large enterprises with specific needs, we offer custom solutions including dedicated infrastructure, custom integrations, advanced API access, and personalized onboarding. Contact our sales team to discuss your requirements and get a custom quote.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <div className="mt-12 text-center p-8 rounded-2xl bg-[#FAFBFC] border border-gray-200">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Still have questions?
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Our team is here to help. Get in touch and we'll answer all your questions.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button
                                            onClick={handleGetStarted}
                                            variant="outline"
                                            size="lg"
                                            className="border-2 border-gray-300 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-purple-50 font-semibold"
                                        >
                                            Contact Support
                                        </Button>
                                        <Button
                                            onClick={handleGetStarted}
                                            size="lg"
                                            className="bg-[#7C3AED] hover:bg-[#6D28D9] font-bold text-white shadow-lg shadow-purple-500/20"
                                        >
                                            Schedule a Call
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA Section */}
                    <section className="py-24 bg-[#7C3AED] relative overflow-hidden">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl" />
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white opacity-10 rotate-45" />
                            <div className="absolute bottom-1/4 right-1/4 grid grid-cols-4 gap-6 opacity-20">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-white" />
                                ))}
                            </div>
                        </div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
                                    Ready to Transform Your Marketing?
                                </h2>
                                <p className="text-lg sm:text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
                                    Join thousands of businesses that have already unlocked their growth potential with Brainito.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button
                                        onClick={handleGetStarted}
                                        size="lg"
                                        className="h-14 px-8 text-lg font-bold bg-white text-white hover:bg-gray-100 group shadow-xl"
                                    >
                                        Get Started Free
                                        <Rocket className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
                                    >
                                        Schedule a Demo
                                    </Button>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
                                    {[
                                        { label: "No credit card required" },
                                        { label: "Free forever plan" },
                                        { label: "Setup in 5 minutes" },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                            <span className="text-sm text-purple-100">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default HomepageDemo;
