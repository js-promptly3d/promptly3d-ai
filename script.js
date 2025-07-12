// Enhanced Promptly3D Interactive Website Script
// Formspree Integration with Interactive Features

class Promptly3DApp {
    constructor() {
        this.formEndpoints = {
            users: 'https://formspree.io/f/xldnqnbo',
            vendors: 'https://formspree.io/f/xyzjrjwl',
            developers: 'https://formspree.io/f/xzzgngro'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupFormHandlers();
        this.addInteractiveEffects();
        this.setupProcessFlow();
    }
    
    setupEventListeners() {
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Logo click to scroll to top
        const logoWrapper = document.querySelector('.logo-wrapper');
        if (logoWrapper) {
            logoWrapper.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    setupProcessFlow() {
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach((step, index) => {
            const description = step.querySelector('.step-description');
            let isClicked = false;
            
            // Show on hover
            step.addEventListener('mouseenter', function() {
                if (!isClicked && description) {
                    description.classList.add('active');
                }
                
                const icon = this.querySelector('.step-icon');
                if (icon) {
                    icon.style.transform = 'translateY(-5px) scale(1.1)';
                    icon.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.4), 0 0 60px rgba(236, 72, 153, 0.3)';
                }
            });
            
            // Hide on mouse leave (unless clicked)
            step.addEventListener('mouseleave', function() {
                if (!isClicked && description) {
                    description.classList.remove('active');
                }
                
                const icon = this.querySelector('.step-icon');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.boxShadow = '';
                }
            });
            
            // Click to pin/unpin description
            step.addEventListener('click', function() {
                if (description) {
                    // Reset all other steps
                    processSteps.forEach((otherStep, otherIndex) => {
                        if (otherIndex !== index) {
                            const otherDesc = otherStep.querySelector('.step-description');
                            if (otherDesc) {
                                otherDesc.classList.remove('active');
                            }
                            otherStep.isClicked = false;
                        }
                    });
                    
                    // Toggle current step
                    isClicked = !isClicked;
                    if (isClicked) {
                        description.classList.add('active');
                    } else {
                        description.classList.remove('active');
                    }
                }
            });
            
            // Store clicked state on step element
            step.isClicked = false;
            
            // Keyboard navigation support
            step.setAttribute('tabindex', '0');
            step.setAttribute('role', 'button');
            
            step.addEventListener('keydown', function(e) {
                // Arrow key navigation
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextStep = processSteps[index + 1] || processSteps[0];
                    nextStep.focus();
                }
                
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevStep = processSteps[index - 1] || processSteps[processSteps.length - 1];
                    prevStep.focus();
                }
                
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Close descriptions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.process-step')) {
                processSteps.forEach(step => {
                    const description = step.querySelector('.step-description');
                    if (description) {
                        description.classList.remove('active');
                    }
                    step.isClicked = false;
                });
            }
        });
    }
    
    initializeAnimations() {
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            // Intersection Observer for scroll animations (desktop only)
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Special handling for process steps
                        if (entry.target.classList.contains('process-step')) {
                            setTimeout(() => {
                                entry.target.classList.add('glow-active');
                            }, 500);
                        }
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation (desktop only)
            document.querySelectorAll('.process-step, .comparison-card, .form-section').forEach(el => {
                observer.observe(el);
            });
        }
    }
    
    setupFormHandlers() {
        const forms = document.querySelectorAll('.contact-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Add real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formType = form.dataset.form;
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.btn-text');
        const spinner = submitButton.querySelector('.loading-spinner');
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        
        // Prepare form data
        const formData = new FormData(form);
        
        try {
            const response = await fetch(this.formEndpoints[formType], {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showFormSuccess(form);
                form.reset();
                
                // Add success animation
                submitButton.classList.add('success-animation');
                setTimeout(() => {
                    submitButton.classList.remove('success-animation');
                }, 2000);
                
            } else {
                const data = await response.json();
                this.showFormError(form, data.errors || ['Submission failed. Please try again.']);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, ['Network error. Please check your connection and try again.']);
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            buttonText.textContent = 'Submit Form';
        }
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Message length validation
        if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        
        // Show/hide error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class
        field.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#EF4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        // Insert error after field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.field-error');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    showFormSuccess(form) {
        // Remove existing messages
        const existingMessage = form.parentNode.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #10B981, #059669);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                margin-top: 1rem;
                text-align: center;
                box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
                animation: slideIn 0.3s ease-out;
            ">
                <strong>✓ Thank you!</strong><br>
                Your message has been sent successfully. We'll get back to you soon!
            </div>
        `;
        
        // Insert success message
        form.parentNode.appendChild(successDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    showFormError(form, errors) {
        // Remove existing messages
        const existingMessage = form.parentNode.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error';
        errorDiv.innerHTML = `
            <div style="
                background: #FEE2E2;
                color: #991B1B;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                margin-top: 1rem;
                text-align: center;
                border: 1px solid #FECACA;
                animation: slideIn 0.3s ease-out;
            ">
                <strong>⚠ Error:</strong><br>
                ${Array.isArray(errors) ? errors.join(', ') : errors}
            </div>
        `;
        
        // Insert error message
        form.parentNode.appendChild(errorDiv);
        
        // Remove message after 8 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 8000);
    }
    
    addInteractiveEffects() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn, .form-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
        
        // Add floating animation to hero elements
        this.animateFloatingElements();
        
        // Add parallax effect to hero background
        this.setupParallaxEffect();
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.6s ease-out';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Trigger animation
        requestAnimationFrame(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
        });
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.float-element');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 0.5;
            element.style.animationDelay = `${delay}s`;
            
            // Add random movement variation
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                element.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }
    
    setupParallaxEffect() {
        const hero = document.querySelector('.hero');
        const isMobile = window.innerWidth <= 768;
        
        if (!hero || isMobile) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(236, 72, 153, 0.5);
            }
        }
        
        .animate-in {
            animation: slideIn 0.6s ease-out;
        }
        
        .glow-active .step-icon {
            animation: glow 2s ease-in-out infinite;
        }
        
        .success-animation {
            animation: pulse 0.6s ease-in-out;
        }
        
        .field-error {
            animation: slideIn 0.3s ease-out;
        }
        
        .contact-form input.error,
        .contact-form textarea.error {
            border-color: #EF4444;
            background-color: #FEF2F2;
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .btn:hover .btn-glow {
            animation: glowPulse 1.5s ease-in-out infinite;
        }
        
        @keyframes glowPulse {
            0%, 100% {
                opacity: 0.3;
                transform: scale(1);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    new Promptly3DApp();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Promptly3DApp, scrollToSection };
}