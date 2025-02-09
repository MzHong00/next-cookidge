"use client";

import { useSearchParams } from "next/navigation";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries";
import { RecipeThumbnail } from "@/components/recipe/recipeThumbnail";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import styles from "./index.module.scss";
import { IRecipe } from "@/types/recipe";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function RecipeList() {
  const searchParams = useSearchParams();
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    RecipeQueries.listQuery(searchParams.toString())
  );
  const target = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.pages.map((page) =>
          page.map((recipe) => (
            <ThumbnailList key={recipe._id} recipe={recipe} />
          ))
        )}
      </ul>
      <div ref={target}>타겟</div>
    </div>
  );
}

const ThumbnailList = ({ recipe }: { recipe: IRecipe }) => {
  const [calcHeight, setCalcHeight] = useState(0);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const height = window.getComputedStyle(ref.current).height;
      const calcHeight = Math.round(Number(height.slice(0, height.length - 2)));
      setCalcHeight(calcHeight);
    }
  }, [ref?.current]);

  return (
    <li key={recipe._id} ref={ref} style={{gridRowEnd: `span ${calcHeight}`}}>
      <RecipeThumbnail {...recipe} />
    </li>
  );
};
