export interface SetStylesOptions<T extends Record<string, any> = DefaultKeyframes> {
  element: HTMLElement;
  createValue: (prop: keyof T | Omit<string, keyof T>) => string | number;
  EMPTY: string;
}

export interface ParallaxScrollOptions<T extends Record<string, any> = DefaultKeyframes> {
  targetElement?: HTMLElement | Window;
  lerpEase?: number;
  setStyles?: ({ element, createValue, EMPTY }: SetStylesOptions<T>) => void;
}

export interface DefaultKeyframes {
  x?: number | string;
  y?: number | string;
  scale?: number | string;
  scaleX?: number | string;
  scaleY?: number | string;
  rotate?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  skew?: number | string;
  skewX?: number | string;
  skewY?: number | string;
  opacity?: number | string;
  width?: number | string;
  height?: number | string;
  backgroundPositionY?: number | string;
  videoTime?: number | string;
  groupImg?: number | string;
  [key: string]: number | string | undefined;
}

export interface ParallaxScrollItemOptions<T extends Record<string, any> = DefaultKeyframes> {
  from: number | (() => number);
  to: number | (() => number);
  keyframes: Record<string, T>;
}
