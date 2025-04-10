import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import type { IRecipe } from "@/types/recipe/recipe";
import { RecipeService } from "..";
import { RecipeQueries } from "../queries/recipeQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { UserQueries } from "@/services/user/queries/userQueries";

export const useDeleteRecipeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();
  const me = queryClient.getQueryData<IUser>([UserQueries.keys.me]);

  return useMutation({
    mutationFn: () => RecipeService.deleteRecipe(recipeId),
    onSuccess: async (data) => {
      const { root, list } = RecipeQueries.keys;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [...root, recipeId] }),
        queryClient.invalidateQueries({
          queryKey: list,
        }),
        queryClient.invalidateQueries({ queryKey: [me?.name] }),
      ]);

      alertEnqueue({
        message: data.message,
        type: "success",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
  });
};
