import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IRecipeCreateDTO } from "@/types/recipe/recipe";
import { RecipeService } from "..";
import { RecipeQueries } from "../queries/recipeQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (recipeInputDto: IRecipeCreateDTO) =>
      RecipeService.createRecipe(recipeInputDto),
    onSuccess: async (data) => {
      const { list } = RecipeQueries.keys;

      await queryClient.invalidateQueries({
        queryKey: list,
      });

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
