# Deployment Guide for Promptly3D

## Quick Deployment to Vercel

### Prerequisites
- Node.js 16+ installed
- Git repository set up
- Vercel account with credentials

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Set Up Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your actual credentials:
   ```env
   VERCEL_USER_ID=3WVtil5K0uwdlNpfDCu40tgW
   VERCEL_ACCESS_TOKEN=np5iiv237rdlsz9tWkhLnhKN
   ```

### Step 3: Login to Vercel
```bash
vercel login
```
When prompted, use your Vercel credentials.

### Step 4: Deploy to Production
```bash
# For production deployment
npm run deploy

# Or directly with Vercel CLI
vercel --prod
```

### Step 5: Deploy Preview (Optional)
```bash
# For preview deployment
npm run deploy:preview

# Or directly with Vercel CLI
vercel
```

## Manual Deployment Steps

### Option 1: Using Vercel CLI
1. Navigate to your project directory
2. Run `vercel` for preview or `vercel --prod` for production
3. Follow the prompts to configure your project

### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings (if needed)
5. Deploy

## Project Configuration

### Static Site Settings
- **Framework**: Static HTML/CSS/JS
- **Build Command**: None required (static files)
- **Output Directory**: `.` (root directory)
- **Install Command**: `npm install` (optional)

### Environment Variables in Vercel Dashboard
If you prefer to set environment variables through the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables there instead of using CLI

## Custom Domain Setup

### Add Custom Domain
1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., promptly3d.ai)
4. Follow DNS configuration instructions

### DNS Configuration
- Add CNAME record pointing to `cname.vercel-dns.com`
- Or add A record pointing to Vercel's IP addresses

## Troubleshooting

### Common Issues
1. **Build fails**: Check if all files are committed to git
2. **404 errors**: Ensure `vercel.json` routing is configured correctly
3. **Assets not loading**: Check file paths and case sensitivity

### Security Notes
- Never commit `.env.local` or actual credentials to git
- Use environment variables for all sensitive data
- Regularly rotate access tokens

## Performance Optimization

### For Production
- Ensure all assets are optimized
- Use proper caching headers (configured in `vercel.json`)
- Monitor Core Web Vitals in Vercel Analytics

### Monitoring
- Enable Vercel Analytics for performance monitoring
- Set up error tracking if needed
- Monitor deployment logs for issues

## Continuous Deployment

### Automatic Deployments
- Connect your Git repository to Vercel
- Every push to main branch will trigger production deployment
- Feature branches create preview deployments

### Branch Protection
- Set up branch protection rules
- Require pull request reviews
- Enable automatic deployments only after approval 