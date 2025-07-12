# Vercel Deployment Complete Guide

## Overview
Vercel is the native Next.js platform, designed to enhance the Next.js experience with zero-config support for every Next.js feature. Deploy your applications to Vercel's global edge network with automatic deployments, instant rollbacks, and powerful performance optimizations.

## Quick Start Commands

```bash
# Install Vercel CLI globally
npm i -g vercel

# First-time deployment (interactive setup)
vercel

# Deploy to production
vercel --prod

# Deploy with environment variables
vercel --env NODE_ENV=production

# Pull environment variables locally
vercel env pull .env.local

# Link local project to Vercel project
vercel link
```

## Step-by-Step Deployment Process

### 1. Account Setup & Repository Connection
1. **Create Vercel Account**: Sign up at vercel.com using GitHub, GitLab, or Bitbucket
2. **Connect Repository**: Click "New Project" and select your Git provider
3. **Import Project**: Find and import your repository from the dashboard

### 2. Automatic Configuration
- Vercel automatically detects Next.js, React, Vue, and other frameworks
- Optimal build settings are configured automatically
- No manual configuration needed for most projects
- Review and adjust settings if needed before deployment

### 3. Deployment Types
- **Preview Deployments**: Automatic for every push to any branch
- **Production Deployments**: Manual trigger or automatic from main branch
- **Instant Rollbacks**: One-click rollback to previous deployments

## Project Configuration (vercel.json)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x",
      "maxDuration": 10
    }
  },
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ]
}
```

## Environment Variables Management

### Local Development
```bash
# Create .env.local for local development
NEXT_PUBLIC_API_URL=http://localhost:3000
API_SECRET_KEY=dev-secret
FORMSPREE_ID=your-form-id
```

### CLI Commands for Environment Variables
```bash
# Add environment variable
vercel env add API_SECRET_KEY production

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm API_SECRET_KEY production

# Pull environment variables to local
vercel env pull .env.local

# Pull specific environment
vercel pull --environment preview
```

### Bulk Environment Variable Management
Since Vercel CLI lacks native bulk push, use these workarounds:

**Shell Script Method:**
```bash
# Push all variables from .env file
cat .env | sed 's/=/ /' | xargs -n 2 bash -c 'echo -n $1 | vercel env add $0 production'
```

**Using Vercel API:**
```bash
# Using REST API for bulk operations
curl -X POST "https://api.vercel.com/v10/projects/your-project-name/env?upsert=true" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d @vars.json
```

## Edge Functions & Middleware

### Edge Function Example
```javascript
// api/hello.js
export const config = {
  runtime: 'edge',
  regions: ['iad1', 'sfo1']
};

export default function handler(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';
  
  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600'
      }
    }
  );
}
```

### Middleware Example
```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'custom-value');
  
  // Redirect based on conditions
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url));
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Performance Optimization

### Image Optimization
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};
```

### Caching Strategies
```javascript
// Static Generation with ISR
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 3600, // Revalidate every hour
  };
}

// Server-side Rendering with caching
export async function getServerSideProps(context) {
  const data = await fetchData();
  
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  return {
    props: { data }
  };
}
```

## Domain Configuration

### Custom Domain Setup
```bash
# Add custom domain via CLI
vercel domains add example.com

# Set up domain via dashboard
# 1. Go to project settings
# 2. Navigate to "Domains" tab
# 3. Add domain and configure DNS
```

### DNS Configuration
```dns
# DNS Records for custom domain
A    @        76.76.21.21
CNAME www      cname.vercel-dns.com
```

## Monitoring & Analytics

### Vercel Analytics Setup
```javascript
// app/layout.js (Next.js 13+)
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights
```javascript
// Add Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Advanced CLI Commands

```bash
# Development server
vercel dev

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove deployment
vercel rm deployment-url

# View project info
vercel inspect

# Switch teams/accounts
vercel switch

# Set up secrets
vercel secrets add my-secret-name "secret-value"
```

## CI/CD Integration

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Security Best Practices

### Environment Variables Security
- Use environment variables for all sensitive data
- Never commit secrets to version control
- Use different values for preview/production environments
- Regularly rotate API keys and tokens

### Security Headers
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
          }
        ]
      }
    ];
  }
};
```

## Troubleshooting Common Issues

### Build Failures
```bash
# Check build logs
vercel logs --follow

# Debug build locally
vercel dev --debug

# Clear build cache
vercel --force
```

### Environment Variable Issues
```bash
# Verify environment variables
vercel env ls

# Check if variables are being loaded
console.log(process.env.NEXT_PUBLIC_API_URL);
```

### Performance Issues
- Enable Analytics and Speed Insights
- Use Vercel's Image Optimization
- Implement proper caching strategies
- Monitor Core Web Vitals

## Integration with Claude Code & Cursor

### Setting up for Development
1. **Link Project**: Use `vercel link` to connect local project
2. **Environment Sync**: Use `vercel env pull` to sync environment variables
3. **Live Development**: Use `vercel dev` for local development with serverless functions
4. **Preview Deployments**: Every push creates a preview deployment for testing

### Cursor/VS Code Integration
```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Deploy to Vercel",
      "type": "shell",
      "command": "vercel --prod",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

## Best Practices Summary

1. **Environment Management**: Use environment variables for configuration
2. **Automatic Deployments**: Set up automatic deployments from main branch
3. **Preview Deployments**: Use preview deployments for testing
4. **Performance**: Enable Analytics, Speed Insights, and Image Optimization
5. **Security**: Configure security headers and use HTTPS
6. **Monitoring**: Monitor Core Web Vitals and deployment logs
7. **Caching**: Implement proper caching strategies for optimal performance
8. **Edge Functions**: Use edge functions for globally distributed logic
9. **Domain Management**: Configure custom domains with proper DNS
10. **CI/CD**: Set up continuous integration for automated testing and deployment