import RecipeCreatePage from "../../create/page";
import { Dialog } from "@/components/common/dialog/dialog";

export default function RecipeCreateFormModal() {
  return (
    <Dialog title="레시피 생성" style={{ width: "80%", height: "80%" }}>
      <RecipeCreatePage />
    </Dialog>
  );
}
