"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { IconBox } from "@/components/common/iconBox";
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
      <Link href="/recipe/create">
        <IconBox>레시피 생성</IconBox>
      </Link>
      <RecipeSearchOption />
      <RecipeList />
    </>
  );
}
