import { type GamePadParams, XboxGamepadParams } from "./types";

export const DEFAULT_GAMEPAD_PARAMS = {
  rightStickXThreshold: 0.1,
  rightStickYThreshold: 0.1,
  leftStickXThreshold: 0.1,
  leftStickYThreshold: 0.1,
  rightTriggerThreshold: 0.1,
  leftTriggerThreshold: 0.1,
  rotateDelta: 0.02,
  forwardDelta: 0.05,
  sidewaysDelta: 0.05,
  dollyDelta: 0.1,
  elevateDelta: 0.1,
} as const satisfies GamePadParams;

export const DEFAULT_XBOX_GAMEPAD_PARAMS = {
  leftTrigger: 0,
  rightTrigger: 0,
  right: false,
  left: false,
  up: false,
  down: false,
  a: false,
  b: false,
  x: false,
  y: false,
  leftBumper: false,
  rightBumper: false,
  leftStickX: 0,
  leftStickY: 0,
  rightStickX: 0,
  rightStickY: 0,
  start: false,
  back: false,
  leftStick: false,
  rightStick: false,
} as const satisfies XboxGamepadParams;
