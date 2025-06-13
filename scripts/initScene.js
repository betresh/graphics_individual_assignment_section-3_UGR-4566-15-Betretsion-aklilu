import * as THREE from '../libs/three.module.js';
import { OrbitControls } from '../libs/controls/OrbitControls.js';

export function initScene() {
  // Create a new Three.js scene
  const scene = new THREE.Scene();

  // Set up a perspective camera
  const camera = new THREE.PerspectiveCamera(
    60,                                 // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                // Near clipping plane
    100                                 // Far clipping plane
  );
  camera.position.set(5, 5, 5); // Set initial camera position
  camera.lookAt(0, 0, 0);       // Look at the origin

  // Set up the WebGL renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight); // Match screen size
  renderer.setClearColor(0xffffff, 1); // Set background color to white
  renderer.shadowMap.enabled = true;   // Enable shadows
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadow type
  document.body.appendChild(renderer.domElement); // Add canvas to the document

  // Add orbit controls to allow user to rotate around the product
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth movement
  controls.target.set(0, 0, 0);  // Focus on the center
  controls.update();

  // Handle window resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Return the main objects to be used in the main app
  return { scene, camera, renderer, controls };
}
