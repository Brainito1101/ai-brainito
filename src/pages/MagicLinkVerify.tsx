import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app.brainito.com/api";

export default function MagicLinkVerify() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState("");
    const hasVerified = useRef(false); // Prevent double execution

    useEffect(() => {
        // Prevent double execution in React StrictMode
        if (hasVerified.current) return;

        const handleVerification = async () => {
            const token = searchParams.get("token");

            if (!token) {
                setStatus('error');
                setErrorMessage("Invalid magic link. No token provided.");
                return;
            }

            hasVerified.current = true; // Mark as verified to prevent re-execution

            try {
                const response = await fetch(`${API_BASE_URL}/auth/magic-link/verify/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                });

                const data = await response.json();

                if (data.success && data.tokens && data.user) {
                    // Store tokens and user info
                    login(data.user, data.tokens);

                    setStatus('success');

                    // Redirect to dashboard after login
                    setTimeout(() => {
                        const tokenData = encodeURIComponent(JSON.stringify({
                            access: data.tokens.access,
                            refresh: data.tokens.refresh,
                            email: data.user.email,
                            username: data.user.username,
                            profile_picture: data.user.profile_picture || ""
                        }));

                        // Check for pending website in URL query parameter (passed by backend in magic link)
                        const pendingWebsite = searchParams.get('pendingWebsite');

                        const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "https://app.brainito.com";
                        let redirectUrl = `${dashboardUrl}/dashboard?auth=${tokenData}`;

                        // If there's a pending website, pass it to dashboard
                        if (pendingWebsite) {
                            redirectUrl += `&pendingWebsite=${encodeURIComponent(pendingWebsite)}`;
                        }

                        window.location.href = redirectUrl;
                    }, 1500);
                } else {
                    setStatus('error');
                    setErrorMessage(data.message || "Invalid or expired magic link. Please request a new one.");
                }
            } catch (err) {
                setStatus('error');
                setErrorMessage("Connection error. Please try again.");
                hasVerified.current = false; // Reset on error so user can retry
            }
        };

        handleVerification();
    }, [searchParams, navigate, login]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                {status === 'verifying' && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
                            <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Magic Link</h2>
                        <p className="text-gray-600">Please wait while we sign you in...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-4">You've been signed in successfully.</p>
                        <p className="text-sm text-gray-500">Redirecting you now...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-6">{errorMessage}</p>

                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate("/")}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg"
                            >
                                Go to Home
                            </Button>

                            <Button
                                onClick={() => {
                                    // Navigate to home and trigger auth modal
                                    navigate("/?auth=open");
                                }}
                                variant="outline"
                                className="w-full"
                            >
                                Request New Magic Link
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
