import { type XboxGamepadParams } from "../types";
import { Events } from "./events";

/**
 * Interface representing the controls for a gamepad camera.
 */
export type AbstractGamepadCameraControls = {
  /**
   * Retrieves a list of connected gamepads.
   *
   * @returns {Readonly<Gamepad[]>} An array of connected gamepads.
   */
  getGamepads(): Readonly<Gamepad[]>;
  /**
   * Retrieves the index of the active gamepad.
   */
  getGamepadIndex(): number | null;
  /**
   * Sets the index of the gamepad to be used.
   * @param index
   */
  setGamepadIndex(index: number): void;
  /**
   * Checks if a gamepad is connected.
   *
   * @returns {boolean} `true` if a gamepad is connected, otherwise `false`.
   */
  hasGamepad(): boolean;
  /**
   * The parameters for the gamepad controls.
   */
  state: XboxGamepadParams;
  /**
   * The events associated with the gamepad controls.
   */
  events: typeof Events;
};
