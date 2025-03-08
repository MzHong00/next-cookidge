"use client";

import dynamic from "next/dynamic";

import { RecipeSearchOption } from "@/containers/recipe/recipeSearchOption/recipeSearchOption";

const RecipeList = dynamic(
  () =>
    import("@/containers/recipe/recipeList/recipeList").then(
      (m) => m.RecipeList
    ),
  { ssr: false }
);

export default function RecipePage() {
  return (
    <>
      <RecipeSearchOption />
      <RecipeList />
    </>
  );
}
