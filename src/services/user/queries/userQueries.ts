import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import type { PagenationParams } from "@/types";
import { UserService } from "..";

export class UserQueries {
  static readonly keys = {
    me: ["me"],
    user: ["user"],
    infinite: ["user", "inifinite"],
  };

  static meQuery() {
    return queryOptions({
      queryKey: [...this.keys.me],
      queryFn: () => UserService.fetchMe(),
      refetchOnWindowFocus: false,
    });
  }

  static userQuery(name?: IUser["name"]) {
    return queryOptions({
      queryKey: [...this.keys.user, name],
      queryFn: () => (name ? UserService.fetchUser(name) : null),
      enabled: !!name,
    });
  }

  static InfiniteSearchQuery(
    option: Partial<PagenationParams> & {
      query: IUser["name"];
    }
  ) {
    const { query = "", limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [...this.keys.infinite, query],
      queryFn: ({ pageParam, signal }) =>
        UserService.searchUser({
          signal,
          params: {
            user_name: query,
            limit: limit,
            offset: pageParam * Number(limit),
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < Number(limit)) return;

        return lastPageParam + 1;
      },
      enabled: !!query,
    });
  }
}
