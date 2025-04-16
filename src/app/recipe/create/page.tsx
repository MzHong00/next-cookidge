import { Metadata } from "next";
import { CreateRecipeForm } from "@/components/features/recipe/create/createRecipeForm";
import { ClientRender } from "@/components/common/clientRender";

export const metadata: Metadata = {
  title: "레시피 생성",
};

export default function RecipeCreatePage() {
  return (
    <ClientRender>
      <CreateRecipeForm />
    </ClientRender>
  );
}
