import { useEffect, useState } from 'react';
import { generateSitemap } from '@/utils/generateSitemap';

/**
 * Dynamic Sitemap Page
 * This component generates and displays the sitemap XML dynamically
 * Access at: /sitemap.xml
 */
const Sitemap = () => {
    const [sitemap, setSitemap] = useState<string>('');

    useEffect(() => {
        generateSitemap().then(xml => {
            setSitemap(xml);
        });
    }, []);

    // Return plain XML (React will render it as text)
    return (
        <pre style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            margin: 0,
            padding: '20px'
        }}>
            {sitemap || 'Generating sitemap...'}
        </pre>
    );
};

export default Sitemap;
