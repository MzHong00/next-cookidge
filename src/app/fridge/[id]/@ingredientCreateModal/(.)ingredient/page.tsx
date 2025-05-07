import IngredientCreatePage from "../../ingredient/page";
import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";

export default function IngredientCreateModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <ClientRender>
      <Dialog title="냉장고 생성">
        <IngredientCreatePage params={params} />
      </Dialog>
    </ClientRender>
  );
}
