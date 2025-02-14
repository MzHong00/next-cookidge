import Image from "next/image";

import { RecipeService } from "@/services/recipe";
import { PIdToURL } from "@/utils/pidToUrl";

import styles from "./introduceBackground.module.scss";

const RECIPE_COUNT = 10;

const fetchRecipes = async () => {
  return RecipeService.readRecipeList({
    params: { limit: RECIPE_COUNT },
  });
};

export const IntroduceBackground = async () => {
  const recipes = await fetchRecipes();

  return (
    <section className={styles.container}>
      {recipes.map(({ _id, pictures }, i) => (
        <Image
          key={_id}
          src={PIdToURL(pictures[0])}
          alt="bg-pic"
          width={200}
          height={200}
          style={{
            bottom: `${Math.random() * 500}px`,
            animationDuration: `${10 + Math.random() * 50}s`,
            animationDelay: `${Math.random() * 10 - 20}s`,
          }}
        />
      ))}
    </section>
  );
};
