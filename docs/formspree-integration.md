# Formspree Integration Complete Guide

## Overview
Formspree is a versatile backend service that simplifies form handling for developers with HTML, JavaScript, and React forms. It handles form processing and storage without requiring server-side code, making it perfect for static sites and JAMstack applications.

## Quick Setup

### 1. Account & Form Creation
1. **Sign Up**: Create account at [formspree.io](https://formspree.io)
2. **Create Form**: Click "+New form" button
3. **Configure**: Set form name and recipient email
4. **Get Form ID**: Copy the 8-character "hashid" from endpoint URL

### 2. Installation (For React/Next.js)
```bash
# Install the official React library
npm install @formspree/react
```

## Basic HTML Implementation

### Simple Contact Form
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <label for="email">Email Address:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="5" required></textarea>
  
  <!-- Honeypot field for spam protection -->
  <input type="text" name="_gotcha" style="display:none" tabindex="-1">
  
  <!-- Custom configurations -->
  <input type="hidden" name="_next" value="https://yoursite.com/thanks">
  <input type="hidden" name="_subject" value="New Contact Form Submission">
  <input type="hidden" name="_cc" value="team@yourcompany.com">
  
  <button type="submit">Send Message</button>
</form>
```

### Advanced HTML Form with Validation
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required minlength="2" maxlength="50">
  </div>
  
  <div class="form-group">
    <label for="email">Email Address:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="phone">Phone Number:</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
  </div>
  
  <div class="form-group">
    <label for="subject">Subject:</label>
    <select id="subject" name="subject" required>
      <option value="">Select a subject</option>
      <option value="general">General Inquiry</option>
      <option value="support">Support Request</option>
      <option value="sales">Sales Question</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="6" required minlength="10" maxlength="1000"></textarea>
  </div>
  
  <div class="form-group">
    <label for="attachment">Attachment:</label>
    <input type="file" id="attachment" name="attachment" accept=".pdf,.doc,.docx,.jpg,.png">
  </div>
  
  <!-- Spam protection -->
  <input type="text" name="_gotcha" style="display:none" tabindex="-1">
  
  <!-- Form configuration -->
  <input type="hidden" name="_next" value="https://yoursite.com/thank-you">
  <input type="hidden" name="_subject" value="New Contact Form Submission">
  <input type="hidden" name="_template" value="box">
  
  <button type="submit" class="submit-btn">Send Message</button>
</form>
```

## JavaScript/AJAX Implementation

### Modern Fetch API Integration
```javascript
class FormspreeHandler {
  constructor(formId) {
    this.formId = formId;
    this.endpoint = `https://formspree.io/f/${formId}`;
    this.init();
  }
  
  init() {
    // Handle all Formspree forms on the page
    document.querySelectorAll('form[data-formspree]').forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate form before submission
    if (!this.validateForm(form)) {
      return;
    }
    
    // Show loading state
    this.setLoadingState(form, true);
    
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        this.handleSuccess(form);
      } else {
        const data = await response.json();
        this.handleError(form, data.errors || ['Submission failed']);
      }
    } catch (error) {
      this.handleError(form, ['Network error. Please try again.']);
    } finally {
      this.setLoadingState(form, false);
    }
  }
  
  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'This field is required');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });
    
    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        this.showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  setLoadingState(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.dataset.originalText || submitButton.textContent;
    
    if (isLoading) {
      submitButton.dataset.originalText = originalText;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      form.classList.add('form-loading');
    } else {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      form.classList.remove('form-loading');
    }
  }
  
  handleSuccess(form) {
    form.reset();
    this.showMessage(form, 'success', 'Thank you! Your message has been sent.');
    
    // Optional: Redirect after success
    const redirectUrl = form.querySelector('[name="_next"]')?.value;
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000);
    }
  }
  
  handleError(form, errors) {
    const errorMessage = Array.isArray(errors) 
      ? errors.map(e => e.message || e).join(', ')
      : 'There was an error submitting your form. Please try again.';
    
    this.showMessage(form, 'error', errorMessage);
  }
  
  showMessage(form, type, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.textContent = message;
    
    // Insert message after form
    form.insertAdjacentElement('afterend', messageDiv);
    
    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        messageDiv.remove();
      }, 5000);
    }
  }
  
  showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error class
    field.classList.add('field-error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error-message';
    errorDiv.textContent = message;
    
    // Insert error after field
    field.insertAdjacentElement('afterend', errorDiv);
  }
  
  clearFieldError(field) {
    field.classList.remove('field-error');
    const errorMessage = field.parentNode.querySelector('.field-error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// Initialize Formspree handler
document.addEventListener('DOMContentLoaded', () => {
  new FormspreeHandler('YOUR_FORM_ID');
});
```

## React/Next.js Implementation

### Basic React Hook Usage
```jsx
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  
  if (state.succeeded) {
    return (
      <div className="success-message">
        <h3>Thank you!</h3>
        <p>Your message has been sent successfully.</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
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
          rows="5" 
          required 
        />
        <ValidationError 
          prefix="Message" 
          field="message" 
          errors={state.errors} 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={state.submitting}
        className="submit-button"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
      
      <ValidationError errors={state.errors} />
    </form>
  );
}

export default ContactForm;
```

### Advanced React Implementation with Custom Validation
```jsx
import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

function AdvancedContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create FormData object
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    
    await handleSubmit(formDataObj);
    setIsSubmitting(false);
  };
  
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  }, [state.succeeded]);
  
  if (state.succeeded) {
    return (
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you soon.</p>
        <button 
          onClick={() => window.location.reload()}
          className="new-message-btn"
        >
          Send Another Message
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={onSubmit} className="advanced-contact-form">
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter your full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email address"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="support">Support Request</option>
          <option value="sales">Sales Question</option>
          <option value="partnership">Partnership Opportunity</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className={errors.message ? 'error' : ''}
          placeholder="Enter your message (minimum 10 characters)"
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting || state.submitting}
        className="submit-button"
      >
        {isSubmitting || state.submitting ? (
          <>
            <span className="spinner"></span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
      
      <ValidationError errors={state.errors} />
    </form>
  );
}

export default AdvancedContactForm;
```

## Environment Variables Setup

### Local Development (.env.local)
```env
# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_ID=your-8-char-form-id
FORMSPREE_API_KEY=your-api-key-for-server-side

# For multiple forms
NEXT_PUBLIC_CONTACT_FORM_ID=contact-form-id
NEXT_PUBLIC_NEWSLETTER_FORM_ID=newsletter-form-id
NEXT_PUBLIC_SUPPORT_FORM_ID=support-form-id
```

### Vercel Environment Variables
```bash
# Add to Vercel project
vercel env add NEXT_PUBLIC_FORMSPREE_ID production
vercel env add FORMSPREE_API_KEY production
```

## Advanced Features

### File Upload Handling
```jsx
import { useState } from 'react';
import { useForm } from '@formspree/react';

function FileUploadForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Add files to form data
    files.forEach((file, index) => {
      formData.append(`attachment_${index}`, file);
    });
    
    await handleSubmit(formData);
  };
  
  return (
    <form onSubmit={onSubmit} className="file-upload-form">
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea name="message" required />
      </div>
      
      <div
        className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file-upload" className="file-upload-label">
          <div className="upload-icon">📁</div>
          <p>Drag files here or click to browse</p>
          <p className="file-info">Supports: PDF, DOC, DOCX, JPG, PNG, GIF</p>
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="file-list">
          <h4>Selected Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                className="remove-file"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <button type="submit" disabled={state.submitting}>
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## Styling Form States

### CSS for Interactive Forms
```css
/* Form Container */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

/* Input Styles */
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Error States */
.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Loading Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success/Error Messages */
.form-message {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.form-message--success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.form-message--error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Success Container */
.success-container {
  text-align: center;
  padding: 3rem 2rem;
  background: #f9fafb;
  border-radius: 12px;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1rem;
}

/* File Upload Styles */
.file-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.file-upload-area:hover,
.file-upload-area.drag-active {
  border-color: #667eea;
  background: #f8faff;
}

.file-input {
  display: none;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.file-list {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.file-item:last-child {
  border-bottom: none;
}

.remove-file {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contact-form {
    padding: 1rem;
    margin: 1rem;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    padding: 0.6rem;
  }
  
  .submit-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
```

## Security Best Practices

### Spam Protection
```html
<!-- Honeypot field (hidden from users) -->
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">

<!-- Add CAPTCHA for high-traffic forms -->
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

### Input Sanitization
```javascript
// Client-side validation and sanitization
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .substring(0, 1000); // Limit length
};

// Server-side validation (if using custom backend)
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

## Testing & Debugging

### Form Testing Checklist
```javascript
// Test form submission
const testFormSubmission = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message'
  };
  
  const formData = new FormData();
  Object.keys(testData).forEach(key => {
    formData.append(key, testData[key]);
  });
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Form submission test:', response.ok ? 'PASSED' : 'FAILED');
  } catch (error) {
    console.error('Form submission test FAILED:', error);
  }
};
```

### Common Issues & Solutions

1. **CORS Issues**: Use the official Formspree library or ensure proper headers
2. **Validation Errors**: Check field names match Formspree requirements
3. **File Upload Limits**: Formspree has file size limits (10MB per file)
4. **Rate Limiting**: Implement client-side rate limiting for high-traffic sites

## Integration with Vercel

### Vercel Integration Setup
1. **Install Integration**: Go to [Formspree Vercel Integration](https://vercel.com/integrations/formspree)
2. **Connect Projects**: Link your Vercel projects to Formspree
3. **Automatic Environment Variables**: Form IDs are automatically added to Vercel

### Environment Variables for Vercel
```bash
# Add to Vercel project settings
NEXT_PUBLIC_FORMSPREE_ID=your-form-id
FORMSPREE_API_KEY=your-api-key
```

## Performance Optimization

### Lazy Loading Forms
```jsx
import { lazy, Suspense } from 'react';

const ContactForm = lazy(() => import('./ContactForm'));

function App() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactForm />
    </Suspense>
  );
}
```

### Form Analytics
```javascript
// Track form interactions
const trackFormEvent = (action, formName) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'Form',
      event_label: formName
    });
  }
};

// Usage
trackFormEvent('form_start', 'contact_form');
trackFormEvent('form_submit', 'contact_form');
trackFormEvent('form_success', 'contact_form');
```

## Best Practices Summary

1. **Security**: Always use honeypot fields and validate inputs
2. **User Experience**: Provide clear feedback and error messages
3. **Accessibility**: Use proper labels and ARIA attributes
4. **Performance**: Implement lazy loading and optimize bundle size
5. **Testing**: Test forms thoroughly across devices and browsers
6. **Environment Variables**: Use environment variables for form IDs
7. **Error Handling**: Gracefully handle network errors and validation failures
8. **Mobile Optimization**: Ensure forms work well on mobile devices
9. **Spam Protection**: Implement multiple layers of spam protection
10. **Analytics**: Track form performance and user interactions