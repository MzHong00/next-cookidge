import { RiLogoutBoxRLine } from "@react-icons/all-files/ri/RiLogoutBoxRLine";

import { AuthService } from "@/services/auth";
import { IconBox } from "@/components/common/iconBox";

export const LogoutButton = ({ className }: { className?: string }) => {
  const onClickLogout = () => {
    AuthService.logout();
  };

  return (
    <button onClick={onClickLogout}>
      <IconBox Icon={RiLogoutBoxRLine} className={className}>
        로그아웃
      </IconBox>
    </button>
  );
};
