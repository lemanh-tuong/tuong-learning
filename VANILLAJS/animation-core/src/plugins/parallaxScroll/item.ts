import { clamp } from "../../utils/clamp";
import { each, filter, reduce } from "../../utils/fastLoop";
import { FrameData, frameManager } from "../../utils/frameManager";
import { interpolate } from "../../utils/interpolate";
import { isMobile } from "../../utils/isMobile";
import { throwError } from "../../utils/throwError";
import { lerp } from "./lerp";
import { objectKeys } from "./objectKeys";
import {
  DefaultKeyframes,
  ParallaxScrollItemOptions,
  ParallaxScrollOptions,
} from "./types";

const EMPTY = "===empty===";
const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;
const MIN = 0;
const MAX = 100;
const UNIT_PATTERN =
  /(px|%|vh|vw|em|rem|pt|cm|mm|in|pc|ex|ch|vmin|vmax|lh|rlh|vb|vi|svw|svh|lvw|lvh|dvw|dvh)/g;

export class ParallaxScrollItem<
  T extends Record<string, any> = DefaultKeyframes
> {
  private el: HTMLElement;

  private defaultStyle: string;

  private options: ParallaxScrollItemOptions;

  private contextOptions: Required<ParallaxScrollOptions<T>>;

  private currentValue: number;

  private targetValue: number;

  constructor(
    el: HTMLElement,
    options: ParallaxScrollItemOptions<T>,
    contextOptions: Required<ParallaxScrollOptions<T>>
  ) {
    this.el = el;
    this.defaultStyle = this.el.style.cssText;
    this.options = options;
    this.contextOptions = contextOptions;
    this.currentValue = 0;
    this.targetValue = 0;
    frameManager.add(this.handleFrameSyncUpdate, true);
  }

  private getInputRange() {
    const { keyframes } = this.options;
    return reduce(
      objectKeys(keyframes),
      (arr, item) => {
        const val = Number(item.replace("%", ""));
        if (isNaN(val)) {
          return arr;
        }
        return [...arr, val];
      },
      [] as number[]
    ).sort((a, b) => a - b);
  }

  private getKeyframesByProp(prop: keyof DefaultKeyframes) {
    const { keyframes } = this.options;
    console.log(keyframes);
    const inputRange = this.getInputRange();
    if (Math.max(...inputRange) > 100) {
      throwError("Max value of input range must be less than 100%");
    }
    let prevVal = null;
    return reduce(
      inputRange,
      (arr, item) => {
        const key = `${item}%`;
        const val = keyframes[key][prop];
        if (val != null) {
          arr.push(String(val));
        }
        // @ts-ignore
        prevVal = arr[arr.length - 1];
        if (val == null && prevVal != null) {
          arr.push(prevVal);
        }
        return arr;
      },
      [] as string[]
    );
  }

  private getDefaultUnit(prop: keyof DefaultKeyframes) {
    switch (prop) {
      case "x":
      case "y":
      case "width":
      case "height":
      case "backgroundPositionY":
        return "px";
      case "rotate":
      case "rotateX":
      case "rotateY":
      case "skew":
      case "skewX":
      case "skewY":
        return "deg";
      case "scale":
      case "scaleX":
      case "scaleY":
      case "opacity":
      case "videoTime":
      default:
        return "";
    }
  }

  private interpolate(value: number, prop: keyof DefaultKeyframes) {
    const outputRange = this.getKeyframesByProp(prop);
    const unit = String(outputRange[0]).replace(/[0-9.,-]/g, "");
    const outputRangeNumber = outputRange.map((item) =>
      Number(String(item).replace(UNIT_PATTERN, ""))
    );

    if (outputRange.length === 0) {
      return EMPTY;
    }
    const result = interpolate({
      value,
      inputRange: this.getInputRange(),
      outputRange: outputRangeNumber,
    });
    return `${result}${unit || this.getDefaultUnit(prop)}`;
  }

  private setStyles(el: HTMLElement, value: number) {
    const { setStyles } = this.contextOptions;
    const x = this.interpolate(value, "x");
    const y = this.interpolate(value, "y");
    const rotate = this.interpolate(value, "rotate");
    const rotateX = this.interpolate(value, "rotateX");
    const rotateY = this.interpolate(value, "rotateY");
    const scale = this.interpolate(value, "scale");
    const scaleX = this.interpolate(value, "scaleX");
    const scaleY = this.interpolate(value, "scaleY");
    const skew = this.interpolate(value, "skew");
    const skewX = this.interpolate(value, "skewX");
    const skewY = this.interpolate(value, "skewY");
    const opacity = this.interpolate(value, "opacity");
    const width = this.interpolate(value, "width");
    const height = this.interpolate(value, "height");
    const backgroundPositionY = this.interpolate(value, "backgroundPositionY");
    const videoTime = this.interpolate(value, "videoTime");
    const groupImg = this.interpolate(value, "groupImg");
    el.style.transform = filter(
      [
        x === EMPTY ? "" : `translateX(${x})`,
        y === EMPTY ? "" : `translateY(${y})`,
        rotate === EMPTY ? "" : `rotate(${rotate})`,
        rotateX === EMPTY ? "" : `rotateX(${rotateX})`,
        rotateY === EMPTY ? "" : `rotateY(${rotateY})`,
        scale === EMPTY ? "" : `scale(${scale})`,
        scaleX === EMPTY ? "" : `scaleX(${scaleX})`,
        scaleY === EMPTY ? "" : `scaleY(${scaleY})`,
        skew === EMPTY ? "" : `skew(${skew})`,
        skewX === EMPTY ? "" : `skewX(${skewX})`,
        skewY === EMPTY ? "" : `skewY(${skewY})`,
      ],
      (item) => !!item && !item.includes(EMPTY)
    ).join(" ");
    if (width !== EMPTY) {
      el.style.width = `${width}`;
    }
    if (height !== EMPTY) {
      el.style.height = `${height}`;
    }
    if (opacity !== EMPTY) {
      el.style.opacity = `${opacity}`;
    }
    if (backgroundPositionY !== EMPTY) {
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      if (isMobile.iOS) {
        el.style.backgroundPosition = `50% calc(${backgroundPositionY} * -1)`;
      } else {
        el.style.backgroundAttachment = "fixed";
        el.style.backgroundPosition = `50% ${backgroundPositionY}`;
      }
    }
    if (videoTime !== EMPTY) {
      const videoEl = el.querySelector("video");
      if (videoEl && videoEl.duration) {
        const currentTime = interpolate({
          value: Number(videoTime.replace(UNIT_PATTERN, "")),
          inputRange: [0, 100],
          outputRange: [0, videoEl.duration],
        });
        videoEl.currentTime = currentTime;
      }
    }
    if (groupImg !== EMPTY) {
      if (window.getComputedStyle(el).position === "static") {
        el.style.position = "relative";
      }
      const imageEls = Array.from(el.querySelectorAll("img"));
      const currentIndex = Math.floor(
        interpolate({
          value: Number(groupImg.replace(UNIT_PATTERN, "")),
          inputRange: [0, 100],
          outputRange: [0, imageEls.length - 1],
        })
      );
      each(imageEls, (imageEl, index) => {
        imageEl.style.visibility =
          index === currentIndex ? "visible" : "hidden";
      });
    }

    if (setStyles) {
      setStyles({
        element: el,
        createValue: (prop) =>
          this.interpolate(value, prop as keyof DefaultKeyframes),
        EMPTY,
      });
    }
  }

  private handleFrameSyncUpdate = ({ delta }: FrameData) => {
    const { lerpEase } = this.contextOptions;
    const diff = Math.abs(this.targetValue - this.currentValue);

    // Don't update if difference is too low
    if (diff < 0.001) {
      return;
    }
    let slowDownFactor = delta / DT_FPS;
    const slowDownFactorRounded = Math.round(slowDownFactor);
    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    const value = lerp(
      this.currentValue,
      this.targetValue,
      lerpEase * slowDownFactor
    );
    this.setStyles(this.el, value);
    this.currentValue = value;
  };

  private handleParallax() {
    const start = window.scrollY - this.getFrom();
    const end = this.getTo() - this.getFrom();
    const value = clamp((start / end) * 100, MIN, MAX);
    if (value >= MIN && value <= MAX) {
      this.targetValue = value;
    }
  }

  private getFrom() {
    const { from } = this.options;
    if (typeof from === "function") {
      return from();
    }
    return from;
  }

  private getTo() {
    const { to } = this.options;
    if (typeof to === "function") {
      return to();
    }
    return to;
  }

  public destroy = () => {
    if (this.el) {
      this.el.style.cssText = this.defaultStyle;
      frameManager.remove(this.handleFrameSyncUpdate);
    }
  };

  public init() {
    this.handleParallax();
  }
}
