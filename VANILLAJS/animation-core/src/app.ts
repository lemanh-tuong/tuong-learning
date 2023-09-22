import { interpolate } from "./utils/interpolate";
import { createAnimate } from "./utils/createAnimate/implement";
import { random } from "./utils/random";
import { offset } from "./utils/offset";
import { easings } from "./utils/easings";
import { parallaxScroll } from "./plugins/parallaxScroll";
import { backgroundParallax } from "./plugins/backgroundParallax/backgroundParallax";

const boxClickEl = document.querySelector(".box-click") as HTMLElement;
const resetEl = document.querySelector(".reset") as HTMLElement;
const easingEl = document.querySelector(".easing") as HTMLElement;
const parallaxWrapEl = document.querySelector(".parallax-wrap") as HTMLElement;
const parallax1El = document.querySelector(".parallax1") as HTMLElement;
const parallax2El = document.querySelector(".parallax2") as HTMLElement;

const animated = createAnimate();

let randomWidth;
let randomHeight;
let reset = false;

boxClickEl?.addEventListener("click", () => {
  randomWidth = random(20, 60) * 10;
  randomHeight = random(20, 60) * 10;
  reset = false;
  animated({ from: 0, to: 100, duration: 800 });
});

resetEl?.addEventListener("click", () => {
  reset = true;
  animated({ from: 100, to: 0, duration: 800 });
});

animated.onUpdate((value) => {
  const width = interpolate({
    value,
    inputRange: [0, 100],
    outputRange: [100, randomWidth],
    // @ts-ignore
    easing: easings[easingEl.value],
    reverseEasing: reset,
  });
  const height = interpolate({
    value,
    inputRange: [0, 100],
    outputRange: [100, randomHeight],
    // @ts-ignore
    easing: easings[easingEl.value],
    reverseEasing: reset,
  });

  // @ts-ignore
  boxClickEl.style.width = `${width}px`;
  // @ts-ignore
  boxClickEl.style.height = `${height}px`;
});

// @ts-ignore
const scene = parallaxScroll(parallaxWrapEl);

scene
  .add(parallax1El, {
    from() {
      return offset(parallax1El).top - window.innerHeight;
    },
    to() {
      return offset(parallax1El).top;
    },
    keyframes: {
      "0%": {
        y: 100,
        rotate: -180,
      },
      "50%": {
        y: 0,
        rotate: 0,
      },
      "100%": {
        y: -100,
        rotate: 180,
      },
    },
  })
  .add(parallax2El, {
    from() {
      return offset(parallax2El).top - window.innerHeight;
    },
    to() {
      return offset(parallax2El).top;
    },
    keyframes: {
      "0%": {
        x: 0,
        y: 100,
      },
      "50%": {
        x: 100,
        y: 0,
      },
      "100%": {
        x: 200,
        y: -100,
      },
    },
  })
  .run();

const prSectionEl = document.querySelector(".pr-section") as HTMLElement;
const prItemEls = document.querySelectorAll(".pr-item");

// @ts-ignore
const prSection = parallaxScroll(prSectionEl);

// @ts-ignore
prItemEls.forEach((prItemEl: HTMLElement, index) => {
  const left = random(5, 40);
  const right = random(60, 95);
  const randomLeft = index < prItemEls.length / 2 ? left : right;
  const scale = random(10, 25) / 10;

  prItemEl.style.top = `${random(5, 95)}%`;
  prItemEl.style.left = `${randomLeft}%`;
  prItemEl.style.zIndex = `${scale * 10}`;
  // @ts-ignore
  prItemEl.children[0].style.transform = `scale(${scale})`;

  prSection.add(prItemEl, {
    from() {
      return offset(prSectionEl).top - window.innerHeight;
    },
    to() {
      return offset(prSectionEl).top + prSectionEl.offsetHeight;
    },
    keyframes: {
      "0%": {
        y: 100 * scale,
      },
      "100%": {
        y: -100 * scale,
      },
    },
  });
});
const item2 = document.querySelector(".pr-text");
// @ts-ignore
prSection.add(item2, {
  from() {
    return offset(prSectionEl).top - window.innerHeight;
  },
  to() {
    return offset(prSectionEl).top + prSectionEl.offsetHeight;
  },
  keyframes: {
    "0%": {
      y: 50,
    },
    "100%": {
      y: -50,
    },
  },
});

prSection.run();

backgroundParallax(prSectionEl, { speed: 0.8 });
