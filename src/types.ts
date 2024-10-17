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
