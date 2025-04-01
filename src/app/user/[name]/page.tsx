import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { UserDetail } from "@/containers/user/userDetail/userDetail";
import { UserQueries } from "@/services/user/queries/userQueries";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  
  const queryclient = new QueryClient();
  await queryclient.prefetchQuery(UserQueries.userQuery(decodedName));

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <UserDetail name={decodedName} />
    </HydrationBoundary>
  );
}
