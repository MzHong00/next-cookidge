import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredientInputDTO } from "@/types/ingredient/ingredient";
import { IngredientService } from "..";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

export const useUpdateIngredientMutation = (fridgeId: IFridge["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationKey: [...FridgeQueries.keys.detail, fridgeId],
    mutationFn: (ingredients: IIngredientInputDTO[]) =>
      IngredientService.updateIngredientMutation(fridgeId, ingredients),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [...FridgeQueries.keys.detail, fridgeId],
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
