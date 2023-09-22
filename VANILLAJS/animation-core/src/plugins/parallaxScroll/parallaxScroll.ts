import { ParallaxScrollItem } from './item';
import { DefaultKeyframes, ParallaxScrollItemOptions, ParallaxScrollOptions } from './types';

export class ParallaxScroll<T extends Record<string, any> = DefaultKeyframes> {
  private options: Required<ParallaxScrollOptions<T>>;

  private items: ParallaxScrollItem<T>[];

  static defaultOptions: ParallaxScrollOptions = {
    targetElement: window,
    setStyles: undefined,
    lerpEase: 0.08,
  };

  constructor(options: ParallaxScrollOptions<T>) {
    this.options = {
      ...ParallaxScroll.defaultOptions,
      ...options,
    } as Required<ParallaxScrollOptions<T>>;
    this.items = [];
  }

  private handlerScroll = () => {
    for (const instance of this.items) {
      instance.init();
    }
  };

  add = (el: HTMLElement, options: ParallaxScrollItemOptions<T>) => {
    this.items.push(new ParallaxScrollItem<T>(el, options, this.options));
    return this;
  };

  run = () => {
    const { targetElement } = this.options;
    this.handlerScroll();
    targetElement.removeEventListener('scroll', this.handlerScroll, false);
    targetElement.addEventListener('scroll', this.handlerScroll, false);
  };

  destroy = () => {
    const { targetElement } = this.options;
    targetElement.removeEventListener('scroll', this.handlerScroll, false);
    for (const instance of this.items) {
      instance.destroy();
    }
  };
}
