# Sitemap and Robots.txt Documentation

This document explains the dynamic sitemap generation system for Brainito.com.

## Overview

The sitemap system is **dynamic** and automatically includes new pages when they are added to the website. It consists of:

1. **Static sitemap.xml** - Generated at build time
2. **Dynamic sitemap generator** - Fetches case studies from API
3. **Build script** - Runs before deployment
4. **Updated robots.txt** - Points to the sitemap

## Files Created

### 1. `/public/sitemap.xml`
- The actual sitemap file served to search engines
- Generated automatically during build
- Includes all static pages + dynamic case studies

### 2. `/scripts/generate-sitemap.js`
- Node.js script that generates the sitemap
- Fetches case studies from the API
- Combines static routes with dynamic content
- Runs automatically before each build

### 3. `/src/utils/generateSitemap.ts`
- TypeScript utility for sitemap generation
- Can be used for client-side sitemap generation if needed
- Shared logic between build script and runtime

### 4. `/public/robots.txt`
- Updated with sitemap reference
- Includes proper crawl directives
- Disallows auth routes from indexing

## How It Works

### Automatic Generation (Recommended)

The sitemap is **automatically generated** every time you build the project:

```bash
npm run build
```

This runs `npm run generate:sitemap` before the build, ensuring your sitemap is always up-to-date.

### Manual Generation

You can also generate the sitemap manually:

```bash
npm run generate:sitemap
```

This will:
1. Fetch all case studies from the API
2. Combine them with static routes
3. Generate `public/sitemap.xml`
4. Display a success message

## Adding New Pages

### For Static Pages

When you add a new page to your website:

1. **Add the route to App.tsx** (you probably already do this)
2. **Add the route to the sitemap generator**:

Open `/scripts/generate-sitemap.js` and add your new route to the `staticRoutes` array:

```javascript
const staticRoutes = [
  // ... existing routes
  {
    loc: '/your-new-page',
    changefreq: 'weekly',  // how often it changes
    priority: 0.8,         // importance (0.0 to 1.0)
  },
];
```

3. **Regenerate the sitemap**:
```bash
npm run generate:sitemap
```

### For Dynamic Pages

Dynamic pages (like case studies) are **automatically included** when you run the sitemap generator. The script fetches them from your API.

To add a new type of dynamic content:

1. Add a fetch function in `/scripts/generate-sitemap.js`
2. Call it in the `generateSitemap()` function
3. Add the URLs to the `allUrls` array

## Priority Guidelines

Use these priority values as a guide:

- **1.0** - Homepage
- **0.9** - Main service pages (DIY Plan, Hire Marketer, Pricing)
- **0.8** - Important content pages (Case Studies listing)
- **0.7** - Secondary pages (About, Contact, individual case studies)
- **0.5** - Blog posts, resources
- **0.3** - Legal pages (Privacy, Terms, etc.)

## Change Frequency Guidelines

- **daily** - Homepage, blog listing
- **weekly** - Service pages, frequently updated content
- **monthly** - About, Contact, case studies
- **yearly** - Legal pages, rarely changing content

## Deployment

### Before Deploying

The sitemap is automatically generated during the build process, so you don't need to do anything special.

### After Deploying

1. **Verify the sitemap is accessible**:
   - Visit: `https://brainito.com/sitemap.xml`
   - Visit: `https://brainito.com/robots.txt`

2. **Submit to Google Search Console**:
   - Go to Google Search Console
   - Navigate to Sitemaps
   - Submit: `https://brainito.com/sitemap.xml`

3. **Submit to Bing Webmaster Tools** (optional):
   - Similar process to Google

## Testing Locally

### View the sitemap locally:

1. Generate the sitemap:
```bash
npm run generate:sitemap
```

2. Start the dev server:
```bash
npm run dev
```

3. Visit in your browser:
   - `http://localhost:5173/sitemap.xml`
   - `http://localhost:5173/robots.txt`

## Troubleshooting

### Sitemap not updating with new case studies?

Run the generator manually:
```bash
npm run generate:sitemap
```

### API not accessible during build?

The script will continue with static routes only and show a warning. This is fine for development.

### Want to change the domain?

Edit the `SITE_URL` constant in `/scripts/generate-sitemap.js`:
```javascript
const SITE_URL = 'https://your-domain.com';
```

## SEO Best Practices

✅ **DO:**
- Run `npm run generate:sitemap` before each deployment
- Submit your sitemap to Google Search Console
- Keep priorities realistic (don't make everything 1.0)
- Update change frequencies based on actual update patterns

❌ **DON'T:**
- Include URLs that redirect
- Include URLs blocked by robots.txt
- Include non-canonical URLs
- Forget to update the sitemap when adding new page types

## Questions?

If you need to modify the sitemap generation logic, the main files to edit are:
- `/scripts/generate-sitemap.js` - Build-time generation
- `/src/utils/generateSitemap.ts` - Runtime generation utilities

Both files share similar logic, so keep them in sync if you make changes.
