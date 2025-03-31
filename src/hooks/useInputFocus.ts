import { useEffect, useRef, useState } from "react";

export const useInputFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    const input = ref.current;

    const focusInHandler = () => {
      setIsFocus(true);
    };

    const focusOutHandler = () => {
      setIsFocus(false);
    };

    input?.addEventListener("focusin", focusInHandler);
    input?.addEventListener("focusout", focusOutHandler);

    return () => {
      input?.removeEventListener("focusin", focusInHandler);
      input?.removeEventListener("focusout", focusOutHandler);
    };
  }, []);

  return { ref, isFocus };
};
