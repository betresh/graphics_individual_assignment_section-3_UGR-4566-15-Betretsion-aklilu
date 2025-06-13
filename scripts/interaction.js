import * as THREE from '../libs/three.module.js';

export function handleInteraction(renderer, scene, camera, tableGroup) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Create info panel div if not already present
  let infoPanel = document.getElementById('infoPanel');
  if (!infoPanel) {
    infoPanel = document.createElement('div');
    infoPanel.id = 'infoPanel';
    Object.assign(infoPanel.style, {
      position: 'fixed',
      padding: '6px 10px',
      background: 'rgba(255, 255, 255, 0.8)',  // light background for black text
      color: 'black',    
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      borderRadius: '4px',
      pointerEvents: 'none',
      display: 'none',
      whiteSpace: 'nowrap',
      zIndex: 1000,
    });
    document.body.appendChild(infoPanel);
  }

  let prevHovered = null;
  let clickTimeout = null;

  function clearHover() {
    if (prevHovered) {
      prevHovered.scale.set(1, 1, 1);
      prevHovered.material.emissive.setHex(0x000000);
      prevHovered = null;
      infoPanel.style.display = 'none';
    }
  }

  renderer.domElement.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(tableGroup.children, true);

    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      if (hovered !== prevHovered) {
        clearHover();
        prevHovered = hovered;
        hovered.scale.set(1.1, 1.1, 1.1);
        hovered.material.emissive.setHex(0x444444);

        // Show info panel and position near cursor
        infoPanel.textContent = `Part: ${hovered.name}`;
        infoPanel.style.display = 'block';
      }

      // Update panel position to follow mouse (with offset)
      infoPanel.style.left = `${event.clientX + 12}px`;
      infoPanel.style.top = `${event.clientY + 12}px`;
    } else {
      clearHover();
    }
  });

  renderer.domElement.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(tableGroup.children, true);

    if (intersects.length > 0) {
      const clicked = intersects[0].object;

      // Clear previous click timeout if any
      if (clickTimeout) clearTimeout(clickTimeout);

      // Store original scale and color
      const originalScale = clicked.scale.clone();
      const originalColor = clicked.material.color.clone();

      clicked.scale.set(1.3, 1.3, 1.3);
      clicked.material.color.set(0xff0000);

      // Show panel at click position with part name
      infoPanel.textContent = `Clicked: ${clicked.name}`;
      infoPanel.style.left = `${event.clientX + 12}px`;
      infoPanel.style.top = `${event.clientY + 12}px`;
      infoPanel.style.display = 'block';

      // Revert after 800ms and hide panel
      clickTimeout = setTimeout(() => {
        clicked.scale.copy(originalScale);
        clicked.material.color.copy(originalColor);
        infoPanel.style.display = 'none';
      }, 800);
    }
  });
}
