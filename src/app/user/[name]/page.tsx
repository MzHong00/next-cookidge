import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import { UserDetail } from "@/containers/user/userDetail/userDetail";
import { UserQueries } from "@/services/user/queries/userQueries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/find?user_name=${decodedName}`,
    {
      method: "GET",
    }
  );
  const user = (await res.json()) as IUser;

  return {
    title: user.name,
    description: user.introduce,
    openGraph: {
      title: user.name,
      images: [user.picture],
    },
  };
}

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
