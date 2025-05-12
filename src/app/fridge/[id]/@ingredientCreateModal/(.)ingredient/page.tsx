import IngredientCreatePage from "../../ingredient/page";
import { Dialog } from "@/components/common/dialog/dialog";

export default function IngredientCreateModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Dialog title="냉장고 생성">
      <IngredientCreatePage params={params} />
    </Dialog>
  );
}
