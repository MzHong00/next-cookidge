import { RecipeSort } from "@/components/features/recipe/sort/recipeSort";
import { RecipeFilter } from "@/components/features/recipe/filter/recipeFilter";
import { RecipeSearch } from "@/components/features/recipe/search/recipeSearch";

import styles from "./recipeSearchOption.module.scss";

export const RecipeSearchOption = () => {
  return (
    <header className={styles.header}>
      <RecipeSearch />
      <div className={styles.option}>
        <RecipeFilter />
        <RecipeSort />
      </div>
    </header>
  );
};
