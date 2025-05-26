"use client";

import { useEffect, useState } from "react";
import Masonry, { type MasonryProps } from "react-layout-masonry";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

import { ClientRender } from "../clientRender";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

/* 
  - Intersection Observer와 반응형 CSS가 적용된 MasonryLayout
  - Intersection Observer를 내장시킨 이유
    => 옵저버 타겟을 Masonry 레이아웃 내부에 있어야 자연스럽게 데이터를 가져오는데, 
    Masonry는 window API를 사용하기 때문에 CSR을 해야한다. Client Render 컴포넌
    트로 감싸면 마운트 된 후에 렌더링 하기 때문에 옵저버 ref에 할당이 안된다.
*/
const GAP = 7;
const MAX_DIVISION = 4;

interface Props extends MasonryProps<"div"> {
  item_width: number;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const IntersectionObserverMasonry = (props: Props) => (
  <ClientRender>
    <ResponsiveMasonry {...props} />
  </ClientRender>
);

const ResponsiveMasonry = ({
  item_width,
  hasNextPage,
  fetchNextPage,
  children,
  ...props
}: Props) => {
  const column = useViewportDivision(item_width, MAX_DIVISION);
  const target = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <Masonry columns={column} gap={GAP} {...props}>
        {children}
      </Masonry>
      <div ref={target} />
    </>
  );
};

/*
  maxWidthPx: 아이템의 최대 가로 길이
  limitWidthDiv: 행의 아이템 최대 개수
*/
const useViewportDivision = (
  maxWidthPx: number,
  limitWidthDiv: number = 100
) => {
  const [count, setCount] = useState<number>(
    Math.ceil(window.innerWidth / maxWidthPx)
  );

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
