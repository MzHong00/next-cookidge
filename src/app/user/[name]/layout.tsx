import Link from "next/link";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "@/components/common/iconBox";

export default async function UserDetailLayout({
  children,
  modalFollower,
  modalFollowing,
}: {
  children: React.ReactNode;
  modalFollower: React.ReactNode;
  modalFollowing: React.ReactNode;
}) {
  return (
    <div className="flex-column">
      {modalFollower}
      {modalFollowing}
      <Link href="/user" className="main-button-dark">
        <IconBox Icon={RiSearchLine}>사용자 검색</IconBox>
      </Link>
      {children}
    </div>
  );
}
