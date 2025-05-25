import IngredientCreatePage from "../../ingredient/page";
import { Dialog } from "@/components/common/dialog/dialog";

export default function IngredientCreateModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Dialog title="재료 생성" style={{ width: "80%" }}>
      <IngredientCreatePage params={params} />
    </Dialog>
  );
}
