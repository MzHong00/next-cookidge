"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IRecipeQuery } from "@/types/recipe/recipe";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { ClientRender } from "@/components/common/clientRender";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ResponsiveMasonry } from "@/components/common/responsiveMasonry";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";
import { RecipeThumbnailSkeleton } from "../thumbnail/recipeThumbnailSkeleton";

const THUMBNAIL_WIDTH = 400;
const TUHMBNAIL_SKELETON_COUNT = 4;

export const RecipeList = ({ recipeQuery }: { recipeQuery: IRecipeQuery }) => {
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(RecipeQueries.listQuery(recipeQuery));
  const target = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div>
      <ClientRender>
        <ResponsiveMasonry item_width={THUMBNAIL_WIDTH}>
          {data.pages.map((page) =>
            page.map((recipe) => (
              <article key={recipe._id}>
                <RecipeThumbnail
                  recipe={recipe}
                  width={THUMBNAIL_WIDTH}
                  height={THUMBNAIL_WIDTH}
                  sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </article>
            ))
          )}
          {isFetching &&
            Array.from({ length: TUHMBNAIL_SKELETON_COUNT }).map((_, i) => (
              <RecipeThumbnailSkeleton key={i} />
            ))}
        </ResponsiveMasonry>
      </ClientRender>
      <div ref={target} />
    </div>
  );
};
