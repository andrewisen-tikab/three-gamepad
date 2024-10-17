/**
 * Represents the threshold values for the gamepad's analog sticks.
 * These thresholds determine the sensitivity of the right and left sticks
 * along the X and Y axes.
 */
export type Thresholds = {
  /**
   * The threshold value for the right stick's X-axis.
   */
  rightStickXThreshold: number;
  /**
   * The threshold value for the right stick's Y-axis.
   */
  rightStickYThreshold: number;
  /**
   * The threshold value for the left stick's X-axis.
   */
  leftStickXThreshold: number;
  /**
   * The threshold value for the left stick's Y-axis.
   */
  leftStickYThreshold: number;
  /**
   * The threshold value for the right trigger.
   */
  rightTriggerThreshold: number;
  /**
   * The threshold value for the left trigger.
   */
  leftTriggerThreshold: number;
};

/**
 * Represents the delta values for the right and left gamepad sticks.
 */
export type Deltas = {
  /**
   * The amount to rotate the camera based on the right stick's input.
   */
  rotateDelta: number;
  /**
   * The amount to move the camera forward based on the left stick's input.
   */
  forwardDelta: number;
  /**
   * The amount to move the camera sideways based on the left stick's input.
   */
  sidewaysDelta: number;
  /**
   * The amount to zoom the camera in and out based on the trigger values.
   */
  dollyDelta: number;
  /**
   * The amount to elevate the camera based on the right stick's input.
   */
  elevateDelta: number;
};

/**
 * Represents the parameters for a gamepad, combining thresholds and deltas.
 */
export type GamePadParams = Thresholds & Deltas;

/**
 * Represents the state of the face buttons on an Xbox gamepad.
 */
export type XboxGamePadFaceButtons = {
  /**
   * Indicates whether the 'A' button is pressed.
   */
  a: boolean;
  /**
   * Indicates whether the 'B' button is pressed.
   */
  b: boolean;
  /**
   * Indicates whether the 'X' button is pressed.
   */
  x: boolean;
  /**
   * Indicates whether the 'Y' button is pressed.
   */
  y: boolean;
};

/**
 * Represents the state of the D-Pad on an Xbox gamepad.
 */
export type XboxGamePadDPad = {
  /**
   * Indicates if the up direction is pressed.
   */
  up: boolean;
  /**
   * Indicates if the down direction is pressed.
   */
  down: boolean;
  /**
   * Indicates if the left direction is pressed.
   */
  left: boolean;
  /**
   * Indicates if the right direction is pressed.
   */
  right: boolean;
};

export type XboxGamePadTriggers = {
  /**
   * The value of the left trigger.
   */
  left: number;
  /**
   * The value of the right trigger.
   */
  right: number;
};

export type XboxGamePadSticks = {
  /**
   * The value of the left stick along the X-axis.
   */
  leftX: number;
  /**
   * The value of the left stick along the Y-axis.
   */
  leftY: number;
  /**
   * The value of the right stick along the X-axis.
   */
  rightX: number;
  /**
   * The value of the right stick along the Y-axis.
   */
  rightY: number;
};

export type XboxGamePadShoulderButtons = {
  /**
   * Indicates if the left shoulder button is pressed.
   */
  left: boolean;
  /**
   * Indicates if the right shoulder button is pressed.
   */
  right: boolean;
};

/**
 * Represents the parameters for an Xbox gamepad, combining various button and control types.
 *
 * @typedef {XboxGamePadFaceButtons & XboxGamePadDPad & XboxGamePadTriggers & XboxGamePadSticks & XboxGamePadShoulderButtons} XboxGamepadParams
 *
 * @property {XboxGamePadFaceButtons} faceButtons - The face buttons on the Xbox gamepad.
 * @property {XboxGamePadDPad} dPad - The directional pad (D-Pad) on the Xbox gamepad.
 * @property {XboxGamePadTriggers} triggers - The trigger buttons on the Xbox gamepad.
 * @property {XboxGamePadSticks} sticks - The analog sticks on the Xbox gamepad.
 * @property {XboxGamePadShoulderButtons} shoulderButtons - The shoulder buttons on the Xbox gamepad.
 */
export type XboxGamepadParams = XboxGamePadFaceButtons &
  XboxGamePadDPad &
  XboxGamePadTriggers &
  XboxGamePadSticks &
  XboxGamePadShoulderButtons;
