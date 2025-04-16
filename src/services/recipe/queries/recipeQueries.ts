import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IRecipe, IRecipeQuery } from "@/types/recipe/recipe";
import { RecipeService } from "..";

const LIMIT = 10;

export class RecipeQueries {
  static readonly keys = {
    root: ["recipe"],
    list: ["recipe", "infinite"],
    like: ["recipe", "by-users-like"],
    users: ["recipe", "by-users-name"],
  };

  static detailQuery(recipeId: IRecipe["_id"]) {
    return queryOptions({
      queryKey: [...this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      enabled: !!recipeId,
    });
  }

  static listQuery(queryParams?: Partial<IRecipeQuery>) {
    return infiniteQueryOptions({
      queryKey: [...this.keys.list, queryParams],
      queryFn: ({ pageParam, signal }) =>
        RecipeService.readRecipeList({
          params: {
            ...queryParams,
            limit: LIMIT,
            offset: pageParam * LIMIT,
          },
          signal,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0 || lastPage?.length < LIMIT) return;

        return lastPageParam + 1;
      },
    });
  }

  static listQueryByUserName(name: string) {
    return queryOptions({
      queryKey: [...this.keys.users, name],
      queryFn: ({ signal }) =>
        RecipeService.readRecipeListByUserName({ signal, userName: name }),
    });
  }

  static listQueryByUserLike() {
    return queryOptions({
      queryKey: [...this.keys.like],
      queryFn: ({ signal }) => RecipeService.readMyLikeRecieps({ signal }),
    });
  }
}
