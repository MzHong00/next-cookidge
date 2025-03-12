import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import type { IRecipe } from "@/types/recipe/recipe";
import { RecipeService } from "..";
import { RecipeQueries } from "../queries/recipeQueries";
import { UserQueries } from "@/services/user/queries/userQueries";

//낙관적 업데이트로 작동
export const useLikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { root, list } = RecipeQueries.keys;
  const me = queryClient.getQueryData<IUser>(UserQueries.keys.me);

  return useMutation({
    mutationFn: () => RecipeService.likeRecipe(recipeId),
    onMutate: async () => {
      //좋아요를 눌렀을 때, 레시피 리스트와 Detail의 데이터를 최신화하기 위한 작업
      await Promise.all([
        queryClient.cancelQueries({ queryKey: list }),
        queryClient.cancelQueries({ queryKey: [...root, recipeId] }),
      ]);

      const prevInfiniteRecipes =
        queryClient.getQueryData<InfiniteData<IRecipe[]>>(list);

      if (prevInfiniteRecipes) {
        queryClient.setQueryData(list, (data: InfiniteData<IRecipe[]>) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.map((recipe) =>
              recipe._id === recipeId
                ? {
                    ...recipe,
                    like_members: [...recipe.like_members, me?._id],
                  }
                : recipe
            )
          ),
        }));
      }

      const prevDetailRecipe = queryClient.getQueryData<IRecipe>([
        ...root,
        recipeId,
      ]);

      if (prevDetailRecipe) {
        queryClient.setQueryData([...root, recipeId], (prev: IRecipe) => ({
          ...prev,
          like_members: [...prev.like_members, me?._id],
        }));
      }

      return { prevDetailRecipe, prevInfiniteRecipes };
    },
    onSettled: async () => {
      await Promise.all([
        // 나의 좋아요 리스트 refetch
        queryClient.invalidateQueries({
          queryKey: [...root, recipeId],
        }),
      ]);
    },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(list, context?.prevInfiniteRecipes),
        queryClient.setQueryData(
          [...root, recipeId],
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};

//낙관적 업데이트로 작동
export const useUnlikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { root, list } = RecipeQueries.keys;
  const me = queryClient.getQueryData<IUser>(UserQueries.keys.me)

  return useMutation({
    mutationFn: () => RecipeService.unlikeRecipe(recipeId),
    onMutate: async () => {
      //좋아요를 눌렀을 때, 레시피 리스트와 Detail의 데이터를 최신화하기 위한 작업
      Promise.all([
        queryClient.cancelQueries({ queryKey: list }),
        queryClient.cancelQueries({ queryKey: [...root, recipeId] }),
      ]);
      
      const prevDetailRecipe = queryClient.getQueryData<IRecipe>([
        ...root,
        recipeId,
      ]);
      
      if (prevDetailRecipe) {
        queryClient.setQueryData([...root, recipeId], (recipe: IRecipe) => ({
          ...recipe,
          like_members: recipe.like_members.filter(
            (member) => member !== me?._id
          ),
        }));
      }

      const prevInfiniteRecipes =
        queryClient.getQueryData<InfiniteData<IRecipe[]>>(list);

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
                      (member) => member !== me?._id
                    ),
                  }
                : recipe
            )
          ),
        }));
      }

      return { prevInfiniteRecipes, prevDetailRecipe };
    },
    onSettled: async () => {
      await Promise.all([
        // 나의 좋아요 리스트 refetch
        queryClient.invalidateQueries({
          queryKey: [...root, recipeId],
        }),
      ]);
    },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(list, context?.prevInfiniteRecipes),
        queryClient.setQueryData(
          [...root, recipeId],
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};
