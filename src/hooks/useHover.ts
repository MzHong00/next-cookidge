import { useEffect, useRef, useState } from "react";

export const useHover = () => {
  const ref = useRef<HTMLElement>(null);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseOver = () => {
      setIsHover(true);
    };
    const handleMouseOut = () => {
      setIsHover(false);
    };

    element.addEventListener("mouseenter", handleMouseOver);
    element.addEventListener("mouseleave", handleMouseOut);

    return () => {
      element.removeEventListener("mouseenter", handleMouseOver);
      element.removeEventListener("mouseleave", handleMouseOut);
    };
  }, []);

  return { ref, isHover };
};
