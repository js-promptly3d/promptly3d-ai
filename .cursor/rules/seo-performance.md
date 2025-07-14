# SEO & Performance Rules

## Introduction
This document provides best practices for optimizing static and interactive web sites for search engines and fast load times, even with heavy 3D and animation content.

## SEO Best Practices
- Use semantic HTML5 structure (header, nav, main, section, article, footer).
- Ensure every page has a unique, descriptive title and meta description.
- Use Open Graph and Twitter Card meta tags for social sharing.
- Use descriptive alt text for all images and 3D canvas fallbacks.
- Generate and submit an XML sitemap.
- Use canonical URLs to avoid duplicate content.
- Structure URLs to be human-readable and keyword-rich.

## Performance Optimization
- Optimize images (responsive sizes, modern formats like WebP/AVIF, lazy loading).
- Minimize JavaScript and CSS bundle sizes (tree-shaking, code splitting).
- Use HTTP/2 or HTTP/3 for faster asset delivery.
- Leverage browser caching and CDN edge caching (Cloudflare).
- Defer or async non-critical scripts.
- Use requestAnimationFrame for smooth animations.
- Profile and optimize 3D scenes for minimal draw calls and memory usage.

## Monitoring
- Use Google Lighthouse and WebPageTest for regular audits.
- Monitor Core Web Vitals (LCP, FID, CLS) and address regressions.
- Set up performance budgets and alerts.

## References
- https://web.dev/seo/
- https://web.dev/performance/
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
