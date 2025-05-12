import FridgeCreatePage from "../../create/page";
import { Dialog } from "@/components/common/dialog/dialog";

export default function FridgeCreateModal() {
  return (
    <Dialog title="냉장고 생성">
      <FridgeCreatePage />
    </Dialog>
  );
}
