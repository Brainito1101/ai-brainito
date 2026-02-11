
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '@/lib/api';

const updateMeta = (name: string, content: string, attribute = 'name') => {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);
    if (content) {
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attribute, name);
            document.head.appendChild(tag);
            console.log(`✅ Created new meta tag: ${attribute}="${name}" content="${content}"`);
        } else {
            console.log(`✅ Updated existing meta tag: ${attribute}="${name}" content="${content}"`);
        }
        tag.setAttribute('content', content);
    }
}

const SEOManager = () => {
    const location = useLocation();

    useEffect(() => {
        const fetchSEO = async () => {
            const path = location.pathname;
            console.log('🔍 SEOManager: Fetching SEO data for path:', path);

            try {
                const data = await api.getPageSEO(path);

                if (data) {
                    console.log('✅ SEOManager: Received SEO data:', data);

                    if (data.meta_title) {
                        document.title = data.meta_title;
                        console.log(`✅ Updated page title to: "${data.meta_title}"`);
                    }

                    if (data.meta_description) {
                        updateMeta('description', data.meta_description);
                    }

                    if (data.meta_keywords) {
                        updateMeta('keywords', data.meta_keywords);
                    }

                    if (data.og_title) {
                        updateMeta('og:title', data.og_title, 'property');
                    }

                    if (data.og_description) {
                        updateMeta('og:description', data.og_description, 'property');
                    }

                    if (data.og_image) {
                        updateMeta('og:image', data.og_image, 'property');
                    }

                    if (data.no_index) {
                        updateMeta('robots', 'noindex, nofollow');
                    } else {
                        updateMeta('robots', 'index, follow');
                    }

                    if (data.canonical_url) {
                        let link = document.querySelector('link[rel="canonical"]');
                        if (!link) {
                            link = document.createElement('link');
                            link.setAttribute('rel', 'canonical');
                            document.head.appendChild(link);
                            console.log(`✅ Created canonical link: ${data.canonical_url}`);
                        } else {
                            console.log(`✅ Updated canonical link: ${data.canonical_url}`);
                        }
                        link.setAttribute('href', data.canonical_url);
                    }

                    if (data.json_ld) {
                        let script = document.querySelector('script[type="application/ld+json"]');
                        if (!script) {
                            script = document.createElement('script');
                            script.setAttribute('type', 'application/ld+json');
                            document.head.appendChild(script);
                            console.log('✅ Created JSON-LD script tag');
                        }
                        script.textContent = JSON.stringify(data.json_ld);
                    }

                    console.log('✅ SEOManager: All SEO tags updated successfully!');
                } else {
                    console.log('ℹ️ SEOManager: No SEO data found for path:', path);
                }
            } catch (error) {
                console.error('❌ SEOManager: Error fetching SEO data:', error);
            }
        };

        fetchSEO();
    }, [location]);

    return null;
}

export default SEOManager;
