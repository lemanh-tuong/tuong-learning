import { frameManager } from "../../utils/frameManager";
import { offset } from "../../utils/offset";
import { isMobile } from "../../utils/isMobile";

export function backgroundParallax(el: HTMLElement, { speed = 0.3 } = {}) {
  const bgPosition = window.getComputedStyle(el).backgroundPosition;
  const [first, last] = bgPosition.split(" ");
  frameManager.add(handleScroll, true);

  function handleScroll() {
    if (isMobile.any) {
      el.style.removeProperty("background-position");
    } else {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const height = el.offsetHeight;
      const bgPosition = `${first} calc(${last} + ${
        (offset(el).top - scrollTop) * speed
      }px)`;
      if (
        scrollTop + windowHeight >= offset(el).top &&
        scrollTop <= offset(el).top + height
      ) {
        el.style.backgroundPosition = bgPosition;
      }
    }
  }

  function destroy() {
    frameManager.remove(handleScroll);
  }

  function init() {
    handleScroll();
  }

  init();

  return destroy;
}
