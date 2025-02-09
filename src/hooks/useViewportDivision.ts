import { useEffect, useState } from "react";

interface Option {
  minDiv?: number;
  maxDiv?: number;
}

export const useViewportDivision = (
  px: number,
  { minDiv = 0, maxDiv = 100 }: Option
) => {
  const [count, setCount] = useState<number>(Math.ceil(window.innerWidth / px));

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const handleResize = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        setCount(Math.ceil(window.innerWidth / px));
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [px]);

  if (minDiv > count) return minDiv;
  if (maxDiv < count) return maxDiv;
  return count;
};
