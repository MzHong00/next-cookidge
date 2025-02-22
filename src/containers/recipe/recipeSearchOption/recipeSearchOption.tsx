import { RecipeSort } from "@/components/features/recipe/sort/recipeSort";
import { SearchBox } from "@/components/common/search";
import { RecipeFilter } from "@/components/features/recipe/filter/recipeFilter";

import styles from "./recipeSearchOption.module.scss";

export const RecipeSearchOption = () => {
  return (
    <header className={styles.header}>
      <SearchBox className={styles.search} />
      <div className={styles.option}>
        <RecipeFilter />
        <RecipeSort />
      </div>
    </header>
  );
};
