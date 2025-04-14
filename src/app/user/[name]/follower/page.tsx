import type { Metadata } from "next";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";
import { FollowerList } from "@/components/features/user/read/followerList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${decodeURIComponent(name)} - 팔로워`,
  };
}

export default async function UserFollowerPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const queryCleint = new QueryClient();
  await queryCleint.prefetchInfiniteQuery(
    UserQueries.followerInfiniteQuery({ name: decodedName })
  );

  return (
    <HydrationBoundary state={dehydrate(queryCleint)}>
      <FollowerList name={decodedName} />
    </HydrationBoundary>
  );
}
