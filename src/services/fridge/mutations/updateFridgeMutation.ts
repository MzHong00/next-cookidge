import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IFridge } from "@/types/fridge/type";
import { FridgeService } from "..";
import { FridgeQueries } from "../queries/fridgeQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useUpdateFridgeMutation = (id?: IFridge["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (name: IFridge["name"]) => FridgeService.updateFridge(id, name),
    onSuccess: (data) => {
      const { detail, list } = FridgeQueries.keys;
      queryClient.invalidateQueries({ queryKey: list });
      queryClient.invalidateQueries({ queryKey: [...detail, id] });

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
