# React Project SEO Checklist

Use this checklist for every React / Vite project before deployment.

## 1. Basic HTML SEO

* [x] Set the `<html lang="en">` attribute correctly.
* [ ] Add a unique `<title>` for every important page.
* [ ] Add a unique `<meta name="description">`.
* [ ] Add `<meta name="robots" content="index, follow">` for pages that should be indexed.
* [ ] Add the correct `<link rel="canonical">`.
* [ ] Add the viewport meta tag.
* [ ] Use semantic HTML (`main`, `header`, `nav`, `section`, `article`, `footer`).

### Example

```html
<title>Project Name | Main Keyword</title>

<meta
  name="description"
  content="Short and useful description of this page."
/>

<meta name="robots" content="index, follow" />

<link
  rel="canonical"
  href="https://example.com/page"
/>
```

---

# 2. Page-Specific SEO

Every important route should have its own SEO metadata.

Examples:

```text
/
 /about
 /projects
 /services
 /blog
 /contact
```

Each page should have:

* [ ] Unique title
* [ ] Unique description
* [ ] Canonical URL
* [ ] Appropriate Open Graph metadata
* [ ] Appropriate structured data when needed

Example:

```jsx
<SEO
  title="Projects | My Website"
  description="Explore projects built using React, Node.js and AI."
  path="/projects"
/>
```

---

# 3. Favicon

Add:

```text
public/
└── favicon.png
```

Then:

```html
<link
  rel="icon"
  type="image/png"
  href="/favicon.png"
/>
```

Also consider:

```text
apple-touch-icon.png
```

---

# 4. Open Graph (OG) Tags

These control how the website appears when shared on:

* WhatsApp
* LinkedIn
* Facebook
* Discord
* Slack
* Other platforms supporting Open Graph

Add:

```html
<meta property="og:type" content="website" />

<meta
  property="og:title"
  content="Website Title"
/>

<meta
  property="og:description"
  content="Website description"
/>

<meta
  property="og:url"
  content="https://example.com/"
/>

<meta
  property="og:site_name"
  content="Website Name"
/>

<meta
  property="og:image"
  content="https://example.com/og-image.png"
/>

<meta
  property="og:image:alt"
  content="Website preview image"
/>

<meta
  property="og:image:width"
  content="1200"
/>

<meta
  property="og:image:height"
  content="630"
/>
```

---

# 5. OG Image

Create a social sharing image.

Recommended file:

```text
public/og-image.png
```

Recommended size:

```text
1200 × 630
```

Use a branded image containing things such as:

```text
Project / Company Name
Short tagline
Logo
Main visual
```

Avoid using a random generic image.

---

# 6. Twitter / X Metadata

Add:

```html
<meta
  name="twitter:card"
  content="summary_large_image"
/>

<meta
  name="twitter:title"
  content="Website Title"
/>

<meta
  name="twitter:description"
  content="Website Description"
/>

<meta
  name="twitter:image"
  content="https://example.com/og-image.png"
/>

<meta
  name="twitter:image:alt"
  content="Website preview image"
/>
```

---

# 7. Robots.txt

Create:

```text
public/robots.txt
```

Basic version:

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Check that this URL works after deployment:

```text
https://example.com/robots.txt
```

---

# 8. Sitemap

Create:

```text
public/sitemap.xml
```

Example:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>

  <url>
    <loc>https://example.com/</loc>
  </url>

  <url>
    <loc>https://example.com/about</loc>
  </url>

  <url>
    <loc>https://example.com/projects</loc>
  </url>

  <url>
    <loc>https://example.com/contact</loc>
  </url>

</urlset>
```

Check:

```text
https://example.com/sitemap.xml
```

---

# 9. Canonical URL

Every indexable page should have the preferred canonical URL.

Example:

```html
<link
  rel="canonical"
  href="https://example.com/projects"
/>
```

Avoid accidentally giving every page the homepage as its canonical URL.

---

# 10. Structured Data / JSON-LD

Use structured data when it accurately represents the page.

Possible types:

```text
WebSite
Person
Organization
Article
BlogPosting
BreadcrumbList
SoftwareApplication
Product
FAQPage
```

Example website schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Website Name",
  "url": "https://example.com/"
}
</script>
```

For a developer portfolio:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://example.com/",
  "jobTitle": "Full Stack Developer",
  "sameAs": [
    "https://github.com/username",
    "https://www.linkedin.com/in/username"
  ]
}
</script>
```

---

# 11. React SEO Library

For React applications, use a reusable SEO component.

Recommended approach:

```bash
npm install react-helmet-async
```

Create:

```text
src/components/SEO.jsx
```

Example:

```jsx
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://example.com";
const SITE_NAME = "My Website";

export default function SEO({
  title,
  description,
  path = "/",
  image = "/og-image.png",
  type = "website",
}) {
  const url = `${SITE_URL}${path}`;

  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:site_name"
        content={SITE_NAME}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:image:alt"
        content={title}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />
    </Helmet>
  );
}
```

---

# 12. HelmetProvider

In `main.jsx`:

```jsx
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

---

# 13. Use SEO Per Route

Example:

```jsx
<SEO
  title="Home | My Website"
  description="Welcome to my website."
  path="/"
/>
```

Projects:

```jsx
<SEO
  title="Projects | My Website"
  description="Explore my latest projects."
  path="/projects"
/>
```

About:

```jsx
<SEO
  title="About | My Website"
  description="Learn more about me."
  path="/about"
/>
```

---

# 14. Headings

Every important page should generally have a clear main heading.

Use:

```html
<h1>Main Page Topic</h1>

<h2>Major Section</h2>

<h3>Subsection</h3>
```

Avoid using headings only because they look visually large.

---

# 15. Image SEO

For meaningful images:

```jsx
<img
  src="/projects/civiq.png"
  alt="CiviQ civic issue reporting dashboard"
/>
```

Checklist:

* [ ] Descriptive `alt`
* [ ] Correct image dimensions
* [ ] Compress large images
* [ ] Use modern formats such as WebP/AVIF when appropriate
* [ ] Lazy-load non-critical images
* [ ] Avoid unnecessarily huge files

---

# 16. URL Structure

Prefer:

```text
https://example.com/projects
https://example.com/blog/react-seo
https://example.com/services/ai-development
```

Avoid unnecessary:

```text
https://example.com/page?id=123&data=abc
```

Keep URLs:

* [ ] Short
* [ ] Descriptive
* [ ] Stable
* [ ] Human-readable

---

# 17. Internal Linking

Make important pages reachable through normal links.

Example:

```jsx
<Link to="/projects">
  View Projects
</Link>
```

Useful internal links:

```text
Home
   ↓
About
   ↓
Projects
   ↓
Project Details
   ↓
Blog
```

Don't keep important pages accessible only through JavaScript interactions that crawlers may not discover easily.

---

# 18. React Router SEO

For every important route:

```text
/
 /about
 /projects
 /projects/project-1
 /blog
 /blog/article-1
 /contact
```

Make sure:

* [ ] Each route has a unique URL
* [ ] Each route has unique metadata
* [ ] Each important route is included in sitemap
* [ ] Direct navigation to the URL works
* [ ] Server/deployment rewrites correctly serve the React app

---

# 19. SPA / Vite SEO Consideration

A React SPA can have SEO limitations because much of the page is generated through JavaScript.

For SEO-heavy websites, consider:

```text
SSR
SSG
Prerendering
```

For simple:

```text
Portfolio
Dashboard
Internal application
Small business site
```

a Vite React SPA can still be perfectly usable, provided the important content and routes are crawlable and metadata is handled appropriately.

---

# 20. Google Search Console

After deployment:

```text
1. Create Google Search Console property
2. Verify domain
3. Submit sitemap
4. Inspect important URLs
5. Request indexing when appropriate
6. Monitor indexing
7. Monitor search queries
8. Monitor clicks
9. Monitor impressions
10. Monitor Core Web Vitals
```

Main URLs:

```text
https://example.com/robots.txt
https://example.com/sitemap.xml
```

---

# 21. Google Analytics

For projects where analytics are needed, add:

```text
Google Analytics 4
```

Track useful events such as:

```text
page_view
sign_up
login
contact_submit
project_view
button_click
purchase
```

Don't add analytics just for SEO; analytics and search ranking are separate concerns.

---

# 22. Performance

SEO checklist should also include:

* [ ] Fast initial load
* [ ] Reduce JavaScript bundle size
* [ ] Code splitting
* [ ] Lazy loading
* [ ] Image optimization
* [ ] Proper caching
* [ ] Avoid unnecessary third-party scripts
* [ ] Test mobile performance
* [ ] Test Core Web Vitals

---

# 23. Accessibility

Also check:

* [ ] Semantic HTML
* [ ] Image `alt`
* [ ] Labels for forms
* [ ] Keyboard navigation
* [ ] Good color contrast
* [ ] Visible focus states
* [ ] Proper button/link elements

Good accessibility often also improves the overall usability and structure of the site.

---

# 24. HTTPS

Production site should use:

```text
https://
```

not:

```text
http://
```

Also redirect HTTP → HTTPS where appropriate.

---

# 25. Social Preview Testing

After deployment, test:

```text
Open Graph
Twitter/X
LinkedIn
WhatsApp
Discord
Facebook
```

Check:

```text
Title
Description
Image
URL
```

If the old preview appears, social platforms may have cached the previous version.

---

# 26. SEO Validation

Before deployment, test:

```text
✓ HTML title
✓ Meta description
✓ Canonical
✓ Robots
✓ Sitemap
✓ OG image
✓ OG title
✓ OG description
✓ Twitter card
✓ Structured data
✓ Favicon
✓ Mobile responsiveness
✓ Page speed
✓ Broken links
✓ 404 handling
✓ React routes
```

---

# 27. Files to Keep in a Reusable React Template

For future projects, keep this structure:

```text
my-project/
│
├── public/
│   ├── favicon.png
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── components/
│   │   └── SEO.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── index.html
```

---

# 28. Reusable SEO Template

For every new project, fill these values:

```text
PROJECT NAME:
SITE NAME:
DOMAIN:
MAIN KEYWORD:
SECONDARY KEYWORDS:
SITE DESCRIPTION:
AUTHOR:
OG IMAGE:
FAVICON:
GITHUB:
LINKEDIN:
OTHER SOCIAL LINKS:
```

Then configure:

```text
[ ] Title
[ ] Meta Description
[ ] Canonical
[ ] Robots
[ ] Favicon
[ ] OG
[ ] Twitter/X
[ ] JSON-LD
[ ] Sitemap
[ ] Robots.txt
[ ] Search Console
[ ] Analytics
[ ] Performance
[ ] Accessibility
```

---

# 29. Things NOT to Waste Time On

Do not blindly add:

```html
<meta name="keywords" ... />
```

Do not stuff pages with keywords.

Do not create duplicate titles/descriptions for every page.

Do not hide important text purely for search engines.

Do not create fake structured data that doesn't represent the actual page.

Do not assume adding 50 meta tags will make a site rank first.

---

# 30. Final Deployment Checklist

Before saying an SEO setup is complete:

```text
SEO
├── [ ] Unique title
├── [ ] Meta description
├── [ ] Canonical
├── [ ] Robots
├── [ ] Favicon
├── [ ] OG title
├── [ ] OG description
├── [ ] OG image
├── [ ] Twitter/X card
├── [ ] JSON-LD
├── [ ] Sitemap
├── [ ] Robots.txt
│
├── Technical SEO
│   ├── [ ] HTTPS
│   ├── [ ] Mobile responsive
│   ├── [ ] Fast loading
│   ├── [ ] Core Web Vitals
│   ├── [ ] Clean URLs
│   ├── [ ] Crawlable links
│   └── [ ] Correct React routing
│
├── Content SEO
│   ├── [ ] One clear H1
│   ├── [ ] Proper H2/H3 hierarchy
│   ├── [ ] Useful content
│   ├── [ ] Internal links
│   ├── [ ] Image alt text
│   └── [ ] No keyword stuffing
│
└── Search Tools
    ├── [ ] Google Search Console
    ├── [ ] Sitemap submitted
    ├── [ ] Important URLs inspected
    └── [ ] Indexing monitored
```

## The reusable rule

For future React projects, remember this:

```text
SEO =
Metadata
+ Social previews
+ Crawlability
+ Good URLs
+ Structured data
+ Useful content
+ Internal linking
+ Performance
+ Mobile UX
+ Indexing setup
```

And for an **AI/Q&A agent project**, you can reuse the same SEO foundation while adding project-specific structured data, pages such as `/features`, `/docs`, `/pricing`, `/blog`, and `/use-cases`, and unique metadata for each route.
