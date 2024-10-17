import { type GamePadParams } from "./types";

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
