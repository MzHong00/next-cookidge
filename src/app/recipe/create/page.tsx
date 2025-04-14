import { Metadata } from "next";
import { CreateRecipeForm } from "@/components/features/recipe/create/createRecipeForm";

export const metadata: Metadata = {
  title: "레시피 생성",
};

export default function RecipeCreatePage() {
  return <CreateRecipeForm />;
}
