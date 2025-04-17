"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IRecipeQuery } from "@/types/recipe/recipe";
import { ClientRender } from "@/components/common/clientRender";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { ResponsiveMasonry } from "@/components/common/responsiveMasonry";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import styles from "./recipeList.module.scss";

const THUMBNAIL_WIDTH = 400;

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
        </ResponsiveMasonry>
      </ClientRender>
      {isFetching && (
        <LoadingSpinner
          className={styles.spinner}
          msg="레시피 가져오는 중..."
        />
      )}
      <div ref={target} />
    </div>
  );
};
