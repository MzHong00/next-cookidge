import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import type { IUser } from "@/types/user/user";
import type{ IFridge } from "@/types/fridge/type";
import { FridgeService } from "..";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useShareMemberMutation = (fridgeId?: IFridge["_id"]) => {
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (member_id: IUser["_id"]) =>
      FridgeService.addSharedMember(fridgeId, member_id),
    onSuccess: (data) => {
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
