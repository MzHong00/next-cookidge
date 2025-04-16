import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import { MakerRank } from "@/components/features/rank/maker/makerRank";
import { RankQueries } from "@/services/rank/queries/rankQueries";

export default async function MakerRankParallelPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    RankQueries.InfiniteRecipeMakerRankQuery()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MakerRank />
    </HydrationBoundary>
  );
}
