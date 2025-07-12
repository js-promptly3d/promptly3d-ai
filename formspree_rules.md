# Formspree Integration Rules and Best Practices

## Basic HTML Form Setup
```html
<form action="https://formspree.io/f/{your-form-id}" method="POST">
  <!-- Required: Email field -->
  <input type="email" name="email" placeholder="Your email" required>
  
  <!-- Message field -->
  <textarea name="message" placeholder="Your message" required></textarea>
  
  <!-- Optional: Name field -->
  <input type="text" name="name" placeholder="Your name">
  
  <!-- Submit button -->
  <button type="submit">Send Message</button>
</form>
```

## React Integration with @formspree/react
```bash
npm install @formspree/react
```

```jsx
// ContactForm.jsx
import { useForm } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("your-form-id");
  
  if (state.succeeded) {
    return (
      <div className="success-message">
        <h3>Thank you!</h3>
        <p>Your message has been sent successfully.</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
      </div>
      
      <button type="submit" disabled={state.submitting}>
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {state.errors && (
        <p className="error-message">
          There was an error submitting your form. Please try again.
        </p>
      )}
    </form>
  );
}
```

## Next.js Integration
```jsx
// pages/contact.js or app/contact/page.js
import { FormspreeProvider } from '@formspree/react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <FormspreeProvider project="your-project-id">
      <div className="container">
        <h1>Contact Us</h1>
        <ContactForm />
      </div>
    </FormspreeProvider>
  );
}
```

## Special Form Fields

### Reply-To Email
```html
<input type="hidden" name="_replyto" value="user@email.com">
<!-- Or use email field as reply-to -->
<input type="email" name="email" placeholder="Your email">
```

### Custom Subject
```html
<input type="hidden" name="_subject" value="New Contact Form Submission">
<!-- Or dynamic subject -->
<input type="text" name="_subject" placeholder="Subject">
```

### CC Recipients
```html
<input type="hidden" name="_cc" value="copy@example.com,another@example.com">
```

### Redirect After Submission
```html
<input type="hidden" name="_next" value="https://yoursite.com/thank-you">
```

### Honeypot Spam Protection
```html
<input type="text" name="_gotcha" style="display:none">
```

## AJAX/Fetch Submission
```javascript
async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  try {
    const response = await fetch('https://formspree.io/f/{form-id}', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      form.reset();
      showSuccessMessage();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    showErrorMessage();
  }
}
```

## File Upload Support
```html
<form action="https://formspree.io/f/{form-id}" method="POST" enctype="multipart/form-data">
  <input type="file" name="attachment" accept=".pdf,.doc,.docx">
  <button type="submit">Submit</button>
</form>
```

## Form Validation Best Practices
1. Always validate on client-side for UX
2. Use HTML5 validation attributes
3. Implement custom validation for complex rules
4. Show clear error messages
5. Validate file types and sizes
6. Sanitize user input

## Styling Form States
```css
/* Loading state */
form.submitting button {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success state */
.success-message {
  background: #4CAF50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}

/* Error state */
.error-message {
  background: #f44336;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}

/* Field validation */
input:invalid {
  border-color: #f44336;
}

input:valid {
  border-color: #4CAF50;
}
```

## Environment Variables
```javascript
// Store form ID in environment variable
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

// Use in component
const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
```

## Testing Forms
1. Test in development with Formspree test mode
2. Verify email delivery
3. Test validation rules
4. Check spam protection
5. Test file uploads if applicable
6. Verify success/error states
7. Test on mobile devices
