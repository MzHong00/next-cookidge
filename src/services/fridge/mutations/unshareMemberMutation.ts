import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IFridge } from "@/types/fridge/type";
import type { IUser } from "@/types/user/user";
import { FridgeService } from "..";
import { FridgeQueries } from "../queries/fridgeQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useUnshareMemberMutation = (
  fridgeId: IFridge["_id"],
  member_id: IUser["_id"]
) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: () => FridgeService.removeSharedMember(fridgeId, member_id),
    onSuccess: async (data) => {
      await queryClient.setQueryData(
        [FridgeQueries.keys.detail, fridgeId],
        (data: IFridge) => ({
          ...data,
          allowed_users: data.allowed_users?.filter(
            (user) => user._id !== member_id
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
