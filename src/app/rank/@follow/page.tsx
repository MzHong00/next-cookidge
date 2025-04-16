import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import { RankQueries } from "@/services/rank/queries/rankQueries";
import { FollowRank } from "@/components/features/rank/follow/followRank";

export default async function FollowRankPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    RankQueries.InfiniteFollowerRankQuery()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FollowRank />
    </HydrationBoundary>
  );
}
