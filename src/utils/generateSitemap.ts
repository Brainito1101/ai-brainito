/**
 * Dynamic Sitemap Generator for Brainito
 * This utility generates a sitemap.xml dynamically based on routes and API data
 */

interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

const SITE_URL = 'https://brainito.com';

/**
 * Static routes configuration
 * Add new routes here when you create new pages
 */
const staticRoutes: SitemapUrl[] = [
    {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
    },
    {
        loc: '/diy-marketing-plan',
        changefreq: 'weekly',
        priority: 0.9,
    },
    {
        loc: '/hire-marketer',
        changefreq: 'weekly',
        priority: 0.9,
    },
    {
        loc: '/pricing',
        changefreq: 'weekly',
        priority: 0.9,
    },
    {
        loc: '/case-studies',
        changefreq: 'weekly',
        priority: 0.8,
    },
    {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.7,
    },
    {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.7,
    },
    {
        loc: '/privacy-policy',
        changefreq: 'yearly',
        priority: 0.3,
    },
    {
        loc: '/terms',
        changefreq: 'yearly',
        priority: 0.3,
    },
    {
        loc: '/refund-policy',
        changefreq: 'yearly',
        priority: 0.3,
    },
    {
        loc: '/cookie-policy',
        changefreq: 'yearly',
        priority: 0.3,
    },
];

/**
 * Fetch dynamic case study URLs from the API
 */
async function fetchCaseStudyUrls(): Promise<SitemapUrl[]> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://app.brainito.com/api';
        const response = await fetch(`${apiUrl}/case-studies/`);

        if (!response.ok) {
            console.warn('Failed to fetch case studies for sitemap');
            return [];
        }

        const caseStudies = await response.json();

        return caseStudies.map((study: any) => ({
            loc: `/case-studies/${study.slug}`,
            changefreq: 'monthly' as const,
            priority: 0.7,
            lastmod: study.updated_at || study.created_at,
        }));
    } catch (error) {
        console.error('Error fetching case studies for sitemap:', error);
        return [];
    }
}

/**
 * Generate XML sitemap content
 */
export async function generateSitemap(): Promise<string> {
    const currentDate = new Date().toISOString();

    // Fetch dynamic URLs
    const caseStudyUrls = await fetchCaseStudyUrls();

    // Combine all URLs
    const allUrls = [...staticRoutes, ...caseStudyUrls];

    // Generate XML
    const urlEntries = allUrls.map(url => {
        const lastmod = url.lastmod || currentDate;
        return `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generate and save sitemap to public folder (for build scripts)
 */
export async function saveSitemap(): Promise<void> {
    const sitemap = await generateSitemap();

    // This would be used in a Node.js build script
    if (typeof window === 'undefined') {
        const fs = await import('fs');
        const path = await import('path');

        const publicDir = path.join(process.cwd(), 'public');
        const sitemapPath = path.join(publicDir, 'sitemap.xml');

        fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
        console.log('✅ Sitemap generated successfully at:', sitemapPath);
    }
}
