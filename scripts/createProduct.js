import * as THREE from '../libs/three.module.js';

export function createProduct(scene) {
  const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });

  const tableGroup = new THREE.Group();

  const tabletop = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 2), material);
  tabletop.position.set(0, 0.5, 0);
  tabletop.name = 'Table Top';
  tableGroup.add(tabletop);


  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
  const legY = 0.5 / 2;
  const legPositions = [
    [-1.3, -0.1, -0.8],
    [1.3, -0.1, -0.8],
    [-1.3, -0.1, 0.8],
    [1.3, -0.1, 0.8],
  ];

  legPositions.forEach((pos, i) => {
    const leg = new THREE.Mesh(legGeometry, material);
    leg.position.set(...pos);
    leg.name = `Leg ${i + 1}`;
    tableGroup.add(leg);
  });
  
const box = new THREE.Box3().setFromObject(tableGroup);
  const center = new THREE.Vector3();
  box.getCenter(center);
  tableGroup.position.sub(center); // shift so center is at origin
  const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({ opacity: 0.3 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1; // or slightly below your table
ground.receiveShadow = true;
scene.add(ground);

  scene.add(tableGroup);
tableGroup.traverse(obj => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});

  return tableGroup;
  
}
