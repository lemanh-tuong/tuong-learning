export type Easing = (value: number) => number;

export interface Easings {
  linear: Easing;
  ease: Easing;
  easeInQuad: Easing;
  easeOutQuad: Easing;
  easeInOutQuad: Easing;
  easeInCubic: Easing;
  easeOutCubic: Easing;
  easeInOutCubic: Easing;
  easeInQuart: Easing;
  easeOutQuart: Easing;
  easeInOutQuart: Easing;
  easeInQuint: Easing;
  easeOutQuint: Easing;
  easeInOutQuint: Easing;
  easeOutBounce: Easing;
  easeInBounce: Easing;
  easeOutBack: Easing;
  easeInBack: Easing;
  easeInOut: Easing;
  easeInElastic: Easing;
  easeOutElastic: Easing;
  spring: Easing;
  decay: Easing;
  bezier: (x1: number, y1: number, x2: number, y2: number) => Easing;
}

export const easings: Easings = {
  linear: t => t,
  ease: t => 0.5 * (1 - Math.cos(Math.PI * t)),
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => 1 + --t * t * t * t * t,
  easeInOutQuint: t => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
  easeOutBounce: t => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    }
    if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    }
    if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    }
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  easeInBounce: t => 1 - easings.easeOutBounce(1 - t),
  easeOutBack: t => {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
  },
  easeInBack: t => {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * t * t * t - c1 * t * t;
  },
  easeInOut: t => (t < 0.5 ? easings.easeInBack(t * 2) / 2 : easings.easeOutBack(t * 2 - 1) / 2 + 0.5),
  easeInElastic: t => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -(2 ** (10 * t - 10)) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: t => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  spring: t => 1 - Math.cos(t * 4.5 * Math.PI) * Math.exp(-t * 6),
  decay: t => 1 - Math.exp(-t * 6),
  bezier: (x1, y1, x2, y2) => t => {
    const ax = 3 * x1 - 3 * x2 + 1;
    const bx = 3 * x2 - 6 * x1;
    const cx = 3 * x1;
    const ay = 3 * y1 - 3 * y2 + 1;
    const by = 3 * y2 - 6 * y1;
    const cy = 3 * y1;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;

    const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;

    const sampleCurveDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

    const solveCurveX = (x: number, epsilon: number) => {
      let t0;
      let t1;
      let t2;
      let x2;
      let d2;
      let i;

      for (t2 = x, i = 0; i < 8; i++) {
        x2 = sampleCurveX(t2) - x;
        if (Math.abs(x2) < epsilon) {
          return t2;
        }
        d2 = sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < 1e-6) {
          break;
        }
        t2 -= x2 / d2;
      }

      t0 = 0;
      t1 = 1;
      t2 = x;

      if (t2 < t0) {
        return t0;
      }
      if (t2 > t1) {
        return t1;
      }

      while (t0 < t1) {
        x2 = sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon) {
          return t2;
        }
        if (x > x2) {
          t0 = t2;
        } else {
          t1 = t2;
        }
        t2 = (t1 - t0) * 0.5 + t0;
      }

      return t2;
    };

    return sampleCurveY(solveCurveX(t, 1 / 200));
  },
};
