import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IUser } from "@/types/user/user";
import type { PagenationParams } from "@/types/common";
import { UserService } from "..";

export class UserQueries {
  static readonly keys = {
    me: ["me"],
    user: ["user"],
    search: ["user", "inifinite", "search"],
    follower: ["user", "inifinite", "follower"],
    following: ["user", "inifinite", "following"],
  };

  static meQuery() {
    return queryOptions({
      queryKey: [...this.keys.me],
      queryFn: () => UserService.fetchMe(),
      refetchOnWindowFocus: false,
    });
  }

  static userQuery(name: IUser["name"]) {
    return queryOptions({
      queryKey: [...this.keys.user, name],
      queryFn: () => UserService.fetchUser(name),
    });
  }

  static followerInfiniteQuery(
    option: PagenationParams & {
      name: IUser["name"];
    }
  ) {
    const { name, limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [...this.keys.follower, name],
      queryFn: ({ signal }) =>
        UserService.fetchFollowerList({
          signal,
          params: { name: name, limit: limit },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < limit) return;

        return lastPageParam + 1;
      },
    });
  }

  static followingInfiniteQuery(
    option: PagenationParams & {
      name: IUser["name"];
    }
  ) {
    const { name, limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [...this.keys.following, name],
      queryFn: ({ signal }) =>
        UserService.fetchFollowingList({
          signal,
          params: { name: name, limit: limit },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        return lastPageParam + 1;
      },
    });
  }

  static infiniteSearchQuery(
    option: PagenationParams & {
      query: IUser["name"];
    }
  ) {
    const { query = "", limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [...this.keys.search, query],
      queryFn: ({ pageParam, signal }) =>
        UserService.searchUser({
          signal,
          params: {
            user_name: query,
            limit: limit,
            offset: pageParam * limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < limit) return;

        return lastPageParam + 1;
      },
      enabled: !!query,
    });
  }
}
