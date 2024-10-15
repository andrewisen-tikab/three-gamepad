import CameraControls from "camera-controls";
import * as THREE from "three";
export type THREESubset = {
  Vector3: typeof THREE.Vector3;
  [key: string]: any;
};

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
  }

  constructor(
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    domElement: HTMLElement
  ) {
    super(camera, domElement);

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

    const rightStickX = gamepad.axes[2];
    const rightStickY = gamepad.axes[3];

    const leftStickX = gamepad.axes[0];
    const leftStickY = gamepad.axes[1];

    // const moveSpeed = 0.1;
    const stickThreshold = 0.1;

    const rt = gamepad.buttons[7].value; // Right Trigger
    const lt = gamepad.buttons[6].value; // Left Trigger

    const rb = gamepad.buttons[5].value; // Right Bumper
    const lb = gamepad.buttons[4].value; // Left Bumper

    // Rotate camera based on stick input
    if (
      Math.abs(rightStickX) > stickThreshold ||
      Math.abs(rightStickY) > stickThreshold
    ) {
      this.rotate(-rightStickX * 0.02, -rightStickY * 0.02, true);
    }
    if (
      Math.abs(leftStickX) > stickThreshold ||
      Math.abs(leftStickY) > stickThreshold
    ) {
      this.forward(-leftStickY * 0.05, true);
      this.sideways(leftStickX * 0.05, true);
    }

    // this.dolly(-rightStickY * 0.05, true);

    // Zoom in and out based on trigger values
    if (rt > 0.1) {
      // Zoom in
      this.dolly(rt * 0.05, true);
    }
    if (lt > 0.1) {
      // Zoom out
      this.dolly(-lt * 0.05, true);
    }

    // Move up and down based on bumper values
    if (rb > 0.1) {
      // Move up
      this.elevate(rb * 0.01, true);
    }
    if (lb > 0.1) {
      // Move down
      this.elevate(-lb * 0.01, true);
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
