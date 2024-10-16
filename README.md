# three-gamepad

`three-gamepad` is a simple library that allows you to use a gamepad to control a camera in a [three.js](https://threejs.org/) scene.
It also features a drop-in replacement for the [camera-controls](https://github.com/yomotsu/camera-controls) class that allows you to use a gamepad to control the camera.

## Installation

TODO:

## Usage

```ts
import * as THREE from "three";
import { GamepadCameraControls } from "three-gamepad";
const cameraControls = new GamepadCameraControls(camera, renderer.domElement);

GamepadCameraControls.install({ THREE });
```

## Demo

A live demo can be found at:
[https://andrewisen-tikab.github.io/three-gamepad/examples/](https://andrewisen-tikab.github.io/three-gamepad/examples/).
