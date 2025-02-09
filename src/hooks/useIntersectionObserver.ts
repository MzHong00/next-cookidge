import { useCallback, useEffect, useRef } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface Props {
  options?: IntersectionObserverInit;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  options,
  hasNextPage,
  fetchNextPage,
}: Props) => {
  const target = useRef<HTMLDivElement | null>(null);

  const callback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      });
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target, callback, options]);

  return target;
};
