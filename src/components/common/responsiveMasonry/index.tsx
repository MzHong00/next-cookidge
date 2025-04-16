"use client";

import { useEffect, useState } from "react";
import Masonry, { type MasonryProps } from "react-layout-masonry";

const GAP = 10;
const MAX_DIVISION = 4;

interface Props extends MasonryProps<"div"> {
  item_width: number;
}

export const ResponsiveMasonry = ({
  item_width,
  children,
  ...props
}: Props) => {
  const column = useViewportDivision(item_width, MAX_DIVISION);

  return (
    <Masonry columns={column} gap={GAP} {...props}>
      {children}
    </Masonry>
  );
};

/*
  maxWidthPx: 아이템의 최대 가로 길이
  limitWidthDiv: 행의 아이템 최대 개수
*/
const useViewportDivision = (maxWidthPx: number, limitWidthDiv: number = 100) => {
  const [count, setCount] = useState<number>(Math.ceil(window.innerWidth / maxWidthPx));

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const handleResize = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        setCount(Math.ceil(window.innerWidth / maxWidthPx));
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxWidthPx]);

  if (0 > count) return 0;
  if (limitWidthDiv < count) return limitWidthDiv;
  return count;
};
