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
import LogoutSync from "./pages/LogoutSync";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import SEOManager from "./components/SEOManager";

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
