import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { handleInteraction } from './interaction.js';
import { animateCamera } from './cameraAnimation.js';

let scene, camera, renderer, controls;
// Initialize the scene, camera, renderer, and controls
({ scene, camera, renderer, controls } = initScene());

// Create product parts (table + legs) and add to scene
const parts = createProduct(scene);

// Add ambient and directional lighting
addLighting(scene);

// Set up raycasting interaction with mouse clicks
handleInteraction(renderer, scene, camera, parts);

// Main animation loop
function animate(time) {
  requestAnimationFrame(animate);

  // Automatically rotate camera around the object
  animateCamera(camera, time);

  // Pulse the object to give it a lively animation
  const pulse = 1 + 0.05 * Math.sin(time * 0.005);
  parts.scale.set(pulse, pulse, pulse);

  // Update controls (if using OrbitControls)
  controls.update();

  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
