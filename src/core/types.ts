export type AbstractGamepadCameraControls = {
  getGamepadIndex(): number | null;
  setGamepadIndex(index: number): void;
  /**
   * Checks if a gamepad is connected.
   *
   * @returns {boolean} `true` if a gamepad is connected, otherwise `false`.
   */
  hasGamepad(): boolean;
};
