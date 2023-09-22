import { useState, useEffect } from "react";
import { useAnimationFunction } from "../react";

export const WithoutCss = () => {
  const [value, setValue] = useState(0);
  const animate = useAnimationFunction<number>(
    ({ progress, ...context }, arg) => {
      console.log({ progress, ...context }, arg);
      // Do anything here!
      setValue(progress * arg);
    },
    {
      duration: 600,
      easing: "ease-in-out",
    }
  );
  useEffect(() => {
    animate.play({ args: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <progress value={value} max={100} style={{ width: 600 }} />;
};
