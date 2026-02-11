/**
 * Build-time sitemap generation script
 * Run this script to generate sitemap.xml before deployment
 * Usage: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://brainito.com';
const API_URL = process.env.VITE_API_URL || 'https://app.brainito.com/api';

/**
 * Static routes configuration
 */
const staticRoutes = [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/diy-marketing-plan', changefreq: 'weekly', priority: 0.9 },
    { loc: '/hire-marketer', changefreq: 'weekly', priority: 0.9 },
    { loc: '/pricing', changefreq: 'weekly', priority: 0.9 },
    { loc: '/case-studies', changefreq: 'weekly', priority: 0.8 },
    { loc: '/about', changefreq: 'monthly', priority: 0.7 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
    { loc: '/terms', changefreq: 'yearly', priority: 0.3 },
    { loc: '/refund-policy', changefreq: 'yearly', priority: 0.3 },
    { loc: '/cookie-policy', changefreq: 'yearly', priority: 0.3 },
];

/**
 * Fetch dynamic case study URLs from the API
 */
async function fetchCaseStudyUrls() {
    try {
        console.log('📡 Fetching case studies from API...');
        const response = await fetch(`${API_URL}/case-studies/`);

        if (!response.ok) {
            console.warn('⚠️  Failed to fetch case studies, continuing with static routes only');
            return [];
        }

        const caseStudies = await response.json();
        console.log(`✅ Found ${caseStudies.length} case studies`);

        return caseStudies.map(study => ({
            loc: `/case-studies/${study.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: study.updated_at || study.created_at,
        }));
    } catch (error) {
        console.error('❌ Error fetching case studies:', error.message);
        return [];
    }
}

/**
 * Generate XML sitemap content
 */
async function generateSitemap() {
    const currentDate = new Date().toISOString();

    // Fetch dynamic URLs
    const caseStudyUrls = await fetchCaseStudyUrls();

    // Combine all URLs
    const allUrls = [...staticRoutes, ...caseStudyUrls];

    console.log(`📝 Generating sitemap with ${allUrls.length} URLs...`);

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
 * Main function
 */
async function main() {
    try {
        console.log('🚀 Starting sitemap generation...\n');

        const sitemap = await generateSitemap();

        const publicDir = path.join(process.cwd(), 'public');
        const sitemapPath = path.join(publicDir, 'sitemap.xml');

        // Ensure public directory exists
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

        console.log('\n✅ Sitemap generated successfully!');
        console.log(`📍 Location: ${sitemapPath}`);
        console.log(`🌐 Will be available at: ${SITE_URL}/sitemap.xml\n`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

main();
