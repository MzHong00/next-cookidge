"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

import { RecipeSearchOption } from "@/containers/recipe/recipeSearchOption/recipeSearchOption";

const RecipeList = dynamic(
  () => import("@/containers/recipe/recipeList/recipeList"),
  { ssr: false }
);

export default function RecipePage() {
  return (
    <>
      <RecipeSearchOption />
      <Suspense fallback="기달">
        <RecipeList />
      </Suspense>
    </>
  );
}
