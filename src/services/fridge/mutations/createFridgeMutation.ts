import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FridgeService } from "..";
import { FridgeQueries } from "../queries/fridgeQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useCreateFridgeMutation = () => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (fridgeName: string) => FridgeService.createFridge(fridgeName),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [...FridgeQueries.keys.list],
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
