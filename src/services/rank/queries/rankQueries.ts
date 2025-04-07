import { infiniteQueryOptions } from "@tanstack/react-query";

import type { PagenationParams } from "@/types";
import { RankServices } from "..";

export class RankQueries {
  static readonly keys = {
    follower: ["rank", "infinite", "follower"],
    maker: ["rank", "infinite", "recipe-maker"],
  };

  static InfiniteFollowerRankQuery(option?: PagenationParams) {
    const { limit = 10 } = option || {};

    return infiniteQueryOptions({
      queryKey: [...this.keys.follower],
      queryFn: ({ pageParam, signal }) =>
        RankServices.followerRank({
          signal,
          params: {
            limit: limit,
            offset: pageParam * limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < limit) return;

        return lastPageParam + 1;
      },
    });
  }

  static InfiniteRecipeMakerRankQuery(option?: PagenationParams) {
    const { limit = 5 } = option || {};

    return infiniteQueryOptions({
      queryKey: [...this.keys.maker],
      queryFn: ({ pageParam, signal }) =>
        RankServices.recipeMakerRank({
          signal,
          params: {
            limit: limit,
            offset: pageParam * limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0 || lastPage.length < limit) return;

        return lastPageParam + 1;
      },
    });
  }
}
