# Static Website Development with Vercel and Formspree

## Quick Start Guide

### 1. Project Setup
```bash
# Create Next.js project
npx create-next-app@latest my-static-site --typescript --tailwind --app

# Navigate to project
cd my-static-site

# Install Formspree
npm install @formspree/react

# Install Vercel CLI
npm install -g vercel
```

### 2. Project Structure
```
my-static-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ContactForm.tsx
├── public/
│   ├── images/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
└── vercel.json
```

### 3. Environment Configuration
```bash
# .env.local
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-formspree-form-id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Contact Form Component
```tsx
// components/ContactForm.tsx
'use client';

import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID!);

  if (state.succeeded) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-100 rounded-lg">
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank you!</h3>
        <p className="text-green-700">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### 5. Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/newsletter/route.ts": {
      "maxDuration": 10
    }
  }
}
```

### 6. Deployment
```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_FORMSPREE_FORM_ID
```

## Best Practices Checklist

### Performance
- [ ] Use Next.js Image component for images
- [ ] Enable static generation where possible
- [ ] Implement proper meta tags for SEO
- [ ] Minimize JavaScript bundle size
- [ ] Use proper caching headers
- [ ] Enable gzip compression
- [ ] Lazy load non-critical resources

### Security
- [ ] Store sensitive data in environment variables
- [ ] Implement CORS properly
- [ ] Use HTTPS everywhere
- [ ] Sanitize form inputs
- [ ] Implement rate limiting for forms
- [ ] Add spam protection (honeypot/captcha)
- [ ] Validate data on both client and server

### Forms
- [ ] Add proper validation
- [ ] Show loading states
- [ ] Handle errors gracefully
- [ ] Provide success feedback
- [ ] Make forms accessible (ARIA labels)
- [ ] Test on mobile devices
- [ ] Add file upload support if needed

### SEO
- [ ] Add proper meta tags
- [ ] Implement Open Graph tags
- [ ] Create XML sitemap
- [ ] Add robots.txt
- [ ] Use semantic HTML
- [ ] Implement structured data
- [ ] Optimize page load speed

### Development Workflow
- [ ] Use TypeScript for type safety
- [ ] Implement ESLint and Prettier
- [ ] Set up git hooks with Husky
- [ ] Write tests for critical paths
- [ ] Use GitHub Actions for CI/CD
- [ ] Monitor with Vercel Analytics
- [ ] Set up error tracking

## Common Patterns

### Newsletter Signup Form
```tsx
function NewsletterForm() {
  const [state, handleSubmit] = useForm("newsletter-form-id");

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className="flex-1 px-3 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={state.submitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Subscribe
      </button>
    </form>
  );
}
```

### Multi-Step Form
```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [state, handleSubmit] = useForm("form-id");

  const handleStepSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit({ ...formData, ...data });
    }
  };

  return (
    <div>
      {step === 1 && <Step1 onSubmit={handleStepSubmit} />}
      {step === 2 && <Step2 onSubmit={handleStepSubmit} />}
      {step === 3 && <Step3 onSubmit={handleStepSubmit} />}
    </div>
  );
}
```

## Troubleshooting

### Common Issues
1. **Form not submitting**: Check form ID and network requests
2. **Environment variables not working**: Prefix with NEXT_PUBLIC_
3. **Deployment failing**: Check build logs in Vercel dashboard
4. **Forms not styled**: Ensure Tailwind is properly configured
5. **Slow page loads**: Enable static generation and optimize images

### Debug Commands
```bash
# Check environment variables
vercel env ls

# View deployment logs
vercel logs

# Test build locally
vercel build

# Run development server
npm run dev
```
