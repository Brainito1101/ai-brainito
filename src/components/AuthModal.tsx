import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app.brainito.com/api";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [googleLoading, setGoogleLoading] = useState(false);
    const [magicLinkSent, setMagicLinkSent] = useState(false);

    const [email, setEmail] = useState("");

    const handleMagicLinkRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        setMagicLinkSent(false);

        if (!email) {
            setError("Please enter your email address");
            setLoading(false);
            return;
        }

        try {
            // Check for pending website in sessionStorage (from homepage form)
            const pendingWebsite = sessionStorage.getItem('pendingWebsite');

            const requestBody: { email: string; pending_website?: string } = { email };
            if (pendingWebsite) {
                requestBody.pending_website = pendingWebsite;
            }

            const response = await fetch(`${API_BASE_URL}/auth/magic-link/request/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.success) {
                setMagicLinkSent(true);
                setSuccess("Magic link sent! Please check your email.");
                // Clear email after successful send
                setTimeout(() => {
                    setEmail("");
                }, 2000);
            } else if (data.google_account) {
                setError(data.message);
            } else {
                setError(data.message || "Failed to send magic link. Please try again.");
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            setError("");
            const response = await fetch(`${API_BASE_URL}/auth/google/init/`);
            const data = await response.json();

            if (data.auth_url) {
                window.location.href = data.auth_url; // redirect to Google
            } else {
                setError("Failed to start Google login.");
                setGoogleLoading(false);
            }
        } catch (err) {
            setError("Connection error. Please try again.");
            setGoogleLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Welcome
                        </h2>
                        <p className="text-purple-100 text-sm">
                            Sign in to access your AI Marketing reports
                        </p>
                    </div>

                    {/* Alert Messages */}
                    {error && (
                        <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-sm block">{error}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{success}</span>
                        </div>
                    )}

                    {/* Forms */}
                    <div className="p-6">
                        <div className="space-y-4">
                            {/* Google Login Button */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading || googleLoading}
                                className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold py-3 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {googleLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        Continue with Google
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                                </div>
                            </div>

                            {/* Magic Link Form */}
                            {!magicLinkSent ? (
                                <form onSubmit={handleMagicLinkRequest} className="space-y-4">
                                    <div>
                                        <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={loading}
                                                className="pl-10 py-3 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            We'll send you a magic link to sign in
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending email ...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Continue with email
                                            </>
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center py-4 space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                        <Mail className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Check Your Email</h3>
                                    <p className="text-sm text-gray-600">
                                        We've sent a magic link to <strong>{email}</strong>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Click the link in the email to sign in. The link will expire in 15 minutes.
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setMagicLinkSent(false);
                                            setEmail("");
                                            setSuccess("");
                                        }}
                                        variant="outline"
                                        className="w-full mt-4"
                                    >
                                        Use a different email
                                    </Button>
                                </div>
                            )}

                            <p className="text-xs text-gray-500 text-center mt-4">
                                By signing in, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
                        <p className="text-center text-sm text-gray-600">
                            No account? Just enter your email and we'll create one for you!
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
