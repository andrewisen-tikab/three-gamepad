import "./styles.css";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import CameraControls from "camera-controls";

CameraControls.install({ THREE });

const stats = new Stats();
document.body.appendChild(stats.dom);

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const cameraControls = new CameraControls(camera, renderer.domElement);
cameraControls.setPosition(0, 0, 5);

function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);

  cube.rotation.x += delta;
  cube.rotation.y += delta;

  stats.update();

  renderer.render(scene, camera);
}
