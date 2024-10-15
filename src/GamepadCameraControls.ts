import CameraControls from "camera-controls";
import * as THREE from "three";

export class GamepadCameraControls extends CameraControls {
  private _gamepadIndex: number | null = null;

  private _disposableEvents: Array<Function> = [];

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

  public hasGamepad(): boolean {
    return this._gamepadIndex !== null;
  }

  public update(delta: number) {}
}
