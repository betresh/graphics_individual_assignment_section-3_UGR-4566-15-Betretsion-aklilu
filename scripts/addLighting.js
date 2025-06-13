import * as THREE from '../libs/three.module.js';

export function addLighting(scene) {
  // Add ambient light for general illumination (soft light from all directions)
  scene.add(new THREE.AmbientLight(0xffffff, 0.8)); // White light, 80% intensity

  // Create a directional light to simulate sunlight or a spotlight
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8); // White directional light
  dirLight.position.set(5, 10, 7); // Position the light in the scene

  // Enable shadows from this light
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(1024, 1024); 

  // Add the directional light to the scene
  scene.add(dirLight);

  //  visualize the light direction with a helper
  const helper = new THREE.DirectionalLightHelper(dirLight, 1);
  scene.add(helper);
}
