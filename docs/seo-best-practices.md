
# SEO Best Practices

This document outlines the rules for ensuring the Promptly3D website is optimized for search engines. Good SEO is critical for discoverability and attracting organic traffic.

## 1. HTML Head

- **Rule:** Every page must have a unique and descriptive `<title>` tag, ideally between 50-60 characters.
- **Rule:** Every page must have a `<meta name="description">` tag with a unique and compelling description, ideally between 150-160 characters.
- **Guideline:** Use relevant keywords in the title and description, but avoid keyword stuffing.
- **Rule:** Implement Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) for better social media sharing.
- **Rule:** Implement Twitter Card tags (`twitter:card`, `twitter:title`, etc.) for better Twitter sharing.
- **Rule:** A canonical URL (`<link rel="canonical">`) must be specified on every page to avoid duplicate content issues.

## 2. Content and Structure

- **Rule:** Use a logical heading structure with a single `<h1>` per page, followed by `<h2>`, `<h3>`, etc.
- **Guideline:** Use semantic HTML5 tags (`<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`) to give context to search engines.
- **Rule:** All images must have descriptive `alt` attributes.
- **Guideline:** Use internal links to connect related content on the site.

## 3. Structured Data

- **Guideline:** Use Schema.org structured data (in JSON-LD format) to provide more context to search engines. `SoftwareApplication` or `Service` schemas may be relevant.

## 4. Accessibility

- **Rule:** The website must be accessible. This not only helps users with disabilities but is also a positive signal for SEO.
- **Guideline:** Ensure all interactive elements are keyboard-navigable and have clear focus states.

## 5. Technical SEO

- **Rule:** The site must have a `robots.txt` file to guide search engine crawlers.
- **Rule:** A `sitemap.xml` file must be generated and submitted to search engines.
- **Guideline:** Ensure the website is mobile-friendly.
