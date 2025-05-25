"use client";

import { Suspense } from "react";

import { RECIPE_QUERY_STRING_KEY } from "@/constants/common";
import { SearchInput } from "@/components/common/search";
import { RecipeSort } from "@/components/features/recipe/sort/recipeSort";
import { RecipeFilter } from "@/components/features/recipe/filter/recipeFilter";
import { RecipeDisplayQuery } from "../recipeDisplayQuery/recipeDisplayQuery";
import { useSetQueryStringByInput } from "@/hooks/useSetQueryStringByInput";

import styles from "./RecipeQueryBox.module.scss";

export const RecipeQueryBox = ({ className }: { className?: string }) => {
  const { value, onChangeSetValue } = useSetQueryStringByInput(
    RECIPE_QUERY_STRING_KEY
  );

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.actionBar}>
        <SearchInput value={value} onChange={onChangeSetValue} />
        <div className={styles.option}>
          <Suspense>
            <RecipeFilter />
            <RecipeSort />
          </Suspense>
        </div>
      </div>
      <RecipeDisplayQuery />
    </div>
  );
};
