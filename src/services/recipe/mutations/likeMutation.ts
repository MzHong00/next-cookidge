import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import type { IUser } from "@/types/user/user";
import type { IRecipe } from "@/types/recipe/recipe";
import { RecipeService } from "..";
import { RecipeQueries } from "../queries/recipeQueries";
import { UserQueries } from "@/services/user/queries/userQueries";

//낙관적 업데이트로 작동
export const useLikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const me = queryClient.getQueryData<IUser>(UserQueries.keys.me);
  
  const { root, list, users: usersRecipeKey } = RecipeQueries.keys;
  const recipeListQueryKey = [...list, searchParams.toString()];
  const recipeDetailQueryKey = [...root, recipeId];

  return useMutation({
    mutationFn: () => RecipeService.likeRecipe(recipeId),
    onMutate: async () => {
      try {
        //좋아요를 눌렀을 때, 레시피 리스트와 Detail의 데이터를 최신화하기 위한 작업
        await Promise.all([
          queryClient.cancelQueries({ queryKey: recipeListQueryKey }),
          queryClient.cancelQueries({ queryKey: recipeDetailQueryKey }),
        ]);

        // 레시피 목록 데이터 낙관적 업데이트
        const prevInfiniteRecipes =
          queryClient.getQueryData<InfiniteData<IRecipe[]>>(recipeListQueryKey);
        
        if (prevInfiniteRecipes) {
          queryClient.setQueryData(recipeListQueryKey, (data: InfiniteData<IRecipe[]>) => ({
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

        // 레시피 디테일 데이터 낙관적 업데이트
        const prevDetailRecipe =
          queryClient.getQueryData<IRecipe>(recipeDetailQueryKey);

        if (prevDetailRecipe) {
          queryClient.setQueryData([...root, recipeId], (prev: IRecipe) => ({
            ...prev,
            like_members: [...prev.like_members, me?._id],
          }));
        }

        return { prevDetailRecipe, prevInfiniteRecipes };
      } catch (error) {
        console.error("좋아요 에러: ", error);
      }
    },
    onSettled: async () => {
      await Promise.all([
        // 나의 좋아요 리스트 refetch
        queryClient.invalidateQueries({
          queryKey: recipeDetailQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: usersRecipeKey,
        }),
      ]);
    },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(
          recipeListQueryKey,
          context?.prevInfiniteRecipes
        ),
        queryClient.setQueryData(
          recipeDetailQueryKey,
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};

//낙관적 업데이트로 작동
export const useUnlikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const me = queryClient.getQueryData<IUser>(UserQueries.keys.me);
  
  const { root, list, users: usersRecipeKey } = RecipeQueries.keys;
  const recipeListQueryKey = [...list, searchParams.toString()];
  const recipeDetailQueryKey = [...root, recipeId];

  return useMutation({
    mutationFn: () => RecipeService.unlikeRecipe(recipeId),
    onMutate: async () => {
      try {
        //좋아요를 눌렀을 때, 레시피 리스트와 Detail의 데이터를 최신화하기 위한 작업
        await Promise.all([
          queryClient.cancelQueries({ queryKey: recipeListQueryKey }),
          queryClient.cancelQueries({ queryKey: recipeDetailQueryKey }),
        ]);

        // 레시피 디테일 데이터 낙관적 업데이트
        const prevDetailRecipe =
          queryClient.getQueryData<IRecipe>(recipeDetailQueryKey);

        if (prevDetailRecipe) {
          queryClient.setQueryData(recipeDetailQueryKey, (recipe: IRecipe) => ({
            ...recipe,
            like_members: recipe.like_members.filter(
              (member) => member !== me?._id
            ),
          }));
        }

        // 레시피 목록 데이터 낙관적 업데이트
        const prevInfiniteRecipes =
          queryClient.getQueryData<InfiniteData<IRecipe[]>>(recipeListQueryKey);

        if (prevInfiniteRecipes) {
          queryClient.setQueryData(
            recipeListQueryKey,
            (data: InfiniteData<IRecipe[]>) => ({
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
            })
          );
        }

        return { prevInfiniteRecipes, prevDetailRecipe };
      } catch (error) {
        console.error("좋아요 취소 에러: ", error);
      }
    },
    onSettled: async () => {
      await Promise.all([
        // 나의 좋아요 리스트 refetch
        queryClient.invalidateQueries({
          queryKey: recipeDetailQueryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: usersRecipeKey,
        }),
      ]);
    },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(
          recipeListQueryKey,
          context?.prevInfiniteRecipes
        ),
        queryClient.setQueryData(
          recipeDetailQueryKey,
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};
