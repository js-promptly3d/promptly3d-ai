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

// ================================
// ProcessingBracket Class for Engineering Demo
// ================================

class ProcessingBracket {
    constructor(container, options = {}) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "low-power"
        });
        
        this.options = {
            autoRotate: true,
            rotationSpeed: 0.008,
            materialType: 'aluminum',
            showMountingHoles: true,
            highlightFeatures: true,
            ...options
        };
        
        this.animationId = null;
        this.bracketGroup = null;
        this.material = null;
    }
    
    init() {
        this.setupRenderer();
        this.createBracket();
        this.setupLighting();
        this.setupCamera();
        this.startAnimation();
    }
    
    setupRenderer() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
    }
    
    createBracket() {
        this.bracketGroup = new THREE.Group();
        
        // Create precision bearing assembly instead
        this.createPrecisionBearing();
        
        // Apply professional material
        this.applyMaterial();
        
        this.scene.add(this.bracketGroup);
    }
    
    createPrecisionBearing() {
        const bearingSpecs = {
            outerRadius: 0.6,
            innerRadius: 0.3,
            thickness: 0.15,
            ballCount: 12,
            ballRadius: 0.06
        };
        
        // Outer race
        const outerRace = new THREE.Mesh(
            new THREE.TorusGeometry(
                bearingSpecs.outerRadius,
                bearingSpecs.thickness,
                4,
                32
            ),
            this.material
        );
        outerRace.rotation.x = Math.PI / 2;
        outerRace.castShadow = true;
        outerRace.receiveShadow = true;
        
        // Inner race
        const innerRaceGeometry = new THREE.TorusGeometry(
            bearingSpecs.innerRadius,
            bearingSpecs.thickness * 0.8,
            4,
            32
        );
        const innerRace = new THREE.Mesh(innerRaceGeometry, this.material);
        innerRace.rotation.x = Math.PI / 2;
        innerRace.castShadow = true;
        
        // Ball bearings
        const ballGroup = new THREE.Group();
        for (let i = 0; i < bearingSpecs.ballCount; i++) {
            const angle = (i / bearingSpecs.ballCount) * Math.PI * 2;
            const ballRadius = (bearingSpecs.outerRadius + bearingSpecs.innerRadius) / 2;
            
            const ball = new THREE.Mesh(
                new THREE.SphereGeometry(bearingSpecs.ballRadius, 16, 16),
                new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF,
                    metalness: 1.0,
                    roughness: 0.05,
                    envMapIntensity: 2.0
                })
            );
            
            ball.position.x = Math.cos(angle) * ballRadius;
            ball.position.z = Math.sin(angle) * ballRadius;
            ball.castShadow = true;
            ballGroup.add(ball);
        }
        
        // Cage (retainer)
        const cageGeometry = new THREE.TorusGeometry(
            (bearingSpecs.outerRadius + bearingSpecs.innerRadius) / 2,
            bearingSpecs.ballRadius * 0.4,
            6,
            bearingSpecs.ballCount
        );
        const cageMaterial = new THREE.MeshStandardMaterial({
            color: 0x4A4A4A,
            metalness: 0.3,
            roughness: 0.7
        });
        const cage = new THREE.Mesh(cageGeometry, cageMaterial);
        cage.rotation.x = Math.PI / 2;
        
        // Add details - grooves
        const grooveCount = 8;
        for (let i = 0; i < grooveCount; i++) {
            const angle = (i / grooveCount) * Math.PI * 2;
            const groove = new THREE.Mesh(
                new THREE.BoxGeometry(0.01, bearingSpecs.thickness * 1.2, 0.15),
                new THREE.MeshStandardMaterial({
                    color: 0x000000,
                    metalness: 0,
                    roughness: 1
                })
            );
            groove.position.x = Math.cos(angle) * bearingSpecs.outerRadius;
            groove.position.z = Math.sin(angle) * bearingSpecs.outerRadius;
            groove.rotation.y = angle;
            this.bracketGroup.add(groove);
        }
        
        this.bracketGroup.add(outerRace, innerRace, ballGroup, cage);
        
        // Store ball group for animation
        this.ballGroup = ballGroup;
    }
    
    createMainStructure(specs) {
        // Base plate with proper thickness
        const baseGeometry = new THREE.BoxGeometry(
            specs.baseWidth, 
            specs.wallThickness, 
            specs.baseDepth
        );
        const basePlate = new THREE.Mesh(baseGeometry);
        basePlate.position.y = 0;
        basePlate.castShadow = true;
        basePlate.receiveShadow = true;
        
        // Vertical mounting plate
        const verticalGeometry = new THREE.BoxGeometry(
            specs.wallThickness,
            specs.verticalHeight,
            specs.baseDepth
        );
        const verticalPlate = new THREE.Mesh(verticalGeometry);
        verticalPlate.position.set(
            specs.baseWidth/2 - specs.wallThickness/2,
            specs.verticalHeight/2,
            0
        );
        verticalPlate.castShadow = true;
        verticalPlate.receiveShadow = true;
        
        // Fillet at corner junction for manufacturing realism
        const filletGeometry = new THREE.CylinderGeometry(
            specs.wallThickness/2, 
            specs.wallThickness/2, 
            specs.baseDepth, 
            8
        );
        const fillet = new THREE.Mesh(filletGeometry);
        fillet.position.set(
            specs.baseWidth/2 - specs.wallThickness/2,
            specs.wallThickness/2,
            0
        );
        fillet.rotation.x = Math.PI / 2;
        fillet.castShadow = true;
        
        this.bracketGroup.add(basePlate, verticalPlate, fillet);
    }
    
    createM8Holes(specs) {
        // Four M8 holes in standard mounting pattern
        const holePositions = [
            { x: specs.baseWidth/4, z: specs.baseDepth/4 },
            { x: specs.baseWidth/4, z: -specs.baseDepth/4 },
            { x: -specs.baseWidth/4, z: specs.baseDepth/4 },
            { x: -specs.baseWidth/4, z: -specs.baseDepth/4 }
        ];
        
        holePositions.forEach(pos => {
            // Create hole geometry (cylinder for visibility)
            const holeGeometry = new THREE.CylinderGeometry(
                specs.holeDiameter/2,
                specs.holeDiameter/2,
                specs.wallThickness * 1.2,
                16
            );
            
            // Create hole material (darker for visibility)
            const holeMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 0.9
            });
            
            const hole = new THREE.Mesh(holeGeometry, holeMaterial);
            hole.position.set(pos.x, 0, pos.z);
            
            this.bracketGroup.add(hole);
        });
    }
    
    createStructuralDetails(specs) {
        // Corner reinforcement gusset for 50kg load rating
        const gussetShape = new THREE.Shape();
        gussetShape.moveTo(0, 0);
        gussetShape.lineTo(0.3, 0);
        gussetShape.lineTo(0, 0.3);
        gussetShape.closePath();
        
        const gussetGeometry = new THREE.ExtrudeGeometry(gussetShape, {
            depth: specs.wallThickness * 0.8,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005
        });
        
        const gusset = new THREE.Mesh(gussetGeometry);
        gusset.position.set(
            specs.baseWidth/2 - 0.15,
            0.15,
            0
        );
        gusset.rotation.z = Math.PI;
        gusset.castShadow = true;
        
        this.bracketGroup.add(gusset);
    }
    
    applyMaterial() {
        // Professional material system
        const materials = {
            aluminum: new THREE.MeshStandardMaterial({
                color: 0xC0C0C0,           // Professional aluminum
                metalness: 0.9,
                roughness: 0.1,
                envMapIntensity: 1.0,
                transparent: false
            }),
            steel: new THREE.MeshStandardMaterial({
                color: 0x8C8C8C,           // Industrial steel
                metalness: 0.95,
                roughness: 0.15,
                envMapIntensity: 0.8
            }),
            anodized: new THREE.MeshStandardMaterial({
                color: 0x34495E,           // Dark anodized finish
                metalness: 0.8,
                roughness: 0.2,
                envMapIntensity: 0.9
            })
        };
        
        this.material = materials[this.options.materialType] || materials.aluminum;
        
        // Apply to all bracket meshes
        this.bracketGroup.traverse((child) => {
            if (child.isMesh) {
                // Skip holes (black material)
                if (child.material && child.material.color && child.material.color.getHex() === 0x000000) {
                    return;
                }
                child.material = this.material;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }
    
    setupLighting() {
        // Key light for form definition
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
        keyLight.position.set(3, 4, 3);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        this.scene.add(keyLight);
        
        // Fill light for shadow detail
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-2, 2, 2);
        this.scene.add(fillLight);
        
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);
        
        // Rim light for edge definition
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
        rimLight.position.set(0, 3, -3);
        this.scene.add(rimLight);
    }
    
    setupCamera() {
        // Position camera for optimal bracket viewing
        this.camera.position.set(2, 1.5, 2);
        this.camera.lookAt(0, 0.2, 0);
        this.camera.updateProjectionMatrix();
    }
    
    startAnimation() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            
            if (this.options.autoRotate && this.bracketGroup) {
                // Smooth professional rotation
                this.bracketGroup.rotation.y += this.options.rotationSpeed;
                
                // Optional gentle bobbing for visual interest
                this.bracketGroup.position.y = Math.sin(Date.now() * 0.001) * 0.02;
            }
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }
    
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Dispose of geometries and materials
        this.bracketGroup?.traverse((child) => {
            if (child.isMesh) {
                child.geometry?.dispose();
                child.material?.dispose();
            }
        });
        
        // Clear scene
        this.scene.clear();
        
        // Dispose renderer
        this.renderer.dispose();
        
        // Remove canvas
        const canvas = this.container.querySelector('canvas');
        if (canvas) {
            canvas.remove();
        }
    }
}

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
        
        // Processing animation
        this.processingBracket = null;
        
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
        
        // Check if Three.js loaded properly
        if (typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
            console.error('Three.js or OrbitControls not loaded, showing fallback');
            this.showFallbackCanvas(container);
            return;
        }
        
        try {
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
                    () => {
                        // Model failed to load, create fallback
                        this.createFallback3DModel();
                    }
                );
            } else {
                // GLTFLoader not available, create fallback
                this.createFallback3DModel();
            }

            // Setup viewer controls
            this.setupViewerControls();
            
            // Add resize handler
            window.addEventListener('resize', this.handleResize.bind(this));

            // Start animation loop
            this.animate();
        } catch (error) {
            console.error('Error initializing 3D viewer:', error);
            this.showFallbackCanvas(container);
        }
    }

    showFallbackCanvas(container) {
        // Create a simple CSS animated element as fallback
        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                position: relative;
                overflow: hidden;
            ">
                <div style="
                    width: 150px;
                    height: 150px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    animation: rotate 4s linear infinite;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 48px;
                        color: white;
                        font-weight: bold;
                    ">3D</div>
                </div>
                <style>
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
    }

    handleResize() {
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
        
        // Setup flip card interactions
        this.setupFlipCards();
    }
    
    setupFlipCards() {
        const flipCards = document.querySelectorAll('.flip-card');
        
        flipCards.forEach(card => {
            // Add click event listener
            card.addEventListener('click', () => {
                this.toggleFlipCard(card);
            });
            
            // Add keyboard event listener for accessibility
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleFlipCard(card);
                }
            });
            
            // Add focus and blur events for better accessibility
            card.addEventListener('focus', () => {
                card.style.transform = 'translateY(-2px)';
            });
            
            card.addEventListener('blur', () => {
                if (!card.classList.contains('flipped')) {
                    card.style.transform = '';
                }
            });
        });
    }
    
    toggleFlipCard(card) {
        const inner = card.querySelector('.flip-card-inner');
        
        // Add loading state briefly for better UX
        inner.classList.add('loading');
        
        setTimeout(() => {
            // Toggle the flipped state
            const isFlipped = card.classList.contains('flipped');
            card.classList.toggle('flipped');
            
            // Update ARIA attributes for screen readers
            const label = card.getAttribute('aria-label');
            if (isFlipped) {
                // Going back to front
                card.setAttribute('aria-label', label.replace(' - Click to close', ' - Click to learn more'));
                card.setAttribute('aria-expanded', 'false');
            } else {
                // Going to back
                card.setAttribute('aria-label', label.replace(' - Click to learn more', ' - Click to close'));
                card.setAttribute('aria-expanded', 'true');
                
                // Announce the content change to screen readers
                const backContent = card.querySelector('.flip-card-back p').textContent;
                this.announceToScreenReader(backContent);
            }
            
            // Remove loading state
            inner.classList.remove('loading');
        }, 50);
    }
    
    announceToScreenReader(message) {
        // Create a temporary element to announce content changes
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove the announcement after a brief delay
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
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
                // Show processing animation first
                const message = formData.get('message') || 'Design a bracket with M8 mounting holes, 5mm wall thickness, supporting 50kg load';
                this.showProcessingDialog(message);
                
                // Simulate processing time
                setTimeout(() => {
                    this.hideProcessingDialog();
                    this.showFormSuccess(form);
                    form.reset();
                    submitButton.classList.add('success-animation');
                    setTimeout(() => submitButton.classList.remove('success-animation'), 2000);
                }, 4000);
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
    
    showProcessingDialog(prompt) {
        const processingModal = document.createElement('div');
        processingModal.className = 'processing-modal';
        processingModal.innerHTML = `
            <div class="processing-content">
                <div class="processing-header">
                    <h3>Generating Your Design</h3>
                    <p>AI is analyzing: "${prompt}"</p>
                </div>
                <div class="processing-visual">
                    <div id="processing-bracket-container"></div>
                    <div class="processing-steps">
                        <div class="step">Parsing specifications</div>
                        <div class="step">Generating geometry</div>
                        <div class="step">Optimizing for manufacturing</div>
                        <div class="step">Finalizing design</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(processingModal);
        
        // Initialize bracket animation
        const container = document.getElementById('processing-bracket-container');
        if (container && typeof THREE !== 'undefined') {
            this.processingBracket = new ProcessingBracket(container, {
                materialType: 'aluminum',
                autoRotate: true,
                rotationSpeed: 0.008
            });
            
            this.processingBracket.init();
        }
        
        // Animate processing steps
        this.animateProcessingSteps();
    }
    
    animateProcessingSteps() {
        const steps = document.querySelectorAll('.processing-steps .step');
        let currentStep = 0;
        
        const nextStep = () => {
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
                setTimeout(nextStep, 1000);
            }
        };
        
        setTimeout(nextStep, 500);
    }
    
    hideProcessingDialog() {
        // Cleanup bracket animation
        if (this.processingBracket) {
            this.processingBracket.dispose();
            this.processingBracket = null;
        }
        
        // Remove modal
        const modal = document.querySelector('.processing-modal');
        if (modal) {
            modal.remove();
        }
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
        this.createManufacturingShowpiece();
        this.createFeaturePreviews();
    }

    createManufacturingShowpiece() {
        // Remove any existing model
        if (this.model) {
            this.scene.remove(this.model);
        }
        
        // Create professional precision bearing assembly as per PRP requirements
        this.model = new THREE.Group();
        
        // Professional stainless steel material (PRP requirement)
        const steelMaterial = new THREE.MeshStandardMaterial({
            color: 0xE8E8E8,
            metalness: 0.95,
            roughness: 0.1,
            envMapIntensity: 1.0
        });
        
        // Ball bearing material - slightly darker steel
        const ballMaterial = new THREE.MeshStandardMaterial({
            color: 0xC0C0C0,
            metalness: 0.9,
            roughness: 0.2,
            envMapIntensity: 0.8
        });
        
        // Create precision bearing assembly
        this.createPrecisionBearing(steelMaterial, ballMaterial);
        
        // Position and scale for optimal viewing
        this.model.scale.set(1.2, 1.2, 1.2);
        this.model.position.set(0, 0, 0);
        this.scene.add(this.model);
        
        // Professional shadow plane
        const planeGeo = new THREE.CircleGeometry(4, 64);
        const planeMat = new THREE.ShadowMaterial({ opacity: 0.2 });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.8;
        plane.receiveShadow = true;
        this.scene.add(plane);
        
        // Professional three-point lighting setup (PRP requirement)
        this.setupProfessionalLighting();
        
        // Professional rotation speed
        this.autoRotateSpeed = 0.002;
    }
    
    createPrecisionBearing(steelMaterial, ballMaterial) {
        // Outer race - industrial grade specifications (optimized)
        const outerRaceGeometry = new THREE.TorusGeometry(1.6, 0.25, 12, 48);
        const outerRace = new THREE.Mesh(outerRaceGeometry, steelMaterial);
        outerRace.castShadow = true;
        outerRace.receiveShadow = true;
        this.model.add(outerRace);
        
        // Inner race - precision machined (optimized)
        const innerRaceGeometry = new THREE.TorusGeometry(1.0, 0.2, 12, 48);
        const innerRace = new THREE.Mesh(innerRaceGeometry, steelMaterial);
        innerRace.castShadow = true;
        innerRace.receiveShadow = true;
        this.model.add(innerRace);
        
        // Ball bearings - 12 precision steel balls (optimized for performance)
        const ballCount = 12;
        const ballRadius = 0.15;
        const ballGeometry = new THREE.SphereGeometry(ballRadius, 16, 16); // Reduced segments for 60fps performance
        const pitchCircleRadius = 1.3;
        
        for (let i = 0; i < ballCount; i++) {
            const angle = (i / ballCount) * Math.PI * 2;
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            
            ball.position.set(
                Math.cos(angle) * pitchCircleRadius,
                0,
                Math.sin(angle) * pitchCircleRadius
            );
            
            ball.castShadow = true;
            ball.receiveShadow = true;
            this.model.add(ball);
        }
        
        // Bearing cage/separator (optimized)
        const cageGeometry = new THREE.TorusGeometry(1.3, 0.05, 8, 32);
        const cageMaterial = new THREE.MeshStandardMaterial({
            color: 0xA0A0A0,
            metalness: 0.7,
            roughness: 0.3
        });
        const cage = new THREE.Mesh(cageGeometry, cageMaterial);
        cage.castShadow = true;
        this.model.add(cage);
        
        // Inner bore detail
        const boreGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.15, 32);
        const bore = new THREE.Mesh(boreGeometry, steelMaterial);
        bore.rotation.x = Math.PI / 2;
        bore.castShadow = true;
        this.model.add(bore);
        
        // Outer shoulder detail
        const shoulderGeometry = new THREE.CylinderGeometry(2.0, 2.0, 0.1, 64);
        const shoulder = new THREE.Mesh(shoulderGeometry, steelMaterial);
        shoulder.rotation.x = Math.PI / 2;
        shoulder.castShadow = true;
        this.model.add(shoulder);
        
        // Add subtle surface texturing for realism
        this.addSurfaceDetails(steelMaterial);
    }
    
    setupProfessionalLighting() {
        // Clear existing lights except ambient
        const lightsToRemove = [];
        this.scene.traverse((child) => {
            if (child.isDirectionalLight) {
                lightsToRemove.push(child);
            }
        });
        lightsToRemove.forEach(light => this.scene.remove(light));
        
        // Key Light - Main illumination (PRP specification)
        const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
        keyLight.position.set(5, 10, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 50;
        keyLight.shadow.camera.left = -10;
        keyLight.shadow.camera.right = 10;
        keyLight.shadow.camera.top = 10;
        keyLight.shadow.camera.bottom = -10;
        this.scene.add(keyLight);
        
        // Fill Light - Softens shadows (PRP specification)
        const fillLight = new THREE.DirectionalLight(0xE6F0FF, 0.6);
        fillLight.position.set(-5, 5, 5);
        this.scene.add(fillLight);
        
        // Rim Light - Edge definition (PRP specification)
        const rimLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        rimLight.position.set(0, -5, -10);
        this.scene.add(rimLight);
        
        // Enhanced ambient for professional appearance
        if (this.scene.children.find(child => child.isAmbientLight)) {
            this.scene.children.find(child => child.isAmbientLight).intensity = 0.3;
        }
    }
    
    addSurfaceDetails(material) {
        // Add subtle surface imperfections for manufacturing realism
        // This could be expanded with normal maps in a production version
        material.roughnessMap = this.createProceduralRoughnessMap();
    }
    
    createProceduralRoughnessMap() {
        // Create a simple procedural roughness map for surface variation
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        // Create subtle noise pattern
        const imageData = context.createImageData(256, 256);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const noise = Math.random() * 20 + 235; // Subtle variation
            imageData.data[i] = noise;     // R
            imageData.data[i + 1] = noise; // G
            imageData.data[i + 2] = noise; // B
            imageData.data[i + 3] = 255;   // A
        }
        
        context.putImageData(imageData, 0, 0);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        
        return texture;
    }
    
    createBracketBody(material) {
        // Main L-shaped bracket body
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(2, 0);
        shape.lineTo(2, 0.3);
        shape.lineTo(0.3, 0.3);
        shape.lineTo(0.3, 2);
        shape.lineTo(0, 2);
        shape.closePath();
        
        const extrudeSettings = {
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelSegments: 3
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const bracket = new THREE.Mesh(geometry, material);
        bracket.rotation.y = Math.PI / 4;
        bracket.position.set(-1, -0.5, 0);
        bracket.castShadow = true;
        bracket.receiveShadow = true;
        this.model.add(bracket);
    }
    
    createMountingBosses(material) {
        const bossGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 16);
        const positions = [
            { x: 0.5, y: -0.3, z: 0.5 },
            { x: -0.5, y: -0.3, z: 0.5 },
            { x: 0.5, y: -0.3, z: -0.5 },
            { x: -0.5, y: -0.3, z: -0.5 }
        ];
        
        positions.forEach(pos => {
            const boss = new THREE.Mesh(bossGeometry, material);
            boss.position.set(pos.x, pos.y, pos.z);
            boss.castShadow = true;
            this.model.add(boss);
        });
    }
    
    createRibbingStructure(material) {
        // Add structural ribs for manufacturing realism
        const ribGeometry = new THREE.BoxGeometry(0.05, 0.8, 1.5);
        const ribPositions = [
            { x: 0.2, y: 0.2, z: 0, rotation: 0 },
            { x: -0.2, y: 0.2, z: 0, rotation: 0 },
            { x: 0, y: 0.2, z: 0.3, rotation: Math.PI / 2 }
        ];
        
        ribPositions.forEach(pos => {
            const rib = new THREE.Mesh(ribGeometry, material);
            rib.position.set(pos.x, pos.y, pos.z);
            rib.rotation.y = pos.rotation;
            rib.castShadow = true;
            this.model.add(rib);
        });
    }
    
    createThreadedInserts(material) {
        // Add threaded inserts for realistic manufacturing detail
        const insertGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 8);
        const insertMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.9,
            roughness: 0.3
        });
        
        const insertPositions = [
            { x: 0.5, y: -0.1, z: 0.5 },
            { x: -0.5, y: -0.1, z: 0.5 },
            { x: 0.5, y: -0.1, z: -0.5 },
            { x: -0.5, y: -0.1, z: -0.5 }
        ];
        
        insertPositions.forEach(pos => {
            const insert = new THREE.Mesh(insertGeometry, insertMaterial);
            insert.position.set(pos.x, pos.y, pos.z);
            insert.castShadow = true;
            this.model.add(insert);
        });
    }
    
    addTechnicalAnnotations() {
        // This method can be expanded to add dimensional annotations
        // For now, it's a placeholder for future technical overlay features
        console.log('Technical annotations added to manufacturing part');
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

// ================================
// Enhanced Interface Section Controller
// ================================

// Enhanced Interface Section Controller
class InterfaceController {
    constructor() {
        this.currentFeature = 'manipulation';
        this.demos = {};
        this.animations = {};
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.initializeDemos();
        this.setupInteractions();
        this.startAnimations();
    }
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const features = document.querySelectorAll('.interface-feature-enhanced');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const feature = e.target.dataset.feature;
                this.switchFeature(feature);
            });
        });
    }
    
    switchFeature(feature) {
        if (feature === this.currentFeature) return;
        
        // Update navigation
        document.querySelector('.nav-btn.active').classList.remove('active');
        document.querySelector(`[data-feature="${feature}"]`).classList.add('active');
        
        // Update feature display
        document.querySelector('.interface-feature-enhanced.active').classList.remove('active');
        document.querySelector(`.interface-feature-enhanced[data-feature="${feature}"]`).classList.add('active');
        
        this.currentFeature = feature;
        this.initializeFeatureDemo(feature);
    }
    
    initializeDemos() {
        this.demos.manipulation = new ManipulationDemo();
        this.demos.collaboration = new CollaborationDemo();
        this.demos.input = new InputDemo();
        this.demos.workflow = new WorkflowDemo();
    }
    
    initializeFeatureDemo(feature) {
        if (this.demos[feature] && this.demos[feature].start) {
            this.demos[feature].start();
        }
    }
    
    setupInteractions() {
        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.interface-feature-enhanced').forEach(el => {
            observer.observe(el);
        });
    }
    
    startAnimations() {
        // Start continuous animations
        this.animateMetrics();
        this.animateWorkflowConnectors();
    }
    
    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-value');
        
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                this.countUpAnimation(metric);
            }, index * 200);
        });
    }
    
    countUpAnimation(element) {
        const target = element.textContent.replace(/[^\d.]/g, '');
        const isDecimal = target.includes('.');
        const targetValue = parseFloat(target);
        const suffix = element.textContent.replace(/[\d.]/g, '');
        
        let current = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            
            const displayValue = isDecimal ? 
                current.toFixed(1) : 
                Math.floor(current);
            element.textContent = displayValue + suffix;
        }, 30);
    }
    
    animateWorkflowConnectors() {
        const connectors = document.querySelectorAll('.workflow-connector');
        let currentIndex = 0;
        
        setInterval(() => {
            connectors.forEach(c => c.classList.remove('active'));
            connectors[currentIndex % connectors.length].classList.add('active');
            currentIndex++;
        }, 2000);
    }
}

// Individual Demo Classes
class ManipulationDemo {
    constructor() {
        this.canvas = document.getElementById('manipulation-demo');
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        this.cube = null;
        this.controls = null;
        
        if (this.canvas) {
            this.init();
        }
    }
    
    init() {
        if (typeof THREE === 'undefined') {
            this.showFallback();
            return;
        }
        
        this.setupScene();
        this.createCube();
        this.setupLighting();
        this.setupControls();
        this.setupGizmos();
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a202c);
        
        this.camera = new THREE.PerspectiveCamera(
            75, 
            this.canvas.clientWidth / this.canvas.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(3, 3, 3);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true 
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x667eea,
            shininess: 100
        });
        
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
        
        // Add wireframe overlay
        const wireframe = new THREE.WireframeGeometry(geometry);
        const line = new THREE.LineSegments(wireframe, 
            new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
        );
        this.cube.add(line);
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }
    
    setupControls() {
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.canvas);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
        }
    }
    
    setupGizmos() {
        const gizmoButtons = document.querySelectorAll('.gizmo-btn');
        const positionReadout = document.getElementById('position-readout');
        
        gizmoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                gizmoButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const axis = btn.dataset.axis;
                this.constrainMovement(axis);
            });
        });
        
        // Update position readout
        this.updatePositionReadout(positionReadout);
    }
    
    constrainMovement(axis) {
        if (!this.cube) return;
        
        const movement = 0.5;
        switch(axis) {
            case 'x':
                if (typeof gsap !== 'undefined') {
                    gsap.to(this.cube.position, { 
                        duration: 0.5, 
                        x: this.cube.position.x + movement,
                        ease: "power2.out"
                    });
                }
                break;
            case 'y':
                if (typeof gsap !== 'undefined') {
                    gsap.to(this.cube.position, { 
                        duration: 0.5, 
                        y: this.cube.position.y + movement,
                        ease: "power2.out"
                    });
                }
                break;
            case 'z':
                if (typeof gsap !== 'undefined') {
                    gsap.to(this.cube.position, { 
                        duration: 0.5, 
                        z: this.cube.position.z + movement,
                        ease: "power2.out"
                    });
                }
                break;
        }
    }
    
    updatePositionReadout(element) {
        const updateLoop = () => {
            if (this.cube && element) {
                const pos = this.cube.position;
                element.textContent = `X: ${pos.x.toFixed(1)}, Y: ${pos.y.toFixed(1)}, Z: ${pos.z.toFixed(1)}`;
            }
            requestAnimationFrame(updateLoop);
        };
        updateLoop();
    }
    
    animate() {
        const animateLoop = () => {
            if (this.controls) {
                this.controls.update();
            }
            
            if (this.cube) {
                this.cube.rotation.y += 0.005;
            }
            
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(animateLoop);
        };
        animateLoop();
    }
    
    showFallback() {
        this.canvas.style.background = 'linear-gradient(45deg, #1a202c, #2d3748)';
        this.canvas.style.display = 'flex';
        this.canvas.style.alignItems = 'center';
        this.canvas.style.justifyContent = 'center';
        this.canvas.style.color = 'white';
        this.canvas.innerHTML = '<div style="text-align: center;"><h4>3D Manipulation Demo</h4><p>WebGL not available - showing fallback</p></div>';
    }
    
    start() {
        if (this.cube && typeof gsap !== 'undefined') {
            gsap.fromTo(this.cube.scale, 
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    }
}

class CollaborationDemo {
    constructor() {
        this.canvas = document.getElementById('collaboration-demo');
        this.timeline = document.querySelector('.collaboration-timeline');
        this.users = document.querySelectorAll('.user-avatar');
        this.timelinePlay = document.querySelector('.timeline-play');
        
        this.init();
    }
    
    init() {
        this.setupCollaborationScene();
        this.setupTimelineControls();
        this.animateUserPresence();
    }
    
    setupCollaborationScene() {
        if (!this.canvas) return;
        
        if (typeof THREE === 'undefined') {
            this.showFallback();
            return;
        }
        
        // Similar Three.js setup as manipulation demo
        // but with multiple objects representing collaborative editing
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a202c);
        
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.camera.position.set(4, 4, 4);
        
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        
        this.createCollaborativeObjects();
        this.setupLighting();
        this.animate();
    }
    
    createCollaborativeObjects() {
        const colors = [0x667eea, 0x48bb78, 0xed8936];
        const geometries = [
            new THREE.BoxGeometry(0.8, 0.8, 0.8),
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16)
        ];
        
        this.objects = [];
        
        geometries.forEach((geometry, index) => {
            const material = new THREE.MeshPhongMaterial({ 
                color: colors[index],
                transparent: true,
                opacity: 0.8
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (index - 1) * 1.5;
            mesh.userData.originalPosition = mesh.position.clone();
            
            this.scene.add(mesh);
            this.objects.push(mesh);
        });
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }
    
    setupTimelineControls() {
        if (this.timelinePlay) {
            this.timelinePlay.addEventListener('click', () => {
                this.playTimelineAnimation();
            });
        }
    }
    
    playTimelineAnimation() {
        const events = document.querySelectorAll('.timeline-event');
        
        events.forEach((event, index) => {
            setTimeout(() => {
                events.forEach(e => e.classList.remove('active'));
                event.classList.add('active');
                
                // Animate corresponding 3D object
                if (this.objects[index]) {
                    this.animateObjectEdit(this.objects[index]);
                }
            }, index * 1000);
        });
    }
    
    animateObjectEdit(object) {
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline();
            
            tl.to(object.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 })
              .to(object.rotation, { y: "+=0.5", duration: 0.5 }, 0)
              .to(object.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        }
    }
    
    animateUserPresence() {
        this.users.forEach((user, index) => {
            setInterval(() => {
                user.classList.toggle('active');
            }, 2000 + index * 500);
        });
    }
    
    animate() {
        const animateLoop = () => {
            if (this.objects) {
                this.objects.forEach((obj, index) => {
                    obj.rotation.y += 0.002 * (index + 1);
                });
            }
            
            if (this.renderer) {
                this.renderer.render(this.scene, this.camera);
            }
            requestAnimationFrame(animateLoop);
        };
        animateLoop();
    }
    
    showFallback() {
        this.canvas.style.background = 'linear-gradient(45deg, #1a202c, #2d3748)';
        this.canvas.innerHTML = '<div style="text-align: center; color: white; padding: 20px;"><h4>Collaboration Demo</h4><p>Real-time multi-user editing</p></div>';
    }
    
    start() {
        this.playTimelineAnimation();
    }
}

class InputDemo {
    constructor() {
        this.currentMethod = 'voice';
        this.setupInputTabs();
        this.setupDemos();
    }
    
    setupInputTabs() {
        const tabs = document.querySelectorAll('.input-tab');
        const demos = document.querySelectorAll('.input-demo');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const method = tab.dataset.method;
                
                tabs.forEach(t => t.classList.remove('active'));
                demos.forEach(d => d.classList.remove('active'));
                
                tab.classList.add('active');
                document.querySelector(`.input-demo[data-method="${method}"]`).classList.add('active');
                
                this.currentMethod = method;
                this.startMethodDemo(method);
            });
        });
    }
    
    setupDemos() {
        this.setupVoiceDemo();
        this.setupSketchDemo();
        this.setupTechnicalDemo();
    }
    
    setupVoiceDemo() {
        const canvas = document.getElementById('voice-waveform');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        this.animateWaveform(ctx, canvas);
    }
    
    animateWaveform(ctx, canvas) {
        let time = 0;
        
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x += 2) {
                const amplitude = Math.sin((x + time) * 0.02) * 20 + 
                                Math.sin((x + time) * 0.05) * 10;
                const y = canvas.height / 2 + amplitude;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            time += 2;
            requestAnimationFrame(draw);
        };
        
        draw();
    }
    
    setupSketchDemo() {
        const canvas = document.getElementById('sketch-canvas');
        const resultCanvas = document.getElementById('sketch-result');
        
        if (canvas) {
            this.setupSketchCanvas(canvas);
        }
        
        if (resultCanvas) {
            this.setupResultCanvas(resultCanvas);
        }
    }
    
    setupSketchCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        let drawing = false;
        let currentPath = [];
        
        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentPath = [{ x, y }];
            
            ctx.beginPath();
            ctx.moveTo(x, y);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!drawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentPath.push({ x, y });
            
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        canvas.addEventListener('mouseup', () => {
            drawing = false;
            if (currentPath.length > 1) {
                this.convertSketchTo3D(currentPath);
            }
        });
    }
    
    setupResultCanvas(canvas) {
        if (typeof THREE === 'undefined') {
            canvas.style.background = '#1a202c';
            return;
        }
        
        this.sketchScene = new THREE.Scene();
        this.sketchScene.background = new THREE.Color(0x1a202c);
        
        this.sketchCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.sketchCamera.position.set(2, 2, 2);
        
        this.sketchRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.sketchRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.sketchScene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.sketchScene.add(directionalLight);
        
        this.animateSketchResult();
    }
    
    convertSketchTo3D(path) {
        if (!this.sketchScene) return;
        
        // Clear previous objects
        const objectsToRemove = [];
        this.sketchScene.traverse((child) => {
            if (child.isMesh) {
                objectsToRemove.push(child);
            }
        });
        objectsToRemove.forEach(obj => this.sketchScene.remove(obj));
        
        // Create 3D interpretation of sketch
        const geometry = new THREE.BoxGeometry(1, 0.2, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x48bb78 });
        const mesh = new THREE.Mesh(geometry, material);
        
        this.sketchScene.add(mesh);
        
        // Animate appearance
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(mesh.scale, 
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    }
    
    animateSketchResult() {
        const animate = () => {
            if (this.sketchRenderer && this.sketchScene && this.sketchCamera) {
                this.sketchRenderer.render(this.sketchScene, this.sketchCamera);
            }
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    setupTechnicalDemo() {
        // Animate parameter extraction
        const parameterItems = document.querySelectorAll('.parameter-list li');
        
        parameterItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideUp 0.5s ease-out forwards';
            }, index * 200);
        });
    }
    
    startMethodDemo(method) {
        switch(method) {
            case 'voice':
                this.startVoiceDemo();
                break;
            case 'sketch':
                this.startSketchDemo();
                break;
            case 'drawing':
                this.startTechnicalDemo();
                break;
        }
    }
    
    startVoiceDemo() {
        const processingDots = document.querySelectorAll('.processing-dot');
        processingDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.animationDelay = `${index * 0.2}s`;
            }, index * 100);
        });
    }
    
    start() {
        this.startMethodDemo(this.currentMethod);
    }
}

class WorkflowDemo {
    constructor() {
        this.setupWorkflowAnimation();
    }
    
    setupWorkflowAnimation() {
        const stages = document.querySelectorAll('.workflow-stage');
        const connectors = document.querySelectorAll('.workflow-connector');
        
        stages.forEach((stage, index) => {
            stage.addEventListener('mouseenter', () => {
                this.highlightWorkflowPath(index);
            });
        });
    }
    
    highlightWorkflowPath(stageIndex) {
        const connectors = document.querySelectorAll('.workflow-connector');
        
        connectors.forEach((connector, index) => {
            if (index <= stageIndex) {
                connector.classList.add('active');
            } else {
                connector.classList.remove('active');
            }
        });
    }
    
    start() {
        // Animate workflow stages in sequence
        const stages = document.querySelectorAll('.workflow-stage');
        
        stages.forEach((stage, index) => {
            setTimeout(() => {
                stage.style.animation = 'scaleIn 0.6s ease-out forwards';
                this.highlightWorkflowPath(index);
            }, index * 300);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const interfaceSection = document.querySelector('.interface-section-enhanced');
    if (interfaceSection) {
        const interfaceController = new InterfaceController();
    }
});

// Add resize handling
window.addEventListener('resize', () => {
    // Handle canvas resizing for all demos
    const canvases = document.querySelectorAll('.demo-canvas');
    canvases.forEach(canvas => {
        if (canvas.renderer) {
            canvas.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
    });
});

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

// ================================
// Coming Soon Modal Functionality
// ================================

// Coming Soon Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('coming-soon-modal');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const modalClose = modal?.querySelector('.modal-close');
    const featureName = modal?.querySelector('#feature-name');
    const comingSoonLinks = document.querySelectorAll('.coming-soon-link');
    
    function showModal(feature) {
        if (featureName) {
            featureName.textContent = feature;
        }
        if (modal) {
            modal.style.display = 'flex';
            // Trigger reflow to ensure transition works
            modal.offsetHeight;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function hideModal() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Add click handlers to coming soon links
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const feature = link.getAttribute('data-feature') || 'This feature';
            showModal(feature);
        });
    });
    
    // Close modal handlers
    modalClose?.addEventListener('click', hideModal);
    modalOverlay?.addEventListener('click', hideModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('show')) {
            hideModal();
        }
    });
    
    // Handle modal CTA click
    const modalCta = modal?.querySelector('.modal-cta');
    modalCta?.addEventListener('click', () => {
        hideModal();
        // Smooth scroll to hero form
        const heroForm = document.getElementById('hero-form');
        if (heroForm) {
            heroForm.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const firstInput = heroForm.querySelector('input, select');
                firstInput?.focus();
            }, 500);
        }
    });
});