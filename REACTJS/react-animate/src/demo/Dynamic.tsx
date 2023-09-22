import { useEffect } from "react";
import { useAnimation } from "../react";

export const Dynamic = () => {
  // Define argument type
  const animate = useAnimation<{ x: number; y: number }>(
    ({ progress }, args) => {
      console.log({ progress, args });
    },
    (prevStyle, nextArgs) => {
      return [
        // You can get current style from 1st argument
        { transform: prevStyle.transform },
        // Get passed position from 2nd argument
        { transform: `translate(${nextArgs.x}px, ${nextArgs.y}px)` },
      ];
    },
    {
      duration: 400,
      easing: "ease-in-out",
    }
  );

  useEffect(() => {
    // If you click somewhere, the circle follows you!

    const onClick = (e: MouseEvent) => {
      // Pass mouse position when animate
      animate.play({ args: { x: e.clientX, y: e.clientY } });
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={animate}
      style={{
        position: "fixed",
        border: "solid 0.1rem #135569",
        borderRadius: "50%",
        height: "6rem",
        width: "6rem",
        top: "-3rem",
        left: "-3rem",
      }}
    />
  );
};
