import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import GoogleCallback from './pages/GoogleCallback';
import MagicLinkVerify from './pages/MagicLinkVerify';
import DIYMarketingPlan from "./pages/DIYMarketingPlan";
import HireMarketer from "./pages/HireMarketer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Help from "./pages/Help";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import SEOManager from "./components/SEOManager";
import LogoutSync from "./pages/LogoutSync";
import HomepageDemo from "./pages/HomepageDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SEOManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/logout-sync" element={<LogoutSync />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/auth/magic-link/verify" element={<MagicLinkVerify />} />
            <Route path="/diy-marketing-plan" element={<DIYMarketingPlan />} />
            <Route path="/hire-marketer" element={<HireMarketer />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/homepage-demo" element={<HomepageDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <Analytics />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
