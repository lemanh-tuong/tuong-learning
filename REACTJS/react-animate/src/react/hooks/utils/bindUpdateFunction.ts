import {
  AnimationFunction,
  ComputedTimingContext,
} from "../useAnimationFunction";

export const bindUpdateFunction = <Args>(
  animation: Animation,
  getUpdateFunction: () => AnimationFunction<Args>,
  args: Args
) => {
  const update = () => {
    const timing = animation.effect?.getComputedTiming();
    if (!timing) return;
    const progress = timing.progress;
    if (progress != null) {
      getUpdateFunction()(timing as ComputedTimingContext, args);
    }
    if (animation.playState === "running") {
      requestAnimationFrame(update);
    }
  };
  animation.ready.then(update);
};
