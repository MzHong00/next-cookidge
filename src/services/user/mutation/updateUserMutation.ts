import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUser } from "@/types/user/user";
import { UserService } from "..";
import { UserQueries } from "../queries/userQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useUpdateUserMutation = () => {
  const { alertEnqueue } = useAlertActions();

  const queryClient = useQueryClient();
  const { me: meQueryKey, user } = UserQueries.keys;
  const me = queryClient.getQueryData<IUser>(meQueryKey);

  const userQueryKey = [...user, me?.name];

  return useMutation({
    mutationFn: (
      input: Pick<IUser, "name" | "introduce"> & {
        picture?: IUser["picture"];
      }
    ) => UserService.updateUser(input),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: meQueryKey }),
        queryClient.invalidateQueries({ queryKey: userQueryKey, refetchType:"inactive" }),
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
