import { useRef, useEffect } from "react";

export const useScrollIntoViewOnChange = <T extends HTMLElement>(
  targetIndex: number
) => {
  const focusRef = useRef<T>(null);

  useEffect(() => {
    focusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [targetIndex]);

  return focusRef;
};
