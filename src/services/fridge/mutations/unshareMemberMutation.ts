import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUser } from "@/types/user/user";
import type { IFridge } from "@/types/fridge/type";
import { FridgeService } from "..";
import { FridgeQueries } from "../queries/fridgeQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useUnshareMemberMutation = (
  fridgeId: IFridge["_id"],
  memberId: IUser["_id"]
) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: () => FridgeService.removeSharedMember(fridgeId, memberId),
    onSuccess: async (data) => {
      await queryClient.setQueryData(
        [...FridgeQueries.keys.detail, fridgeId],
        (data: IFridge) => ({
          ...data,
          allowed_users: data.allowed_users?.filter(
            (user) => user._id !== memberId
          ),
        })
      );

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
