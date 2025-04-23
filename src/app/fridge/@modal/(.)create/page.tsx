import FridgeCreatePage from "../../create/page";
import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";

export default function FridgeCreateModal() {
  return (
    <ClientRender>
      <Dialog title="냉장고 생성">
        <FridgeCreatePage />
      </Dialog>
    </ClientRender>
  );
}
