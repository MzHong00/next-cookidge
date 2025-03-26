import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import { ClientRender } from "@/components/common/clientRender";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { MainIntroduce } from "@/containers/home/main/mainIntroduce";
import { IntroduceBackground } from "@/containers/home/background/introduceBackground";

import styles from "./page.module.scss";

export default async function HomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(RecipeQueries.listQuery());

  return (
    <div className={styles.container}>
      <MainIntroduce />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientRender>
          <IntroduceBackground />
        </ClientRender>
      </HydrationBoundary>
    </div>
  );
}
