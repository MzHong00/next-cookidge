"use client"

import { Suspense } from "react";
import dynamic from "next/dynamic";

const RecipeList = dynamic(() => import("@/containers/recipe/recipeList/index"), { ssr: false });

export default function RecipePage() {
  return (
    <Suspense fallback="기달">
      <RecipeList />
    </Suspense>
  );
}
