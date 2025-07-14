# Prompt Library

A curated collection of effective prompts and their results for use with AI models (Claude, Gemini, GPT, etc.) in your project. Use this as a reference and inspiration for building, testing, and refining AI-powered features.

---

## Table of Contents
- [General Coding](#general-coding)
- [3D Tool Prompts](#3d-tool-prompts)
- [UI/UX Prompts](#uiux-prompts)
- [Documentation & Summarization](#documentation--summarization)
- [Other](#other)

---

## General Coding

**Prompt:**
```
Write a function in JavaScript that takes an array of numbers and returns the sum of all even numbers.
```
**Result:**
```js
function sumEvenNumbers(arr) {
  return arr.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
}
```

---

## 3D Tool Prompts

**Prompt:**
```
Generate a Three.js scene with a draggable cube and orbit controls. The cube should change color when clicked.
```
**Result:**
```js
// ...Three.js setup code...
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
scene.add(cube);
// Add drag controls and color change logic here
```

---

## UI/UX Prompts

**Prompt:**
```
Suggest a modern, accessible color palette for a 3D design web app.
```
**Result:**
- Primary: #1A2238
- Accent: #9DAAF2
- Background: #F4F4F4
- Success: #21E6C1
- Error: #FF6A6A

---

## Documentation & Summarization

**Prompt:**
```
Summarize the following codebase structure and suggest improvements for maintainability.
```
**Result:**
- The codebase uses a flat structure; consider grouping related components.
- Add a README for each major directory.
- Use consistent naming conventions.

---

## Other

(Add more prompts and results as you experiment and build new features!)
