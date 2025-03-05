import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { Suspense } from "react";

import { MainIntroduce } from "@/containers/home/main/mainIntroduce";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { IntroduceBackground } from "@/containers/home/background/introduceBackground";

import styles from "./page.module.scss";

export default function HomePage() {
  const queryClient = new QueryClient();
  queryClient.prefetchInfiniteQuery(RecipeQueries.listQuery());

  return (
    <div className={styles.container}>
      <MainIntroduce />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback="로딩중">
          <IntroduceBackground />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
