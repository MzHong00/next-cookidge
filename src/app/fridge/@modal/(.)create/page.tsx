import FridgeCreatePage from "../../create/page";
import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";

export default function FridgeCreateModal() {
  return (
    <ClientRender>
      <Dialog title="냉장고 생성" style={{ width: "80%", height: "80%" }}>
        <FridgeCreatePage />
      </Dialog>
    </ClientRender>
  );
}
