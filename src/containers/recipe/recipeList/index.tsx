"use client";

import Masonry from "react-layout-masonry";
import { useSearchParams } from "next/navigation";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries";
import { RecipeThumbnail } from "@/components/recipe/recipeThumbnail";
import { useViewportDivision } from "@/hooks/useViewportDivision";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import styles from "./index.module.scss";

const THUMBNAIL_MAX_WIDTH = 400;
const THUMBNAIL_MAX_DIVISION = 4;
const LIST_GAP = 10;

function RecipeList() {
  const searchParams = useSearchParams();
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    RecipeQueries.listQuery(searchParams.toString())
  );
  const target = useIntersectionObserver({ hasNextPage, fetchNextPage });
  const column = useViewportDivision(THUMBNAIL_MAX_WIDTH, {
    maxDiv: THUMBNAIL_MAX_DIVISION,
  });

  return (
    <div className={styles.container}>
      <Masonry columns={column} gap={LIST_GAP}>
        {data.pages.map((page) =>
          page.map(({ _id, pictures }) => (
            <article key={_id}>
              <RecipeThumbnail
                _id={_id}
                pictures={pictures}
                width={THUMBNAIL_MAX_WIDTH}
                height={THUMBNAIL_MAX_WIDTH}
                priority
                sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </article>
          ))
        )}
      </Masonry>
      <div ref={target} />
    </div>
  );
}

export default RecipeList;
