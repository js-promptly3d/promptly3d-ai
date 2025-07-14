# Animation Cookbook

A collection of well-documented animation patterns and recipes for your project. Use these as building blocks for interactive, delightful, and performant UI and 3D experiences.

---

## Table of Contents
- [Entrance Animations](#entrance-animations)
- [Hover & Active Effects](#hover--active-effects)
- [3D Object Animations](#3d-object-animations)
- [Camera Transitions](#camera-transitions)
- [Staggered Lists](#staggered-lists)
- [Other Patterns](#other-patterns)

---

## Entrance Animations
**Fade In (GSAP):**
```js
import { gsap } from 'gsap';
gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1 });
```

**Slide Up (CSS):**
```css
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.slide-up {
  animation: slideUp 0.6s cubic-bezier(0.4,0,0.2,1) both;
}
```

---

## Hover & Active Effects
**Button Scale (GSAP):**
```js
gsap.to('.btn', { scale: 1.05, duration: 0.2, ease: 'power1.inOut' });
```

**Card Shadow (CSS):**
```css
.card:hover {
  box-shadow: 0 8px 32px rgba(26,34,56,0.15);
  transform: translateY(-4px);
}
```

---

## 3D Object Animations
**Spin Object (Three.js):**
```js
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

**Morph Target Animation (Three.js):**
```js
const mixer = new THREE.AnimationMixer(mesh);
const action = mixer.clipAction(gltf.animations[0]);
action.play();
```

---

## Camera Transitions
**Smooth Camera Move (GSAP + Three.js):**
```js
gsap.to(camera.position, { x: 10, y: 5, z: 20, duration: 2, ease: 'power2.inOut' });
```

---

## Staggered Lists
**Staggered Fade In (GSAP):**
```js
gsap.from('.list-item', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
```

---

## Other Patterns
(Add more as you develop new animation techniques!)
