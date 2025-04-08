import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";
import { FollowingList } from "@/components/features/user/read/followingList";

export default async function UserFollowingPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const queryCleint = new QueryClient();
  await queryCleint.prefetchInfiniteQuery(
    UserQueries.followingInfiniteQuery({ name: decodedName })
  );

  return (
    <HydrationBoundary state={dehydrate(queryCleint)}>
      <FollowingList name={decodedName} />
    </HydrationBoundary>
  );
}
