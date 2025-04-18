import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

import type { IRecipe } from "@/types/recipe/recipe";
import type { IUser } from "@/types/user/user";
import { APP_NAME } from "@/constants/common";
import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { CommentQueries } from "@/services/comment/queries/commentQueries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipe/read/detail/${id}`,
    {
      method: "GET",
    }
  );
  const recipe = (await res.json()) as IRecipe & {
    user: IUser;
  };

  return {
    title: `${recipe.name} | ${APP_NAME}`,
    description: recipe.introduction,
    openGraph: {
      title: recipe.name,
      images: recipe.pictures,
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(RecipeQueries.detailQuery(id)),
    queryClient.prefetchInfiniteQuery(CommentQueries.infiniteQuery(id)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeDetail id={id} />
    </HydrationBoundary>
  );
}
