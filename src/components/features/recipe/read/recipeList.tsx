"use client";

import { useSearchParams } from "next/navigation";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ResponsiveMasonry } from "@/components/common/responsiveMasonry";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";
import { ClientRender } from "@/components/common/clientRender";

const THUMBNAIL_WIDTH = 400;

export const RecipeList = () => {
  const searchParams = useSearchParams();

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    RecipeQueries.listQuery(searchParams.toString())
  );
  const target = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <article>
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
        </ResponsiveMasonry>
      </ClientRender>
      <div ref={target} />
    </article>
  );
};
