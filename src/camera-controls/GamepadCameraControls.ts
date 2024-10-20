import CameraControls from "camera-controls";
import { type THREESubset } from "camera-controls/dist/types";
import * as THREE from "three";
import type { GamePadParams, XboxGamepadParams } from "../types";
import {
  DEFAULT_GAMEPAD_PARAMS,
  DEFAULT_XBOX_GAMEPAD_PARAMS,
} from "../constants";

let _v3A: THREE.Vector3;
let _v3B: THREE.Vector3;

/**
 * GamepadCameraControls extends the CameraControls class to provide camera control
 * using a gamepad. It listens for gamepad connection and disconnection events and
 * processes gamepad input to control the camera's rotation, movement, zoom, and elevation.
 *
 * @extends CameraControls
 */
export class GamepadCameraControls extends CameraControls {
  private _gamepadIndex: number | null = null;

  private _disposableEvents: Array<Function> = [];

  static install(libs: { THREE: THREESubset }): void {
    _v3A = new libs.THREE.Vector3();
    _v3B = new libs.THREE.Vector3();
    CameraControls.install({ THREE: libs.THREE });
  }

  public params: GamePadParams;

  public state: XboxGamepadParams;

  constructor(
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    domElement: HTMLElement,
    params: GamePadParams = DEFAULT_GAMEPAD_PARAMS
  ) {
    super(camera, domElement);
    this.params = params;
    this.state = DEFAULT_XBOX_GAMEPAD_PARAMS;

    const onGamepadConnected = (event: GamepadEvent) => {
      console.log("Gamepad connected:", event.gamepad);
      this._gamepadIndex = event.gamepad.index;
    };

    const onGamepadDisconnect = () => {
      console.log("Gamepad disconnected");
      this._gamepadIndex = null;
    };

    window.addEventListener("gamepadconnected", onGamepadConnected);
    this._disposableEvents.push(() => {
      window.removeEventListener("gamepadconnected", onGamepadConnected);
    });

    window.addEventListener("gamepaddisconnected", onGamepadDisconnect);
    this._disposableEvents.push(() => {
      window.removeEventListener("gamepaddisconnected", onGamepadDisconnect);
    });
  }

  /**
   * Checks if a gamepad is connected.
   *
   * @returns {boolean} `true` if a gamepad is connected, otherwise `false`.
   */
  public hasGamepad(): boolean {
    return this._gamepadIndex !== null;
  }

  /**
   * Handles gamepad input to control the camera.
   *
   * @param _delta - The time delta since the last update.
   *
   * This method processes the input from a connected gamepad to control the camera's
   * rotation, movement, zoom, and elevation. It reads the state of the gamepad's
   * sticks, triggers, and bumpers to determine the appropriate actions.
   *
   * - Right stick controls camera rotation.
   * - Left stick controls forward and sideways movement.
   * - Right trigger controls zooming in.
   * - Left trigger controls zooming out.
   * - Right bumper controls moving up.
   * - Left bumper controls moving down.
   *
   * The method applies thresholds to stick and trigger inputs to avoid unintentional
   * movements due to slight stick or trigger deflections.
   */
  private _handleGamepadInput(_delta: number) {
    const gamepad = navigator.getGamepads()[this._gamepadIndex!];
    if (!gamepad) return;

    // const moveSpeed = 0.1;
    const {
      rightStickXThreshold,
      rightStickYThreshold,
      leftStickXThreshold,
      leftStickYThreshold,
    } = this.params;

    const {
      rotateDelta,
      forwardDelta,
      sidewaysDelta,
      dollyDelta,
      elevateDelta,
    } = this.params;

    this.state.rightTrigger = gamepad.buttons[7].value; // Right Trigger
    this.state.leftTrigger = gamepad.buttons[6].value; // Left Trigger
    this.state.rightBumper = gamepad.buttons[5].pressed; // Right Bumper
    this.state.leftBumper = gamepad.buttons[4].pressed; // Left Bumper

    this.state.a = gamepad.buttons[0].pressed; // Button A
    this.state.b = gamepad.buttons[1].pressed; // Button B
    this.state.x = gamepad.buttons[2].pressed; // Button X
    this.state.y = gamepad.buttons[3].pressed; // Button Y

    this.state.up = gamepad.buttons[12].pressed; // D-Pad Up
    this.state.down = gamepad.buttons[13].pressed; // D-Pad Down
    this.state.left = gamepad.buttons[14].pressed; // D-Pad Left
    this.state.right = gamepad.buttons[15].pressed; // D-Pad Right

    this.state.rightStick = gamepad.buttons[10].pressed; // Right Stick
    this.state.rightStickX = gamepad.axes[2]; // Right Stick X
    this.state.rightStickY = gamepad.axes[3]; // Right Stick Y

    this.state.leftStick = gamepad.buttons[11].pressed; // Left Stick
    this.state.leftStickX = gamepad.axes[0]; // Left Stick X
    this.state.leftStickY = gamepad.axes[1]; // Left Stick Y

    this.state.start = gamepad.buttons[9].pressed; // Start
    this.state.back = gamepad.buttons[8].pressed; // Back

    // Rotate camera based on stick input
    if (
      Math.abs(this.state.rightStickX) > rightStickXThreshold ||
      Math.abs(this.state.rightStickY) > rightStickYThreshold
    ) {
      this.rotate(
        -this.state.rightStickX * rotateDelta,
        -this.state.rightStickY * rotateDelta,
        true
      );
    }
    if (
      Math.abs(this.state.leftStickX) > leftStickXThreshold ||
      Math.abs(this.state.leftStickY) > leftStickYThreshold
    ) {
      this.forward(-this.state.leftStickY * forwardDelta, true);
      this.sideways(this.state.leftStickX * sidewaysDelta, true);
    }

    // Zoom in and out based on trigger values
    if (this.state.rightTrigger > 0.1) {
      // Zoom in
      this.dolly(this.state.rightTrigger * dollyDelta, true);
    }
    if (this.state.leftTrigger > 0.1) {
      // Zoom out
      this.dolly(-this.state.leftTrigger * dollyDelta, true);
    }

    // Move up and down based on bumper values
    if (this.state.rightBumper) {
      // Move up
      this.elevate(elevateDelta, true);
    }
    if (this.state.leftBumper) {
      // Move down
      this.elevate(-elevateDelta, true);
    }
  }

  /**
   * Update camera position and directions.
   * This should be called in your tick loop every time, and returns true if re-rendering is needed.
   * @param delta
   * @returns updated
   * @category Methods
   */
  public update(delta: number) {
    if (this._gamepadIndex !== null) {
      this._handleGamepadInput(delta);
    }

    const updated = super.update(delta);
    return updated;
  }

  /**
   * Move sideways
   * @param distance Amount to move sideways. Negative value to move left
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  public sideways(
    distance: number,
    enableTransition: boolean = false
  ): Promise<void> {
    _v3A.setFromMatrixColumn(this._camera.matrix, 0);
    _v3A.multiplyScalar(distance);

    const to = _v3B.copy(this._targetEnd).add(_v3A);
    return this.moveTo(to.x, to.y, to.z, enableTransition);
  }
}
