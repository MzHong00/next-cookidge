"use client";

import { useSearchParams } from "next/navigation";
import { RecipeThumbnail } from "@/components/recipe/recipeThumbnail";

import styles from "./index.module.scss";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { RecipeQueries } from "@/services/recipe/queries";

export function RecipeList() {
  const searchParams = useSearchParams();
  const { data } = useSuspenseInfiniteQuery(RecipeQueries.listQuery(searchParams.toString()));

  return (
    <ul className={styles.container}>
      {data.pages.map((page) => (
        page.map((recipe) => (
          <li key={recipe._id}>
          <RecipeThumbnail {...recipe} />
        </li>
        ))
      ))}
    </ul>
  );
}
