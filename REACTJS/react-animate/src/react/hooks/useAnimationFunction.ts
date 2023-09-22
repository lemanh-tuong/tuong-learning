import { useEffect } from "react";
import { isSameObject } from "../../core/utils";
import {
  TypedKeyframeEffectOptions,
  createAnimation,
  _cancel,
  _waitFor,
  _finish,
  _pause,
  _play,
  _reverse,
  _setRate,
  _setTime,
  WaitingAnimationEventName,
} from "../../core/waapi";
import type { BaseAnimationHandle } from "./useAnimation";
import { useStatic } from "./useStatic";
import { useLatestRef } from "./useLatestRef";
import { bindUpdateFunction } from "./utils/bindUpdateFunction";

/**
 * Handle of {@link useAnimationFunction}.
 * @typeParam Args - argument type
 */
export interface AnimationFunctionHandle<Args = void>
  extends BaseAnimationHandle<Args> {}

export interface AnimationFunctionOptions extends TypedKeyframeEffectOptions {}

/**
 * Non nullable [ComputedEffectTiming](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEffect/getComputedTiming)
 */
export type ComputedTimingContext = Required<{
  [key in keyof ComputedEffectTiming]: NonNullable<ComputedEffectTiming[key]>;
}>;

/**
 * An argument of {@link useAnimationFunction}.
 * In this callback you can update any state or ref in JS.
 * - `ctx`: current animation state
 * - `args`: any argument passed from play
 */
export type AnimationFunction<Args = void> = Args extends void
  ? (ctx: ComputedTimingContext) => void
  : (ctx: ComputedTimingContext, args: Args) => void;

/**
 * Same as {@link useAnimation}, but it drives function not React element. See {@link AnimationFunctionHandle}.
 * @typeParam Args - argument type
 */
export const useAnimationFunction = <Args = void>(
  onUpdate: AnimationFunction<Args>,
  options?: AnimationFunctionOptions
): AnimationFunctionHandle<Args> => {
  const onUpdateRef = useLatestRef(onUpdate);
  const optionsRef = useLatestRef(options);

  const [handle, cleanup] = useStatic(
    (): [AnimationFunctionHandle<Args>, () => void] => {
      const getOnUpdate = () => onUpdateRef.current;

      let cache: [Animation, AnimationFunctionOptions | undefined] | undefined;
      const initAnimation = (opts: { args?: Args } = {}): Animation => {
        const options = optionsRef.current;
        if (cache) {
          const [prevAnimation, prevOptions] = cache;
          // Reuse animation if possible
          if (isSameObject(options, prevOptions)) {
            if (prevAnimation.playState !== "running") {
              bindUpdateFunction(prevAnimation, getOnUpdate, opts.args!);
            }
            return prevAnimation;
          }
          prevAnimation.cancel();
        }
        const animation = createAnimation(null, null, options);
        bindUpdateFunction(animation, getOnUpdate, opts.args!);
        cache = [animation, options];
        return animation;
      };
      const getAnimation = () => cache?.[0];

      const externalHandle: AnimationFunctionHandle<Args> = {
        play: (...opts) => {
          _play(initAnimation(opts[0] as { args?: Args }), opts[0]);
          return externalHandle;
        },
        reverse: () => {
          _reverse(initAnimation());
          return externalHandle;
        },
        cancel: () => {
          _cancel(getAnimation());
          return externalHandle;
        },
        finish: () => {
          _finish(getAnimation());
          return externalHandle;
        },
        pause: () => {
          _pause(getAnimation());
          return externalHandle;
        },
        setTime: (time) => {
          _setTime(getAnimation(), time);
          return externalHandle;
        },
        setPlaybackRate: (rate) => {
          _setRate(getAnimation(), rate);
          return externalHandle;
        },
        waitFor: (event: WaitingAnimationEventName) =>
          _waitFor(getAnimation(), event).then(() => externalHandle),
      };
      return [externalHandle, externalHandle.cancel];
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);

  return handle;
};
