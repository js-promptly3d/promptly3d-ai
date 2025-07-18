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
// NEW: High-Definition Interactive 3D Part
// ================================

class InteractivePart {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.controls = null;
        this.heatSink = null;
        this.clock = new THREE.Clock();
        this.init();
    }

    init() {
        this.setupRenderer();
        this.setupCamera();
        this.setupLighting();
        this.createHeatSink();
        this.setupControls();
        this.animate();
    }

    setupRenderer() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.container.appendChild(this.renderer.domElement);
    }

    setupCamera() {
        this.camera.position.set(0, 3, 6); // Adjusted camera for better view
        this.camera.lookAt(0, 0, 0);
    }

    setupLighting() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight.position.set(10, 12, 8);
        dirLight.castShadow = true;
        this.scene.add(dirLight);
        
        const rimLight = new THREE.DirectionalLight(0xccddff, 0.8);
        rimLight.position.set(-5, 5, -10);
        this.scene.add(rimLight);
    }

    createHeatSink() {
        this.heatSink = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({
            color: 0x5a3d99, // Professional purple color
            metalness: 0.9,
            roughness: 0.35,
            emissive: 0x000000
        });

        // Base with mounting holes
        const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 64);
        const base = new THREE.Mesh(baseGeometry, material);
        base.receiveShadow = true;
        
        // Add mounting holes to base
        const holeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32);
        const holeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const holePositions = [
            { x: 1.2, z: 0 }, { x: -1.2, z: 0 },
            { x: 0, z: 1.2 }, { x: 0, z: -1.2 }
        ];

        holePositions.forEach(pos => {
            const hole = new THREE.Mesh(holeGeometry, holeMaterial);
            hole.position.set(pos.x, 0, pos.z);
            base.add(hole);
        });
        this.heatSink.add(base);

        // Central Core
        const coreGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 64);
        const core = new THREE.Mesh(coreGeometry, material);
        core.position.y = 0.25;
        this.heatSink.add(core);

        // Fins
        const finCount = 70;
        const finHeight = 1.8;
        const finWidth = 0.04;
        const finLength = 1.3;
        const finGeometry = new THREE.BoxGeometry(finWidth, finHeight, finLength);

        for (let i = 0; i < finCount; i++) {
            const angle = (i / finCount) * Math.PI * 2;
            const fin = new THREE.Mesh(finGeometry, material);
            
            const radius = 0.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            fin.position.set(x, finHeight / 2 + 0.1, z);
            fin.rotation.y = -angle;
            fin.castShadow = true;
            
            this.heatSink.add(fin);
        }
        
        this.heatSink.position.y = -0.8;
        this.scene.add(this.heatSink);
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5; // Slower, more professional rotation
        this.controls.enableZoom = false; // Keep it clean
        this.controls.enablePan = false;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const elapsedTime = this.clock.getElapsedTime();
        if (this.heatSink) {
            const emissiveIntensity = (Math.sin(elapsedTime * 1.5) + 1) / 2 * 0.15; // Refined pulse
            this.heatSink.traverse(child => {
                if (child.isMesh && child.material.emissive) {
                    child.material.emissive.setHex(0x9d72ff).multiplyScalar(emissiveIntensity);
                }
            });
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-d-canvas');
    if (container) {
        new InteractivePart(container);
    }
    initializeScrollAnimations();
    initializeFlipCards();
});

function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        const cardInner = card.querySelector('.flip-card-inner');
        
        const flip = () => {
            if (card.classList.contains('flipped')) {
                card.classList.remove('flipped');
                card.setAttribute('aria-label', card.getAttribute('data-front-label'));
            } else {
                card.classList.add('flipped');
                card.setAttribute('aria-label', card.getAttribute('data-back-label'));
            }
        };

        card.addEventListener('click', flip);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flip();
            }
        });
    });
}

function initializeScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({ ease: "power2.out", duration: 0.8 });

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate feature blocks with alternating slide-in effect
    gsap.utils.toArray('.feature-block').forEach((block, i) => {
        const visual = block.querySelector('.feature-visual');
        const content = block.querySelector('.feature-content');
        const fromLeft = i % 2 === 0;

        gsap.from(visual, {
            opacity: 0,
            x: fromLeft ? 100 : -100,
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from(content, {
            opacity: 0,
            x: fromLeft ? -100 : 100,
            delay: 0.2,
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate "How It Works" steps with a slide-from-bottom effect
    gsap.utils.toArray('.step-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate comparison table with a slide-from-bottom effect
    gsap.utils.toArray('.compare-column').forEach((column, i) => {
        gsap.from(column, {
            opacity: 0,
            y: 50,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: '.compare-table',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate CTA section
    gsap.from('.cta-content', {
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}