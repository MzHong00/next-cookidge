import RecipeUpdatePage from "../../update/page";
import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";

export default function RecipeUpdateFormModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <ClientRender>
      <Dialog title="레시피 수정" style={{ width: "80%", height: "80%" }}>
        <RecipeUpdatePage params={params}/>
      </Dialog>
    </ClientRender>
  );
}
