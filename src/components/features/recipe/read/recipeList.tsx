"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IRecipeQuery } from "@/types/recipe/recipe";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { IntersectionObserverMasonry } from "@/components/common/intersectionObserverMasonry";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";

import styles from "./recipeList.module.scss";

const THUMBNAIL_WIDTH = 400;

export const RecipeList = ({ recipeQuery }: { recipeQuery: IRecipeQuery }) => {
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(RecipeQueries.listQuery(recipeQuery));

  return (
    <div>
      <IntersectionObserverMasonry
        item_width={THUMBNAIL_WIDTH}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      >
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
      </IntersectionObserverMasonry>
      {isFetching && (
        <LoadingSpinner
          msg="레시피 가져오는 중..."
          className={styles.spinner}
        />
      )}
    </div>
  );
};
