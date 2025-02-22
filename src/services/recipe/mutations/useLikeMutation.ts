import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import { RecipeService } from "..";
import type { IRecipe } from "@/types/recipe";
import { RecipeQueries } from "../queries/recipeQueries";
import { UserQueries } from "@/services/user/queries/userQueries";

export const useLikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { root, list } = RecipeQueries.keys;
  const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

  const detailRecipeQueryKey = [...root, recipeId];

  return useMutation({
    mutationFn: () => RecipeService.likeRecipe(recipeId),
    onMutate: async () => {
      Promise.all([
        queryClient.cancelQueries({ queryKey: list }),
        queryClient.cancelQueries({ queryKey: detailRecipeQueryKey }),
      ]);

      const prevInfiniteRecipes = queryClient.getQueryData(
        list
      ) as InfiniteData<IRecipe[]>;
      const prevDetailRecipe = queryClient.getQueryData(
        detailRecipeQueryKey
      ) as IRecipe;

      // 무한 스크롤 레시피 목록에 좋아요만 반영
      if (prevInfiniteRecipes) {
        queryClient.setQueryData(list, (data: InfiniteData<IRecipe[]>) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.map((recipe) =>
              recipe._id === recipeId
                ? {
                    ...recipe,
                    like_members: [...recipe.like_members, me._id],
                  }
                : recipe
            )
          ),
        }));
      }

      if (prevDetailRecipe) {
        queryClient.setQueryData(detailRecipeQueryKey, (recipe: IRecipe) => ({
          ...recipe,
          like_members: [...recipe.like_members, me._id],
        }));
      }

      return { prevInfiniteRecipes, prevDetailRecipe };
    },
    // onSettled: async () => {
    //   await Promise.all([
    //     // 나의 좋아요 리스트 refetch
    //     queryClient.invalidateQueries({
    //       queryKey: [root, list, like, me.name],
    //     }),
    //   ]);
    // },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(list, context?.prevInfiniteRecipes),
        queryClient.setQueryData(
          detailRecipeQueryKey,
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};

export const useUnlikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { root, list } = RecipeQueries.keys;
  const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

  const detailRecipeQueryKey = [root, recipeId];

  return useMutation({
    mutationFn: () => RecipeService.unlikeRecipe(recipeId),
    onMutate: async () => {
      Promise.all([
        queryClient.cancelQueries({ queryKey: list }),
        queryClient.cancelQueries({ queryKey: detailRecipeQueryKey }),
      ]);

      const prevInfiniteRecipes = queryClient.getQueryData(
        list
      ) as InfiniteData<IRecipe[]>;
      const prevDetailRecipe = queryClient.getQueryData(
        detailRecipeQueryKey
      ) as IRecipe;

      // 무한 스크롤 레시피 목록에 좋아요만 반영
      if (prevInfiniteRecipes) {
        queryClient.setQueryData(list, (data: InfiniteData<IRecipe[]>) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.map((recipe) =>
              recipe._id === recipeId
                ? {
                    ...recipe,
                    like_members: recipe.like_members.filter(
                      (member) => member !== me._id
                    ),
                  }
                : recipe
            )
          ),
        }));
      }

      if (prevDetailRecipe) {
        queryClient.setQueryData(detailRecipeQueryKey, (recipe: IRecipe) => ({
          ...recipe,
          like_members: recipe.like_members.filter(
            (member) => member !== me._id
          ),
        }));
      }

      return { prevInfiniteRecipes, prevDetailRecipe };
    },
    // onSettled: async () => {
    //   await Promise.all([
    //     // 나의 좋아요 리스트 refetch
    //     queryClient.invalidateQueries({
    //       queryKey: [root, list, like, me.name],
    //     }),
    //   ]);
    // },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(list, context?.prevInfiniteRecipes),
        queryClient.setQueryData(
          detailRecipeQueryKey,
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};
