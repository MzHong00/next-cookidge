import { SearchBox as ReceipSearchBox } from "@/components/common/search";
import { RecipeSort } from "@/components/features/recipe/sort/recipeSort";
import { RecipeFilter } from "@/components/features/recipe/filter/recipeFilter";

import styles from "./recipeSearchOption.module.scss";

export const RecipeSearchOption = () => {
  return (
    <header className={styles.header}>
      <ReceipSearchBox />
      <div className={styles.option}>
        <RecipeFilter />
        <RecipeSort />
      </div>
    </header>
  );
};
