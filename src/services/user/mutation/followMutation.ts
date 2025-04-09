import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import { UserService } from "..";
import { UserQueries } from "../queries/userQueries";

export const useFollowMutation = (
  userId: IUser["_id"],
  userName: IUser["name"]
) => {
  const queryClient = useQueryClient();

  const { me: meQueryKey, user } = UserQueries.keys;
  const meData = queryClient.getQueryData<IUser>(meQueryKey);
  const userQueryKey = [...user, userName];

  return useMutation({
    mutationFn: () => UserService.followUser(userId),
    onMutate: async () => {
      try {
        await queryClient.cancelQueries({ queryKey: userQueryKey });
        const prevUser = queryClient.getQueryData<IUser>(userQueryKey);

        // 유저 디테일 데이터 낙관적 업데이트
        if (prevUser) {
          queryClient.setQueryData(userQueryKey, (old: IUser) => ({
            ...old,
            follower: [...old.follower, meData?._id],
          }));
        }

        return { prevUser };
      } catch (error) {
        console.error("팔로우 에러: ", error);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
    onError: (err, variable, context) => {
      queryClient.setQueryData(userQueryKey, context?.prevUser);
    },
  });
};

export const useUnfollowMutation = (
  userId: IUser["_id"],
  userName: IUser["name"]
) => {
  const queryClient = useQueryClient();

  const { me: meQueryKey, user } = UserQueries.keys;
  const meData = queryClient.getQueryData<IUser>(meQueryKey);
  const userQueryKey = [...user, userName];

  return useMutation({
    mutationFn: () => UserService.unfollowUser(userId),
    onMutate: async () => {
      try {
        await queryClient.cancelQueries({ queryKey: userQueryKey });
        const prevUser = queryClient.getQueryData(userQueryKey) as IUser;

        // 유저 디테일 데이터 낙관적 업데이트
        if (prevUser) {
          queryClient.setQueryData(userQueryKey, (old: IUser) => ({
            ...old,
            follower: old.follower.filter((user) => user !== meData?._id),
          }));
        }

        return { prevUser };
      } catch (error) {
        console.error("언팔로우 에러: ", error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
    onError: (err, variable, context) => {
      queryClient.setQueryData(userQueryKey, context?.prevUser);
    },
  });
};
