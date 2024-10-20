/**
 * Triggered every cycle, while the button/joystick is pressed/active.
 */
export type OnEvent = "on";
/**
 * Triggered before the button/joystick is pressed/active.
 */
export type BeforeEvent = "before";
/**
 * Triggered after the button/joystick is released/inactive.
 */
export type AfterEvent = "after";

export type EventType = OnEvent | BeforeEvent | AfterEvent;

export type Listener = (event?: DispatcherEvent) => void;

export interface DispatcherEvent {
  type: EventType;
}

export class EventDispatcher {
  private _listeners: { [type: string]: Listener[] } = {};

  /**
   * Adds the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(type: string, listener: Listener): void {
    const listeners = this._listeners;

    if (listeners[type] === undefined) listeners[type] = [];

    if (listeners[type].indexOf(listener) === -1)
      listeners[type].push(listener);
  }

  /**
   * Presence of the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  hasEventListener(type: EventType, listener: Listener): boolean {
    const listeners = this._listeners;

    return (
      listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1
    );
  }

  /**
   * Removes the specified event listener
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(type: EventType, listener: Listener): void {
    const listeners = this._listeners;
    const listenerArray = listeners[type];

    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener);

      if (index !== -1) listenerArray.splice(index, 1);
    }
  }

  /**
   * Removes all event listeners
   * @param type event name
   * @category Methods
   */
  removeAllEventListeners(type?: EventType): void {
    if (!type) {
      this._listeners = {};
      return;
    }

    if (Array.isArray(this._listeners[type])) this._listeners[type].length = 0;
  }

  /**
   * Fire an event type.
   * @param event DispatcherEvent
   * @category Methods
   */
  dispatchEvent(event: DispatcherEvent): void {
    const listeners = this._listeners;
    const listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      // @ts-ignore
      event.target = this;
      const array = listenerArray.slice(0);

      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
    }
  }
}
