import QueryHydrate from "@/components/common/queryHydrate";
import { ClientRender } from "@/components/common/clientRender";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { MainIntroduce } from "@/containers/home/main/mainIntroduce";
import { IntroduceBackground } from "@/containers/home/background/introduceBackground";

import styles from "./page.module.scss";

export default async function HomePage() {
  return (
    <div className={styles.container}>
      <MainIntroduce />
      <QueryHydrate queryOptions={[RecipeQueries.listQuery()]}>
        <ClientRender>
          <IntroduceBackground />
        </ClientRender>
      </QueryHydrate>
    </div>
  );
}
