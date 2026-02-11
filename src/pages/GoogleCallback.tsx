import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app.brainito.com/api";

export default function GoogleCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState("");
    const hasProcessed = useRef(false); // Prevent double execution in React StrictMode

    useEffect(() => {
        // Prevent double execution in React StrictMode
        if (hasProcessed.current) return;

        const handleCallback = async () => {
            const code = searchParams.get("code");
            if (!code) {
                const hasAnyParams = searchParams.toString().length > 0;
                if (hasAnyParams) {
                    setStatus('error');
                    setErrorMessage("Missing authorization code from Google.");
                }
                return;
            }

            hasProcessed.current = true; // Mark as processed to prevent re-execution

            try {
                const res = await fetch(
                    `${API_BASE_URL}/auth/google/callback/?code=${code}`
                );
                const data = await res.json();

                if (data.success && data.tokens && data.user) {
                    // Use AuthContext to handle login
                    login(data.user, data.tokens);

                    setStatus('success');

                    // Redirect to dashboard immediately after login
                    setTimeout(() => {
                        const tokenData = encodeURIComponent(JSON.stringify({
                            access: data.tokens.access,
                            refresh: data.tokens.refresh,
                            email: data.user.email,
                            username: data.user.username,
                            profile_picture: data.user.profile_picture || ""
                        }));

                        // Check for pending website in sessionStorage (from homepage form)
                        const pendingWebsite = sessionStorage.getItem('pendingWebsite');
                        const pendingEmail = sessionStorage.getItem('pendingEmail');

                        const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
                        let redirectUrl = `${dashboardUrl}/dashboard?auth=${tokenData}`;

                        // If there's a pending website, pass it as a query parameter
                        if (pendingWebsite) {
                            redirectUrl += `&pendingWebsite=${encodeURIComponent(pendingWebsite)}`;
                            // Clear from sessionStorage after passing to dashboard
                            sessionStorage.removeItem('pendingWebsite');
                            sessionStorage.removeItem('pendingEmail');
                        }

                        window.location.href = redirectUrl;
                    }, 1000);
                } else {
                    setStatus('error');
                    setErrorMessage(data.error || data.message || "Google login failed. Please try again.");
                }
            } catch (err) {
                setStatus('error');
                setErrorMessage("Connection error. Please try again.");
            }
        };

        handleCallback();
    }, [searchParams, navigate, login]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
                {status === 'processing' && (
                    <>
                        <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Completing Google Sign In</h2>
                        <p className="text-gray-600">Please wait...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-4">You've been signed in successfully.</p>
                        <p className="text-sm text-gray-500">Redirecting you now...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Failed</h2>
                        <p className="text-gray-600 mb-6">{errorMessage}</p>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                            Go to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
