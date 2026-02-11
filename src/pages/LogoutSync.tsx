import { useEffect } from 'react';

/**
 * LogoutSync Component for Website
 * 
 * This page handles cross-domain logout synchronization. It is accessed when:
 * - Dashboard redirects here with ?source=dashboard after user logs out from dashboard
 *   - Clears website storage
 *   - Redirects to website homepage
 */
const LogoutSync = () => {
    useEffect(() => {
        console.log('[Website LogoutSync] Page loaded - clearing all auth data');

        // Get the source parameter to determine who initiated the logout
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get('source');

        // Clear website localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        console.log('[Website LogoutSync] Website storage cleared');

        if (source === 'dashboard') {
            // Dashboard initiated the logout and already cleared its own storage
            // Just redirect to website homepage (clean URL)
            console.log('[Website LogoutSync] Redirecting to homepage (initiated by dashboard)');
            window.location.href = '/';
        } else {
            // Fallback: redirect to homepage with logout flag
            console.log('[Website LogoutSync] Redirecting to homepage with logout flag');
            window.location.href = '/?logout=true';
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Logging out...</h2>
                <p className="text-gray-500">Please wait while we secure your session.</p>
            </div>
        </div>
    );
};

export default LogoutSync;
