import { useState, useEffect } from "react";

export const useUpDownArrowNavigationWithReset = (
  itemTotalCount: number,
  searchWord: string
) => {
  const [targetIndex, setTargetIndex] = useState(0);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setTargetIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowDown") {
      setTargetIndex((prev) => (prev + 1 < itemTotalCount ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    setTargetIndex(0);
  }, [searchWord]);

  return { targetIndex, onKeyDown };
};
