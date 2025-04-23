import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredientInputDto } from "@/types/ingredient/ingredient";
import { IngredientService } from "../service";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

export const useUpdateIngredientMutation = (fridgeId?: IFridge["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: async (ingredients: IIngredientInputDto[]) =>
      await IngredientService.updateIngredientMutation(ingredients, fridgeId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.detail, fridgeId],
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
