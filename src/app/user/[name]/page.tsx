import { Metadata } from "next";

import { PIdToURL } from "@/utils/pidToUrl";
import { UserService } from "@/services/user";
import { getCookiesAsString } from "@/utils/getStringCookies";
import { UserQueries } from "@/services/user/queries/userQueries";
import { UserDetail } from "@/containers/user/userDetail/userDetail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import QueryHydrate from "@/components/common/queryHydrate";
import { UserRecipeList } from "@/components/features/recipe/read/userRecipeList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const user = await UserService.fetchUser(decodedName);

  return {
    title: user.name,
    description: user.introduce,
    openGraph: {
      title: user.name,
      images: PIdToURL(user.picture)
    }
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
