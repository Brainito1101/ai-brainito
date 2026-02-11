//brainito.com

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    email: string;
    username: string;
    profile_picture?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User, tokens: { access: string; refresh: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// CRITICAL: Check for logout parameter IMMEDIATELY when this module loads
// This runs before React even starts, ensuring localStorage is cleared before any component mounts
let isLogoutRedirect = false;
if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
        console.log('[Module Init] Logout parameter detected - clearing all auth data IMMEDIATELY');
        isLogoutRedirect = true;
        localStorage.clear();
        sessionStorage.clear();

        // Clean up URL
        urlParams.delete('logout');
        const newUrl = window.location.pathname +
            (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
        console.log('[Module Init] Auth data cleared, URL cleaned');
    }
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app.brainito.com/api";

    // BROADCAST CHANNEL: Listen for cross-origin logout signals
    useEffect(() => {
        const logoutChannel = new BroadcastChannel('brainito_logout');

        logoutChannel.onmessage = (event) => {
            if (event.data === 'FORCE_LOGOUT') {
                console.log('[Website] Received FORCE_LOGOUT from broadcast channel');
                localStorage.clear();
                sessionStorage.clear();
                setUser(null);
                window.location.href = '/?logout=true';
            }
        };

        return () => logoutChannel.close();
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            console.log('[WEBSITE AUTH] ========== AUTH INITIALIZATION STARTING ==========');

            // CRITICAL: Check for force_logout FIRST
            const urlParams = new URLSearchParams(window.location.search);
            const hasForceLogout = urlParams.get('force_logout');

            console.log('[WEBSITE AUTH] Checking force_logout flag:', hasForceLogout);

            if (hasForceLogout === 'true') {
                console.log('[WEBSITE AUTH] force_logout detected! Skipping auth initialization');
                console.log('[WEBSITE AUTH] User should be logged out already');
                setUser(null);
                setLoading(false);
                return;
            }

            // SKIP INIT if we are on the logout-sync page to avoid race conditions
            if (window.location.pathname.startsWith('/logout-sync')) {
                console.log('[WEBSITE AUTH] On logout-sync page - skipping auth initialization');
                setLoading(false);
                return;
            }

            console.log('[Website AuthContext] Starting auth initialization');

            // RUNTIME CHECK: Also check for logout parameter here (in addition to module-level check)
            // This handles cases where module-level code might not run (e.g., HMR in development)
            const logoutParam = urlParams.get('logout');

            if (logoutParam === 'true') {
                console.log('[Website AuthContext] Runtime logout parameter detected - clearing storage');
                localStorage.clear();
                sessionStorage.clear();
                setUser(null);
                setLoading(false);

                // Clean up URL
                urlParams.delete('logout');
                const newUrl = window.location.pathname +
                    (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.history.replaceState({}, '', newUrl);
                console.log('[Website AuthContext] Runtime logout complete, URL cleaned');
                return; // Exit early
            }

            // Check the module-level flag set during initial load
            if (isLogoutRedirect) {
                console.log('[Website AuthContext] Logout redirect detected - user already logged out at module level');
                setUser(null);
                setLoading(false);
                return; // Exit early - do not proceed with normal auth initialization
            }

            // CHECK FOR AUTH PARAMETER (SSO from Dashboard)
            const authParam = urlParams.get('auth');
            if (authParam) {
                try {
                    console.log('[Website AuthContext] Auth parameter detected, attempting hydration');
                    const authData = JSON.parse(decodeURIComponent(authParam));

                    if (authData.access && authData.email) {
                        console.log('[Website AuthContext] Hydrating session from auth parameter');

                        localStorage.setItem("access_token", authData.access);
                        if (authData.refresh) localStorage.setItem("refresh_token", authData.refresh);
                        localStorage.setItem("user_email", authData.email);
                        if (authData.username) localStorage.setItem("username", authData.username);
                        if (authData.profile_picture) localStorage.setItem("profile_picture", authData.profile_picture);

                        // Clean up URL
                        urlParams.delete('auth');
                        const newUrl = window.location.pathname +
                            (urlParams.toString() ? '?' + urlParams.toString() : '');
                        window.history.replaceState({}, '', newUrl);

                        setUser({
                            email: authData.email,
                            username: authData.username || "",
                            profile_picture: authData.profile_picture || ""
                        });
                        setLoading(false);
                        return; // Successfully hydrated, skip local storage check
                    }
                } catch (error) {
                    console.error("Error parsing auth parameter:", error);
                }
            }

            // Normal auth initialization flow
            console.log('[Website AuthContext] No logout parameter, checking localStorage for auth data');
            const access = localStorage.getItem("access_token");
            const refresh = localStorage.getItem("refresh_token");
            const email = localStorage.getItem("user_email");
            const username = localStorage.getItem("username");
            const profile_picture = localStorage.getItem("profile_picture");

            console.log('[Website AuthContext] LocalStorage check:', { hasAccess: !!access, hasEmail: !!email, email });

            if (!access || !email) {
                console.log('[Website AuthContext] No auth tokens found, user not logged in');
                setLoading(false);
                return;
            }

            try {
                // 1. Verify the current access token
                const verifyRes = await fetch(`${API_BASE_URL}/auth/verify-token/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: access })
                });

                if (verifyRes.ok) {
                    // Token is valid
                    setUser({ email, username: username || "", profile_picture: profile_picture || "" });
                } else {
                    // Token invalid/expired, try to refresh
                    if (refresh) {
                        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ refresh: refresh })
                        });

                        const refreshData = await refreshRes.json();

                        if (refreshRes.ok && refreshData.success && refreshData.access) {
                            // Refresh successful
                            localStorage.setItem("access_token", refreshData.access);
                            setUser({ email, username: username || "", profile_picture: profile_picture || "" });
                        } else {
                            // Refresh failed - Clear everything and force login
                            console.warn("Session expired, logging out.");
                            localStorage.clear();
                            setUser(null);
                        }
                    } else {
                        // No refresh token available
                        localStorage.clear();
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                // IMPORTANT: Re-check localStorage here because it might have been cleared
                // during logout detection above. Don't use the stale variables from line 43-47.
                const currentAccess = localStorage.getItem("access_token");
                const currentEmail = localStorage.getItem("user_email");

                // Only restore user if localStorage still has auth data
                // (i.e., this was just a network error, not a logout)
                if (currentAccess && currentEmail) {
                    const currentUsername = localStorage.getItem("username");
                    const currentProfilePicture = localStorage.getItem("profile_picture");
                    setUser({
                        email: currentEmail,
                        username: currentUsername || "",
                        profile_picture: currentProfilePicture || ""
                    });
                } else {
                    // localStorage is empty (likely from logout), keep user null
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (user: User, tokens: { access: string; refresh: string }) => {
        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        localStorage.setItem("user_email", user.email);
        localStorage.setItem("username", user.username);
        if (user.profile_picture) localStorage.setItem("profile_picture", user.profile_picture);

        setUser(user);
    };

    const logout = async () => {
        console.log('[Website] Logout initiated');

        // Get tokens before clearing
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        // Step 1: Call backend logout API to invalidate tokens server-side
        if (accessToken) {
            try {
                console.log('[Website] Calling backend logout API');
                await fetch(`${API_BASE_URL}/auth/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ refresh: refreshToken })
                });
                console.log('[Website] Backend logout successful');
            } catch (error) {
                console.error('[Website] Backend logout failed:', error);
                // Continue with client-side logout even if backend fails
            }
        }

        // Step 2: Clear website localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);
        console.log('[Website] Local auth data cleared');

        // Get dashboard URL from environment variable
        const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || 'https://app.brainito.com';

        // Step 3: Redirect Sync Strategy
        // Because modern browsers partition localStorage in iframes (blocking third-party access),
        // we MUST redirect the main window to the other domain to reliably clear its storage.

        console.log('[Website] Redirecting to dashboard to complete logout sync');

        // We pass source=website so the dashboard knows to redirect us BACK to the website homepage
        // This creates a "Website -> Dashboard (clear) -> Website" flow
        window.location.href = `${dashboardUrl}/logout-sync?source=website`;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
