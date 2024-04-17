import { DependencyList, EffectCallback, useEffect } from 'react';
import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize';

/**
 * `useDeepCompareEffect` Accepts a function that contains imperative, possibly
 * effectful code.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list
 * change.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use useEffect.
 *
 */
export function useDeepCompareEffect(effect: EffectCallback, dependencies: DependencyList) {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies, 'useDeepCompareEffect');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
