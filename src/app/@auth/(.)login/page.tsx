import { Dialog } from "@/components/common/dialog/dialog";
import { LoginBox } from "@/components/features/user/login/loginBox";

export default function LoginModal() {
  return (
    <Dialog title="로그인">
      <LoginBox />
    </Dialog>
  );
}
