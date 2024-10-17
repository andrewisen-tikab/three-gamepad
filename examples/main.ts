import "./styles.css";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import CameraControls from "camera-controls";
import GUI from "lil-gui";

import { GamepadCameraControls } from "../src";
import type { XboxGamepadParams } from "../src/types";

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

type FolderConfig = {
  name: string;
  buttons: { property: keyof XboxGamepadParams; name: string }[];
};

const folderConfigs: FolderConfig[] = [
  {
    name: "Shoulder Buttons",
    buttons: [
      { property: "rightTrigger", name: "Right Trigger" },
      { property: "leftTrigger", name: "Left Trigger" },
      { property: "rightBumper", name: "Right Bumper" },
      { property: "leftBumper", name: "Left Bumper" },
    ],
  },
  {
    name: "Face Buttons",
    buttons: [
      { property: "a", name: "Button A" },
      { property: "b", name: "Button B" },
      { property: "x", name: "Button X" },
      { property: "y", name: "Button Y" },
    ],
  },
  {
    name: "D-Pad",
    buttons: [
      { property: "up", name: "D-Pad Up" },
      { property: "down", name: "D-Pad Down" },
      { property: "left", name: "D-Pad Left" },
      { property: "right", name: "D-Pad Right" },
    ],
  },
  {
    name: "Sticks",
    buttons: [
      { property: "rightStickX", name: "Right Stick X" },
      { property: "rightStickY", name: "Right Stick Y" },
      { property: "leftStickX", name: "Left Stick X" },
      { property: "leftStickY", name: "Left Stick Y" },
    ],
  },
  {
    name: "Misc",
    buttons: [
      { property: "start", name: "Start" },
      { property: "back", name: "Back" },
    ],
  },
];

function addFoldersToGUI(gui, cameraControls, folderConfigs) {
  folderConfigs.forEach((folderConfig) => {
    const folder = gui.addFolder(folderConfig.name);

    folderConfig.buttons.forEach((button) => {
      folder
        .add(cameraControls.state, button.property)
        .name(button.name)
        .disable()
        .listen();
    });
  });
}

addFoldersToGUI(gui, cameraControls, folderConfigs);
