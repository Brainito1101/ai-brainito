import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('[WEBSITE MAIN] ========== APPLICATION STARTING ==========');
console.log('[WEBSITE MAIN] Current URL:', window.location.href);
console.log('[WEBSITE MAIN] Referrer:', document.referrer);

// Check if we came from the Dashboard
// Check if we came from the Dashboard (works for both localhost and production)
const cameFromDashboard = document.referrer && (
    document.referrer.includes('localhost:8082') ||
    document.referrer.includes('app.brainito.com')
);
console.log('[WEBSITE MAIN] Came from Dashboard?', cameFromDashboard ? 'YES ✓' : 'NO');

if (cameFromDashboard) {
    console.log('[WEBSITE MAIN] ========== DASHBOARD LOGOUT DETECTED (via referrer) ==========');
    console.log('[WEBSITE MAIN] localStorage BEFORE clear:', Object.keys(localStorage));

    localStorage.clear();
    sessionStorage.clear();

    console.log('[WEBSITE MAIN] localStorage AFTER clear:', Object.keys(localStorage));
    console.log('[WEBSITE MAIN] Website storage cleared successfully ✓');
    console.log('[WEBSITE MAIN] ========== LOGOUT COMPLETE ==========');
}

// Also check for force_logout parameter (backup method)
const params = new URLSearchParams(window.location.search);
const hasForceLogout = params.get('force_logout') === 'true';

console.log('[WEBSITE MAIN] Checking URL parameters...');
console.log('[WEBSITE MAIN] force_logout parameter:', hasForceLogout ? 'YES ✓' : 'NO');

if (hasForceLogout && !cameFromDashboard) {
    console.log('[WEBSITE MAIN] ========== FORCE LOGOUT VIA PARAMETER ==========');
    console.log('[WEBSITE MAIN] localStorage BEFORE clear:', Object.keys(localStorage));

    localStorage.clear();
    sessionStorage.clear();

    console.log('[WEBSITE MAIN] localStorage AFTER clear:', Object.keys(localStorage));
    console.log('[WEBSITE MAIN] Website storage cleared successfully ✓');

    // Remove the flag from URL
    params.delete('force_logout');
    params.delete('t');
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    console.log('[WEBSITE MAIN] Cleaning URL to:', newUrl);
    window.history.replaceState({}, '', newUrl);

    console.log('[WEBSITE MAIN] ========== LOGOUT COMPLETE ==========');
}

console.log('[WEBSITE MAIN] Rendering React App...');
// Render the app
createRoot(document.getElementById("root")!).render(<App />);
