import { EventDispatcher } from "./EventDispatcher";

/**
 * A collection of event dispatchers for various gamepad buttons and controls.
 * Each property corresponds to a specific gamepad button or control and is an instance of `EventDispatcher`.
 */
export const Events = {
  a: new EventDispatcher(),
  b: new EventDispatcher(),
  x: new EventDispatcher(),
  y: new EventDispatcher(),
  up: new EventDispatcher(),
  down: new EventDispatcher(),
  left: new EventDispatcher(),
  right: new EventDispatcher(),
  leftTrigger: new EventDispatcher(),
  rightTrigger: new EventDispatcher(),
  leftBumper: new EventDispatcher(),
  rightBumper: new EventDispatcher(),
  leftStick: new EventDispatcher(),
  rightStick: new EventDispatcher(),
  start: new EventDispatcher(),
  back: new EventDispatcher(),
} as const;
