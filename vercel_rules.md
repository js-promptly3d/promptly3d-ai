# Vercel Development Rules and Best Practices

## Project Structure
- Use Next.js for optimal Vercel integration
- Place static files in `public/` directory
- Use `pages/` or `app/` directory for routing (Next.js 13+)
- Configure project settings in `vercel.json`

## vercel.json Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "pages/api/*.js": {
      "maxDuration": 10
    }
  },
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## Environment Variables
- Define in `.env.local` for local development
- Add to Vercel dashboard for production
- Access with `process.env.VARIABLE_NAME`
- Prefix with `NEXT_PUBLIC_` for client-side access

## Deployment Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

## Static Site Generation (SSG)
```jsx
// pages/index.js or app/page.js
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 3600 // ISR: revalidate every hour
  };
}
```

## API Routes
```javascript
// pages/api/contact.js or app/api/contact/route.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle form submission
    const { email, message } = req.body;
    // Process data
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

## Edge Functions
```javascript
// middleware.js
export const config = {
  matcher: '/api/:path*',
};

export function middleware(request) {
  // Run code at the edge
  return Response.json({ message: 'Hello from the edge!' });
}
```

## Performance Best Practices
1. Use `next/image` for automatic image optimization
2. Enable automatic static optimization
3. Implement proper caching headers
4. Use dynamic imports for code splitting
5. Minimize JavaScript bundle size
6. Enable compression
7. Use CDN for static assets

## Domain Configuration
- Add custom domains in Vercel dashboard
- Automatic SSL certificates
- Configure DNS records (A/CNAME)
- Support for wildcard domains
- Automatic www redirects

## Monitoring and Analytics
- Built-in Web Vitals monitoring
- Real User Monitoring (RUM)
- Custom analytics integration
- Error tracking and logging
- Performance insights
