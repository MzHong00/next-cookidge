import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";
import { CreateRecipeForm } from "@/components/features/recipe/create/createRecipeForm";

export default function RecipeCreateFormModal() {
  return (
    <ClientRender>
      <Dialog title="레시피 생성" style={{ width: "80%", height: "80%" }}>
        <CreateRecipeForm />
      </Dialog>
    </ClientRender>
  );
}
