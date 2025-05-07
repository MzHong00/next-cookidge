import { Metadata } from "next";

import type { IUser } from "@/types/user/user";
import { PIdToURL } from "@/utils/pidToUrl";
import { getCookiesAsString } from "@/utils/getStringCookies";
import { UserDetail } from "@/containers/user/userDetail/userDetail";
import QueryHydrate from "@/components/common/queryHydrate";
import { UserRecipeList } from "@/components/features/recipe/read/userRecipeList";
import { UserQueries } from "@/services/user/queries/userQueries";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";

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
      images: [PIdToURL(user.picture)],
    },
  };
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const cookies = await getCookiesAsString();
  const decodedName = decodeURIComponent(name);

  return (
    <QueryHydrate
      queryOptions={[
        UserQueries.meQuery({ headers: { Cookie: cookies } }),
        UserQueries.userQuery(decodedName),
        RecipeQueries.listQueryByUserName(decodedName),
      ]}
    >
      <UserDetail name={decodedName} />
      <UserRecipeList name={decodedName} />
    </QueryHydrate>
  );
}
