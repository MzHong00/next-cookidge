import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { UserService } from "..";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useDeleteUserMutation = () => {
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: () => UserService.deleteUser(),
    onSuccess: async () => {
      window.location.href = `${process.env.NEXT_PUBLIC_CLIENT}`;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
  });
};
