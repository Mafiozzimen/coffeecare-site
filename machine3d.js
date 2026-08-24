// ================= 3D КОФЕМАШИНА (эспрессо-машина) =================
const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2.2, 10);
camera.lookAt(0, 1.4, 0);

/* ==== Материалы ==== */
const steel = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.75, roughness: 0.35 });
const steelLight = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.25 });
const gold = new THREE.MeshStandardMaterial({ color: 0x34d399, metalness: 0.95, roughness: 0.2 });
const dark = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.6 });
const glass = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.3, roughness: 0.1, transparent: true, opacity: 0.35 });
const cream = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });

const machine = new THREE.Group();

/* ==== Корпус ==== */
const body = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 2.2), steel);
body.position.y = 1.6;
machine.add(body);

/* ==== Верхняя крышка (панель с брендом) ==== */
const top = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 2.2), steelLight);
top.position.y = 3.37;
machine.add(top);
const logoBar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.4), gold);
logoBar.position.set(0, 3.6, 1.05);
machine.add(logoBar);

/* ==== Передняя панель управления ==== */
const panel = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.8, 0.08), dark);
panel.position.set(0, 2.9, 1.13);
machine.add(panel);

/* кнопки управления */
for (let i = 0; i < 5; i++) {
  const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), gold);
  btn.rotation.x = Math.PI / 2;
  btn.position.set(-1.5 + i * 0.75, 2.9, 1.2);
  machine.add(btn);
}

/* ==== Дисплей (светится) ==== */
const screen = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.4, 0.05), new THREE.MeshStandardMaterial({
  color: 0x1a5c2a, emissive: 0x2a9e4a, emissiveIntensity: 0.8, roughness: 0.3
}));
screen.position.set(0, 2.5, 1.16);
machine.add(screen);

/* ==== Группа заваривания (рожок + холдер) ==== */
const groupHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.5, 24), steelLight);
groupHousing.rotation.x = Math.PI / 2;
groupHousing.position.set(-0.6, 1.15, 1.05);
machine.add(groupHousing);

const portafilter = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.2, 0.5, 24), gold);
portafilter.rotation.x = Math.PI / 2;
portafilter.position.set(-0.6, 0.85, 1.2);
machine.add(portafilter);

const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 12), dark);
handle.rotation.z = Math.PI / 2;
handle.position.set(-0.6, 0.6, 1.6);
machine.add(handle);

/* ==== Вторая группа ==== */
const groupHousing2 = groupHousing.clone();
groupHousing2.position.set(0.6, 1.15, 1.05);
machine.add(groupHousing2);
const portafilter2 = portafilter.clone();
portafilter2.position.set(0.6, 0.85, 1.2);
machine.add(portafilter2);

/* ==== Паровой кран ==== */
const steam = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 12), steelLight);
steam.rotation.x = Math.PI / 2 - 0.5;
steam.position.set(1.6, 1.4, 1.2);
machine.add(steam);
const steamTip = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8), gold);
steamTip.rotation.x = Math.PI / 2 - 0.5;
steamTip.position.set(1.85, 1.15, 1.3);
machine.add(steamTip);

/* ==== Бункер для зёрен (сверху) ==== */
const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.9, 24), glass);
hopper.position.set(1.2, 3.9, 0);
machine.add(hopper);
const hopperLid = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.08, 24), gold);
hopperLid.position.set(1.2, 4.35, 0);
machine.add(hopperLid);

/* ==== Поддон с решёткой ==== */
const tray = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.25, 2.4), steelLight);
tray.position.y = 0.15;
machine.add(tray);
const grate = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.6), dark);
grate.position.set(0, 0.3, 0.4);
machine.add(grate);

/* ==== Чашка с кофе ==== */
const cup = new THREE.Group();
const cupBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.7, 24), cream);
cupBody.position.y = 0.35;
cup.add(cupBody);
const cupHandle = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 12, 24, Math.PI * 1.2), cream);
cupHandle.position.set(0.42, 0.35, 0);
cup.add(cupHandle);
const coffeeSurface = new THREE.Mesh(new THREE.CircleGeometry(0.29, 24), new THREE.MeshStandardMaterial({ color: 0x3a2410, roughness: 0.9 }));
coffeeSurface.rotation.x = -Math.PI / 2;
coffeeSurface.position.y = 0.7;
cup.add(coffeeSurface);
cup.position.set(-0.6, 0.5, 1.9);
machine.add(cup);

/* ==== Пар из чашки ==== */
const steamParticles = 150;
const steamGeo = new THREE.BufferGeometry();
const posArr = new Float32Array(steamParticles * 3);
const seeds2 = [];
for (let i = 0; i < steamParticles; i++) {
  posArr[i*3] = -0.6 + (Math.random() - 0.5) * 0.4;
  posArr[i*3+1] = 1 + Math.random() * 1.6;
  posArr[i*3+2] = 1.9 + (Math.random() - 0.5) * 0.4;
  seeds2.push({ speed: 0.3 + Math.random() * 0.6, phase: Math.random() * Math.PI * 2 });
}
steamGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
const steamMat2 = new THREE.PointsMaterial({ color: 0xe8d9c0, size: 0.045, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
const steamCloud = new THREE.Points(steamGeo, steamMat2);
machine.add(steamCloud);

machine.position.x = 2.2;
machine.position.y = -0.3;
scene.add(machine);

/* ==== Парящие зёрна ==== */
const beans = new THREE.Group();
for (let i = 0; i < 16; i++) {
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.09 + Math.random() * 0.06, 16, 12), new THREE.MeshStandardMaterial({ color: 0x5a3a1a, metalness: 0.4, roughness: 0.7 }));
  b.scale.y = 0.55;
  b.position.set((Math.random() - 0.5) * 8 - 1, 0.8 + Math.random() * 4, (Math.random() - 0.5) * 4 - 1);
  b.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  b.userData = { speed: 0.15 + Math.random() * 0.3, phase: Math.random() * Math.PI * 2 };
  beans.add(b);
}
scene.add(beans);

/* ==== Освещение ==== */
scene.add(new THREE.AmbientLight(0xfff2dc, 0.55));
const keyLight = new THREE.DirectionalLight(0x9be8c8, 1.6);
keyLight.position.set(5, 7, 6);
scene.add(keyLight);
const rimL = new THREE.DirectionalLight(0x34d399, 1.0);
rimL.position.set(-5, 3, -5);
scene.add(rimL);
const backL = new THREE.DirectionalLight(0x0e9f6e, 0.6);
backL.position.set(0, 4, -6);
scene.add(backL);

/* ==== Параллакс и анимация ==== */
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // параллакс
  camera.position.x += (mouseX * 0.8 - camera.position.x + 0) * 0.04;
  camera.position.y += (2.2 - mouseY * 0.4 - camera.position.y) * 0.04;
  camera.lookAt(0, 1.4, 0);

  // вращение машины
  machine.rotation.y = Math.sin(t * 0.25) * 0.12 + mouseX * 0.08;
  machine.position.y = -0.3 + Math.sin(t * 0.8) * 0.05;

  // пар
  const sp = steamCloud.geometry.attributes.position;
  for (let i = 0; i < steamParticles; i++) {
    const s = seeds2[i];
    sp.array[i*3+1] += s.speed * 0.012;
    sp.array[i*3] += Math.sin(t * s.speed + s.phase) * 0.004;
    if (sp.array[i*3+1] > 2.8) sp.array[i*3+1] = 1.0;
  }
  sp.needsUpdate = true;

  // зёрна
  beans.children.forEach((b) => {
    b.position.y += Math.sin(t * b.userData.speed + b.userData.phase) * 0.003;
    b.rotation.x += 0.003;
    b.rotation.z += 0.002;
  });

  // логотип мерцает
  logoBar.material.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.2;

  renderer.render(scene, camera);
}
animate();

