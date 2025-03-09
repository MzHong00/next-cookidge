"use client";

import dynamic from "next/dynamic";

import { IconBox } from "@/components/common/iconBox";
import { DialogButton } from "@/components/common/dialog/dialogButton";
import CreateRecipeForm from "@/components/features/recipe/create/createRecipeForm";
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
      <DialogButton
        DialogTitle="레시피 생성"
        buttonComponent={<IconBox>레시피 생성</IconBox>}
        style={{width: "80%", height: "80%"}}
      >
        <CreateRecipeForm />
      </DialogButton>
      <RecipeSearchOption />
      <RecipeList />
    </>
  );
}
