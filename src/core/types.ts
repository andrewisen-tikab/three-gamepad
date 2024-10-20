/**
 * Interface representing the controls for a gamepad camera.
 */
export type AbstractGamepadCameraControls = {
  /**
   * Retrieves the index of the connected gamepad.
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
};
