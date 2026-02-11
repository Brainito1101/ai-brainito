import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg transform transition-transform duration-500 ease-in-out">
            <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm text-foreground/80">
                    <p>
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept", you consent to our use of cookies. Read our{" "}
                        <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link to="/cookie-policy" className="text-primary hover:underline font-medium">
                            Cookie Policy
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex"
                        onClick={() => setIsVisible(false)} // Temporarily dismiss without saving
                    >
                        Close
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={acceptCookies}
                        className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        Accept Cookies
                    </Button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="sm:hidden text-foreground/50 hover:text-foreground p-1"
                        aria-label="Close cookie banner"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
