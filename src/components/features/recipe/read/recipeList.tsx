"use client"

import Masonry from "react-layout-masonry";
import { useSearchParams } from "next/navigation";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { useViewportDivision } from "@/hooks/useViewportDivision";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";

const THUMBNAIL_MAX_WIDTH = 400;
const THUMBNAIL_MAX_DIVISION = 4;
const LIST_GAP = 10;

export const RecipeList = () => {
  const searchParams = useSearchParams();
  
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    RecipeQueries.listQuery(searchParams.toString())
  );
  const target = useIntersectionObserver({ hasNextPage, fetchNextPage });
  const column = useViewportDivision(THUMBNAIL_MAX_WIDTH, {
    maxDiv: THUMBNAIL_MAX_DIVISION,
  });

  return (
    <article>
      <Masonry columns={column} gap={LIST_GAP}>
        {data.pages.map((page) =>
          page.map((recipe) => (
            <article key={recipe._id}>
              <RecipeThumbnail
                recipe={recipe}
                width={THUMBNAIL_MAX_WIDTH}
                height={THUMBNAIL_MAX_WIDTH}
                sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </article>
          ))
        )}
      </Masonry>
      <div ref={target} />
    </article>
  );
};
