import { Emitter } from '../Emitter';
import { AnimatedOptions, AnimatedCallback, Events } from './types';

export function createAnimate() {
  const event = new Emitter<Events>();
  let startId = -1;
  let moveId = -1;
  let endId = -1;
  let value = 0;

  function animated({ to, from, duration = 1000, friction = 1, reverseEasing = false, easing, onStart, onUpdate, onEnd }: AnimatedOptions) {
    let start: number | null = null;
    let timeId = -1;
    let animationFrameId = -1;
    value = from;

    onStart?.(value);
    event.emit('start', value);

    cancelAnimationFrame(animationFrameId);

    function step(timestamp: DOMHighResTimeStamp) {
      if (!start) {
        start = timestamp;
      }

      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      value = from + (to - from) * percentage * friction;

      if (typeof easing === 'function') {
        if (reverseEasing) {
          value = from + (to - from) * (1 - easing(1 - percentage));
        } else {
          value = from + (to - from) * easing(percentage);
        }
      }

      event.emit('update', value);
      onUpdate?.(value);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    timeId = window.setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeId);
      value = to;
      onUpdate?.(value);
      onEnd?.(value);
      event.emit('update', value);
      event.emit('end', value);
    }, duration);

    return () => {
      clearTimeout(timeId);
      cancelAnimationFrame(animationFrameId);
    };
  }

  animated.onStart = (onStart: AnimatedCallback) => {
    startId = event.on('start', onStart);
    return () => event.off(startId);
  };
  animated.onUpdate = (onUpdate: AnimatedCallback) => {
    moveId = event.on('update', onUpdate);
    return () => event.off(moveId);
  };
  animated.onEnd = (onEnd: AnimatedCallback) => {
    endId = event.on('end', onEnd);
    return () => event.off(endId);
  };
  animated.off = () => {
    event.off(startId);
    event.off(moveId);
    event.off(endId);
  };
  animated.getValue = () => value;

  return animated;
}

export type CreateAnimate = ReturnType<typeof createAnimate>;
