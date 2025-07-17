// Debug logging for production
console.log('Script.js loaded');
console.log('THREE available:', typeof THREE !== 'undefined');
console.log('GSAP available:', typeof gsap !== 'undefined');

// Check if required libraries are loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js failed to load!');
    document.body.innerHTML += '<div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: red; color: white; padding: 20px; border-radius: 5px; z-index: 9999;">Error: Three.js library failed to load. Please refresh the page.</div>';
}

if (typeof gsap === 'undefined') {
    console.error('GSAP failed to load!');
}

// Check for Three.js examples classes
if (typeof THREE !== 'undefined') {
    console.log('OrbitControls available:', typeof THREE.OrbitControls !== 'undefined');
    console.log('GLTFLoader available:', typeof THREE.GLTFLoader !== 'undefined');
}

// Enhanced Promptly3D Interactive Website Script
// Formspree Integration with Interactive Features

class Promptly3DApp {
    constructor() {
        this.formEndpoints = {
            user: 'https://formspree.io/f/xldnqnbo',
            vendor: 'https://formspree.io/f/xyzjrjwl', 
            developer: 'https://formspree.io/f/xzzgngro',
            investor: 'https://formspree.io/f/mnnzqeop'
        };
        
        // 3D Properties
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.animationMixer = null;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initialize3DViewer();
        this.initializeAnimations();
        this.setupFormHandlers();
        this.addInteractiveEffects();
    }
    
    initialize3DViewer() {
        const container = document.getElementById('three-d-canvas');
        if (!container) return;
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5fb);

        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 1, 5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight);

        // Try to load a model, but create fallback if it fails
        if (typeof THREE.GLTFLoader !== 'undefined') {
            const loader = new THREE.GLTFLoader();
            loader.load('models/example.glb', 
                (gltf) => {
                    this.model = gltf.scene;
                    this.model.scale.set(1, 1, 1);
                    this.model.position.set(0, 0, 0);
                    this.model.castShadow = true;
                    this.model.receiveShadow = true;
                    this.scene.add(this.model);

                    if (gltf.animations && gltf.animations.length) {
                        this.animationMixer = new THREE.AnimationMixer(this.model);
                        const action = this.animationMixer.clipAction(gltf.animations[0]);
                        action.play();
                    }
                },
                undefined,
                (error) => {
                    console.log('GLB model not found, creating fallback 3D object');
                    this.createFallback3DModel();
                }
            );
        } else {
            this.createFallback3DModel();
        }
        
        this.setupViewerControls();

        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.animate();
    }

    onWindowResize() {
        const container = document.getElementById('three-d-canvas');
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        
        // Adjust pixel ratio for mobile performance
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.renderer.setPixelRatio(pixelRatio);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        if (this.animationMixer) {
            this.animationMixer.update(this.clock.getDelta());
        }
        if (this.model && this.autoRotate) {
            this.model.rotation.y += this.autoRotateSpeed;
        }
        this.renderer.render(this.scene, this.camera);
    }
    
    setupEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
        
        document.querySelector('.logo-link')?.addEventListener('click', (e) => {
                e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initializeAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Set default ease for smoother animations
        gsap.defaults({ ease: "power2.out", duration: 0.8 });
        
        // Disable heavy animations on mobile for better performance
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            gsap.defaults({ duration: 0.4 });
        }

        // Enhanced hero animations with parallax
        const heroTl = gsap.timeline();
        heroTl
            .from('.hero-content', { 
                opacity: 0, 
                y: 80, 
                duration: 1.2, 
                ease: 'power3.out' 
            })
            .from('.three-d-viewer-container', {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: 'back.out(1.7)'
            }, "-=0.8")
            .from('.hero-form-wrapper', { 
                opacity: 0, 
                x: 100, 
                duration: 1, 
                ease: 'power3.out'
            }, "-=0.6");

        // Parallax effect for hero
        gsap.to('.hero-content', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // Section titles with magnetic effect
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { 
                    opacity: 0, 
                    y: 50,
                    rotationX: -15,
                    transformPerspective: 400
                },
                { 
                    opacity: 1, 
                    y: 0,
                    rotationX: 0,
                    duration: 1, 
                    ease: 'power3.out',
                    scrollTrigger: { 
                        trigger: title, 
                        start: 'top 90%', 
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    } 
                }
            );
        });

        // Enhanced feature blocks with stagger
        gsap.utils.toArray('.feature-block').forEach((block, i) => {
            const content = block.querySelector('.feature-content');
            const visual = block.querySelector('.feature-visual');
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: block,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo(content, 
                { opacity: 0, x: i % 2 === 0 ? -80 : 80, rotationY: i % 2 === 0 ? -15 : 15 },
                { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: 'power3.out' }
            )
            .fromTo(visual, 
                { opacity: 0, x: i % 2 === 0 ? 80 : -80, scale: 0.8 },
                { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 
                "-=0.6"
            );
        });

        // Magnetic step cards
        gsap.utils.toArray('.step-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { 
                    opacity: 0, 
                    y: 80, 
                    scale: 0.8,
                    rotationY: -20
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotationY: 0,
                    duration: 1, 
                    ease: 'back.out(1.7)',
                    delay: i * 0.15,
                    scrollTrigger: { 
                        trigger: card, 
                        start: 'top 85%', 
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Compare columns with wave effect
        const compareContainer = document.querySelector('.compare-table');
        if (compareContainer) {
            gsap.fromTo('.compare-column', 
                { 
                    opacity: 0, 
                    y: 100, 
                    scale: 0.9,
                    rotationX: -20
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotationX: 0,
                    duration: 1, 
                    ease: 'power3.out',
                    stagger: {
                        amount: 0.8,
                        from: "start"
                    },
                    scrollTrigger: { 
                        trigger: compareContainer, 
                        start: 'top 80%', 
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // CTA section with bounce
        gsap.fromTo('.cta-content', 
            { 
                opacity: 0, 
                scale: 0.8,
                y: 50
            },
            { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                duration: 1.2, 
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: { 
                    trigger: '.cta-section', 
                    start: 'top 85%', 
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Smooth scroll enhancement
        this.setupSmoothScroll();

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
    }

    setupSmoothScroll() {
        // Custom smooth scroll with momentum
        let isScrolling = false;
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target && !isScrolling) {
                    isScrolling = true;
                    
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: "power2.inOut",
                        onComplete: () => {
                            isScrolling = false;
                        }
                    });
                }
            });
        });
    }

    addInteractiveEffects() {
        document.querySelectorAll('.btn, button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (!button.classList.contains('no-ripple')) this.createRipple(e, button);
            });
        });

        document.querySelectorAll('.feature-block').forEach(block => {
            block.addEventListener('mouseenter', () => gsap.to(block.querySelector('.feature-demo-box'), { scale: 1.02, boxShadow: '0 25px 50px -12px rgba(139,92,246,0.25)', duration: 0.3 }));
            block.addEventListener('mouseleave', () => gsap.to(block.querySelector('.feature-demo-box'), { scale: 1, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', duration: 0.3 }));
        });

        document.querySelectorAll('.step-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.03, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', duration: 0.3 });
                gsap.to(card.querySelector('.step-icon-box'), { rotate: 5, duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, boxShadow: 'none', duration: 0.3 });
                gsap.to(card.querySelector('.step-icon-box'), { rotate: 0, duration: 0.3 });
            });
        });

        document.querySelectorAll('.compare-column:not(.featured)').forEach(column => {
            column.addEventListener('mouseenter', () => gsap.to(column, { scale: 1.02, duration: 0.3 }));
            column.addEventListener('mouseleave', () => gsap.to(column, { scale: 1, duration: 0.3 }));
        });
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formType = form.dataset.form;
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.btn-text');
        const spinner = submitButton.querySelector('.loading-spinner');
        
        if (!this.validateForm(form)) return;
        
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        if (spinner) {
            spinner.style.display = 'inline-block';
        }
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(this.formEndpoints[formType], {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                this.showFormSuccess(form);
                form.reset();
                submitButton.classList.add('success-animation');
                setTimeout(() => submitButton.classList.remove('success-animation'), 2000);
            } else {
                const data = await response.json();
                this.showFormError(form, data.errors || ['Submission failed. Please try again.']);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, ['Network error. Please check your connection and try again.']);
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            buttonText.textContent = 'Get Started Free';
            if (spinner) {
                spinner.style.display = 'none';
            }
        }
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) isValid = false;
        });
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        return isValid;
    }
    
    showFieldError(field, message) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#EF4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.field-error');
        if (errorMessage) errorMessage.remove();
    }
    
    showFormSuccess(form) {
        const existingMessage = form.parentNode.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success';
        successDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 1rem 1.5rem; border-radius: 12px; margin-top: 1rem; text-align: center; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3); animation: slideIn 0.3s ease-out;">
                <strong>✓ Thank you!</strong><br>
                Your message has been sent successfully. We'll get back to you soon!
            </div>
        `;
        form.parentNode.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }
    
    showFormError(form, errors) {
        const existingMessage = form.parentNode.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error';
        errorDiv.innerHTML = `
            <div style="background: #FEE2E2; color: #991B1B; padding: 1rem 1.5rem; border-radius: 12px; margin-top: 1rem; text-align: center; border: 1px solid #FECACA; animation: slideIn 0.3s ease-out;">
                <strong>⚠ Error:</strong><br>
                ${Array.isArray(errors) ? errors.join(', ') : errors}
            </div>
        `;
        form.parentNode.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 8000);
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
        requestAnimationFrame(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
        });
        setTimeout(() => ripple.remove(), 600);
    }

    setupFormHandlers() {
        const form = document.getElementById('hero-form');
        if (!form) return;
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    createFallback3DModel() {
        // Remove any existing model
        if (this.model) {
            this.scene.remove(this.model);
        }
        // Create an impressive realistic gear as the hero demo
        this.createShowpieceRealisticGear();
        this.createFeaturePreviews();
    }

    createShowpieceRealisticGear() {
        this.model = new THREE.Group();

        // Material for the gear - solid dark purple as requested
        const gearMaterial = new THREE.MeshStandardMaterial({
            color: 0x4C1D95, // Dark purple color
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 0.5
        });

        // Create all gear components
        this.createRealisticGearBody(gearMaterial);
        this.createRealisticGearTeeth(gearMaterial);
        this.createRealisticHub(gearMaterial);
        this.createRealisticMountingHoles(gearMaterial);

        // Base shadow plane for contact shadow
        const planeGeo = new THREE.CircleGeometry(3, 64);
        const planeMat = new THREE.ShadowMaterial({ opacity: 0.3 });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.5;
        plane.receiveShadow = true;
        this.scene.add(plane);

        // Professional lighting setup
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
        keyLight.position.set(4, 6, 4);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        this.scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-4, 2, 4);
        this.scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
        rimLight.position.set(0, 4, -4);
        this.scene.add(rimLight);

        this.scene.add(this.model);

        // Slow, professional rotation
        this.autoRotateSpeed = 0.003;
    }
    
    createRealisticGearBody(material) {
        // Main gear body - standard industrial proportions
        const gearBodyGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.25, 64);
        const gearBody = new THREE.Mesh(gearBodyGeometry, material);
        gearBody.position.set(0, 0, 0);
        gearBody.castShadow = true;
        gearBody.receiveShadow = true;
        this.model.add(gearBody);
    }
    
    createRealisticGearTeeth(material) {
        // Professional gear teeth - 32 teeth (realistic count)
        const numTeeth = 32;
        const pitchRadius = 1.6;
        const outerRadius = 1.8;
        const rootRadius = 1.4;
        const toothThickness = 0.25;
        
        for (let i = 0; i < numTeeth; i++) {
            const angle = (i / numTeeth) * Math.PI * 2;
            
            // Create realistic involute tooth shape
            const toothGeometry = new THREE.BoxGeometry(0.08, toothThickness, 0.4);
            const tooth = new THREE.Mesh(toothGeometry, material);
            
            // Position tooth on pitch circle
            const x = Math.cos(angle) * pitchRadius;
            const z = Math.sin(angle) * pitchRadius;
            tooth.position.set(x, 0, z);
            tooth.rotation.y = angle + Math.PI / 2;
            tooth.castShadow = true;
            this.model.add(tooth);
            
            // Add tooth face detail
            const toothFaceGeometry = new THREE.BoxGeometry(0.06, toothThickness + 0.02, 0.2);
            const toothFace = new THREE.Mesh(toothFaceGeometry, material);
            toothFace.position.set(x * 1.1, 0, z * 1.1);
            toothFace.rotation.y = angle + Math.PI / 2;
            this.model.add(toothFace);
        }
    }
    
    createRealisticHub(material) {
        // Central hub with realistic proportions
        const hubGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
        const hub = new THREE.Mesh(hubGeometry, material);
        hub.position.set(0, 0, 0);
        hub.castShadow = true;
        hub.receiveShadow = true;
        this.model.add(hub);
        
        // Central bore hole
        const boreGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.35, 16);
        const bore = new THREE.Mesh(boreGeometry, new THREE.MeshPhongMaterial({ 
            color: 0x111111
        }));
        bore.position.set(0, 0, 0);
        this.model.add(bore);
        
        // Keyway slot - realistic size
        const keyGeometry = new THREE.BoxGeometry(0.05, 0.35, 0.4);
        const keyway = new THREE.Mesh(keyGeometry, new THREE.MeshPhongMaterial({ 
            color: 0x111111
        }));
        keyway.position.set(0.175, 0, 0);
        this.model.add(keyway);
    }
    
    createRealisticMountingHoles(material) {
        // Standard bolt circle pattern - 4 holes
        const boltCircleRadius = 1.0;
        const numHoles = 4;
        
        for (let i = 0; i < numHoles; i++) {
            const angle = (i / numHoles) * Math.PI * 2;
            const x = Math.cos(angle) * boltCircleRadius;
            const z = Math.sin(angle) * boltCircleRadius;
            
            // Standard M6 bolt holes
            const holeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12);
            const hole = new THREE.Mesh(holeGeometry, new THREE.MeshPhongMaterial({ 
                color: 0x111111
            }));
            hole.position.set(x, 0, z);
            this.model.add(hole);
        }
    }
    
    
    createFeaturePreviews() {
        const previewContainers = document.querySelectorAll('.mini-3d-preview');
        
        previewContainers.forEach((container, index) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild(renderer.domElement);
            
            // Add a simple rotating shape
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: index === 0 ? 0x8B5CF6 : 0xEC4899,
                transparent: true,
                opacity: 0.8
            });
            
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            
            const light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 0, 10);
            scene.add(light);
            
            camera.position.z = 3;
            
            // Animation
            const animatePreview = () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
                requestAnimationFrame(animatePreview);
            };
            animatePreview();
        });
    }
    
    setupViewerControls() {
        const rotateBtn = document.getElementById('rotate-btn');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        
        this.autoRotate = true;
        
        if (rotateBtn) {
            rotateBtn.addEventListener('click', () => {
                this.autoRotate = !this.autoRotate;
                rotateBtn.style.background = this.autoRotate ? 
                    'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' : '#fff';
                rotateBtn.style.color = this.autoRotate ? '#fff' : '#64748B';
            });
        }
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                this.camera.position.z = Math.max(this.camera.position.z - 0.5, 2);
            });
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                this.camera.position.z = Math.min(this.camera.position.z + 0.5, 10);
            });
        }
        
        // Mouse and touch interaction
        const canvas = this.renderer.domElement;
        let isInteracting = false;
        let startX = 0;
        let startY = 0;
        
        // Mouse events
        canvas.addEventListener('mousedown', (e) => {
            isInteracting = true;
            startX = e.clientX;
            startY = e.clientY;
            this.autoRotate = false;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isInteracting || !this.model) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            this.model.rotation.y += deltaX * 0.01;
            this.model.rotation.x += deltaY * 0.01;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        canvas.addEventListener('mouseup', () => {
            isInteracting = false;
        });
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                isInteracting = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                this.autoRotate = false;
            }
        }, { passive: false });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!isInteracting || !this.model || e.touches.length !== 1) return;
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            this.model.rotation.y += deltaX * 0.01;
            this.model.rotation.x += deltaY * 0.01;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: false });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            isInteracting = false;
        }, { passive: false });
        
        // Mouse wheel for zoom
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.camera.position.z += e.deltaY * 0.001;
            this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
        }, { passive: false });
    }
    
    updateFormPlaceholders() {
        const userTypeSelect = document.getElementById('user_type_select');
        const messageTextarea = document.querySelector('#hero-form textarea[name="message"]');
        const nameInput = document.querySelector('#hero-form input[name="name"]');
        if (!userTypeSelect || !messageTextarea || !nameInput) return;
        const placeholders = {
            user: { name: "Your Name", message: "What's your next great idea?" },
            vendor: { name: "Company Name", message: "Outline your skills, machinery, and material capabilities:" },
            developer: { name: "Your Name / GitHub", message: "Tell us about your experience or interest in the project:" },
            investor: { name: "Your Name / Company", message: "Tell us about your investment interests and goals:" }
        };
        userTypeSelect.addEventListener('change', (e) => {
            const userType = e.target.value;
            messageTextarea.placeholder = placeholders[userType].message;
            nameInput.placeholder = placeholders[userType].name;
            
            // Update form endpoint based on user type
            const form = document.getElementById('hero-form');
            if (form) {
                form.dataset.form = userType;
            }
        });
    }
}

// Initialize the app with proper loading checks
function initializeApp() {
    console.log('Initializing Promptly3D App...');
    
    // Double-check libraries are available
    if (typeof THREE === 'undefined') {
        console.error('Cannot initialize: Three.js is not available');
        return;
    }
    
    if (typeof gsap === 'undefined') {
        console.error('Cannot initialize: GSAP is not available');
        return;
    }
    
    try {
        addDynamicStyles(); // If still needed
        const app = new Promptly3DApp();
        app.updateFormPlaceholders(); // Add this call
        console.log('Promptly3D App initialized successfully');
    } catch (error) {
        console.error('Error initializing Promptly3D App:', error);
        document.body.innerHTML += '<div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: red; color: white; padding: 20px; border-radius: 5px; z-index: 9999;">Error initializing 3D viewer. Please check console for details.</div>';
    }
}

// Wait for both DOMContentLoaded and window.load to ensure all scripts are loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Additional wait for scripts to fully initialize
        if (window.THREE && window.gsap) {
            initializeApp();
        } else {
            window.addEventListener('load', initializeApp);
        }
    });
} else {
    // DOM already loaded
    if (window.THREE && window.gsap) {
        initializeApp();
    } else {
        window.addEventListener('load', initializeApp);
    }
}
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }

    // Left side is now blank - ready for fresh content
    




    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Simple scroll trigger to add visibility class
    gsap.utils.toArray('.content-section').forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => section.classList.add('is-visible'),
            once: true
        });
    });

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Promptly3DApp, scrollToSection };
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

// Add dispose method to class if needed
Promptly3DApp.prototype.dispose = function() {
    this.renderer.dispose();
    // Additional cleanup
};

// Cleanup on unload
window.addEventListener('beforeunload', () => {
    if (app && app.renderer) {
        app.renderer.dispose();
        app.scene.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) object.material.forEach(mat => mat.dispose());
                else object.material.dispose();
            }
        });
    }
});