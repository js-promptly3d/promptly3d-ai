# Formspree Integration Rules and Best Practices

This document provides a comprehensive guide for integrating and using Formspree within the Promptly3D project. All form implementations should adhere to these guidelines.

## 1. AJAX/Fetch Submission (Primary Method)

For this project, we use a custom JavaScript fetch request to handle form submissions. This provides a better user experience by preventing a full page reload. The implementation in `script.js` is the canonical example.

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
      showSuccessMessage(); // Custom function to show success UI
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    showErrorMessage(); // Custom function to show error UI
  }
}
```

## 2. Special Form Fields

These hidden fields can be added to the form in `index.html` to enhance functionality.

-   **Reply-To Email:** Use the user's provided email as the reply-to address.
    ```html
    <input type="email" name="email" placeholder="Your email">
    ```
-   **Custom Subject:** Set a custom subject line for email notifications.
    ```html
    <input type="hidden" name="_subject" value="New Inquiry from Promptly3D Website!">
    ```
-   **CC/BCC Recipients:** Send a copy of the submission to other addresses.
    ```html
    <input type="hidden" name="_cc" value="copy@example.com">
    ```
-   **Honeypot Spam Protection:** Use a hidden field to trap bots. This is a simple and effective spam filter.
    ```html
    <input type="text" name="_gotcha" style="display:none">
    ```

## 3. Form Validation Best Practices

1.  **Client-Side First:** Always validate on the client-side for immediate user feedback. The `script.js` file contains the project's validation logic.
2.  **HTML5 Attributes:** Use attributes like `required`, `type="email"`, `minlength` for basic validation.
3.  **Clear Error Messages:** Display clear, specific error messages next to the invalid fields.

## 4. Styling Form States

The `style.css` file should include styles for different form states to provide clear visual feedback.

```css
/* Loading/Submitting State */
form.is-submitting button {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Success Message Styling */
.form-success-message {
  background: #D1FAE5; /* Green 100 */
  color: #065F46; /* Green 800 */
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

/* Error Message Styling */
.form-error-message {
  background: #FEE2E2; /* Red 100 */
  color: #991B1B; /* Red 800 */
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

/* Field Validation State */
input:invalid, textarea:invalid {
  border-color: #F87171; /* Red 400 */
}
```

## 5. Future-Proofing (React/Next.js)

While not used in the current static site, the following patterns should be adopted if the project ever evolves into a React/Next.js application.

-   **Library:** `@formspree/react`
-   **Hook:** `useForm`
-   **Environment Variables:** Form IDs should be stored in `.env.local` as `NEXT_PUBLIC_FORMSPREE_FORM_ID`.
