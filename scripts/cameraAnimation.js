export function animateCamera(camera, time) {
  const radius = 5;
  const speed = 0.001;
  const angle = time * speed;

  camera.position.x = radius * Math.cos(angle);
  camera.position.z = radius * Math.sin(angle);
  camera.position.y = 2;
  camera.lookAt(0, 0, 0);

}
