import { useEffect, useRef, useState } from "react";

export const useHover = () => {
  const ref = useRef<HTMLElement>(null);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseOver = () => {
      setIsHover(true);
    };
    const handleMouseOut = () => {
      setIsHover(false);
    };

    ref.current?.addEventListener("mouseenter", handleMouseOver);
    ref.current?.addEventListener("mouseleave", handleMouseOut);

    return () => {
      ref.current?.removeEventListener("mouseenter", handleMouseOver);
      ref.current?.removeEventListener("mouseleave", handleMouseOut);
    };
  }, []);

  return { ref, isHover };
};
