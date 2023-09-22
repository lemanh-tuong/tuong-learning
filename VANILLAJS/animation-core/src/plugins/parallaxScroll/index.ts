import { ParallaxScroll } from './parallaxScroll';
import { DefaultKeyframes, ParallaxScrollOptions } from './types';
import './styles.scss';

export { lerp } from './lerp';
export * from './types';

export function parallaxScroll<T extends Record<string, any> = DefaultKeyframes>(options = {} as ParallaxScrollOptions<T>) {
  return new ParallaxScroll<T>(options);
}

export { ParallaxScroll };
