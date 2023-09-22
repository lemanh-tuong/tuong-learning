import { CreateEvents } from '../Emitter';
import { Easing } from '../easings';

/**
 * Defining the type for the callback that is passed into the onStart, onUpdate, and onEnd functions.
 */
export type AnimatedCallback = (val: number) => void;

/**
 * Defining the interface for the options that can be passed into the createAnimated function.
 */
export interface AnimatedOptions {
  /**
   * The value to animate to.
   */
  to: number;
  /**
   * The value to animate from.
   */
  from: number;
  /**
   * The duration of the animation in milliseconds.
   * @default 1000
   */
  duration?: number;
  reverseEasing?: boolean;
  easing?: Easing;
  /**
   * The amount of friction to apply to the animation.
   * @default 0
   */
  friction?: number;
  /**
   * A callback that is called when the animation starts.
   * @param {number} value - The value of the animation at the start.
   * @returns void
   */
  onStart?: AnimatedCallback;
  /**
   * A callback that is called when the animation updates.
   * @param {number} value - The value of the animation at the current update.
   * @returns void
   */
  onUpdate?: AnimatedCallback;
  /**
   * A callback that is called when the animation ends.
   * @param {number} value - The value of the animation at the end.
   * @returns void
   */
  onEnd?: AnimatedCallback;
}

/* Defining the type for the callback that is passed into the onStart, onUpdate, and onEnd functions. */
export type Events = CreateEvents<{
  start: AnimatedCallback;
  update: AnimatedCallback;
  end: AnimatedCallback;
}>;
