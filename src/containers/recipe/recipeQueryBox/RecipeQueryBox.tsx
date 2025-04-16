import { Suspense } from "react";

import { SearchBox as ReceipSearchBox } from "@/components/common/search";
import { RecipeSort } from "@/components/features/recipe/sort/recipeSort";
import { RecipeFilter } from "@/components/features/recipe/filter/recipeFilter";
import { RecipeDisplayQuery } from "../recipeDisplayQuery/recipeDisplayQuery";

import styles from "./RecipeQueryBox.module.scss";

export const RecipeQueryBox = () => {
  return (
    <div className={styles.container}>
      <Suspense>
        <div className={styles.actionBar}>
          <ReceipSearchBox />
          <div className={styles.option}>
            <RecipeFilter />
            <RecipeSort />
          </div>
        </div>
        <RecipeDisplayQuery />
      </Suspense>
    </div>
  );
};
