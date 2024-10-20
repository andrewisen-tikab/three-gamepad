import "../styles.css";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import CameraControls from "camera-controls";
import GUI from "lil-gui";

import { GamepadCameraControls } from "../../../src";
import type { XboxGamepadParams } from "../../../src/types";

CameraControls.install({ THREE });
GamepadCameraControls.install({ THREE });

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();

const clock = new THREE.Clock();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfcfcf);

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
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add(new THREE.AxesHelper(5));
scene.add(new THREE.GridHelper(10, 10));

const cameraControls = new GamepadCameraControls(camera, renderer.domElement);
cameraControls.setPosition(0, 5, 5);

function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);

  cube.rotation.x += delta;
  cube.rotation.y += delta;

  stats.update();

  renderer.render(scene, camera);
}

Object.entries(cameraControls.events).forEach(([key, value]) => {
  cameraControls.events[key].addEventListener("before", () => {
    console.log(`${key} --- BEFORE`);
  });
  cameraControls.events[key].addEventListener("after", () => {
    console.log(`${key} --- AFTER`);
  });
});
