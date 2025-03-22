import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";
import { LoginBox } from "@/components/features/user/login/loginBox";

export default function LoginModal() {
  return (
    <ClientRender>
      <Dialog title="로그인">
        <LoginBox />
      </Dialog>
    </ClientRender>
  );
}
