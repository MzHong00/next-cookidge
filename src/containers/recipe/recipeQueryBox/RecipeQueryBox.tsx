"use client";

import { Suspense } from "react";

import { SearchBox } from "@/components/common/search";
import { RecipeSort } from "@/components/features/recipe/sort/recipeSort";
import { RecipeFilter } from "@/components/features/recipe/filter/recipeFilter";
import { RecipeDisplayQuery } from "../recipeDisplayQuery/recipeDisplayQuery";
import { useSetQueryStringByInput } from "@/hooks/useSetQueryStringByInput";

import styles from "./RecipeQueryBox.module.scss";

export const RecipeQueryBox = () => {
  const { value, onChangeSetValue } = useSetQueryStringByInput("title");

  return (
    <div className={styles.container}>
      <Suspense>
        <div className={styles.actionBar}>
          <SearchBox value={value} onChange={onChangeSetValue} />
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
