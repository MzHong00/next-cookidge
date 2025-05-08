import Link from "next/link";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "@/components/common/iconBox";

export default async function UserDetailLayout({
  children,
  followerModal,
  followingModal,
}: {
  children: React.ReactNode;
  followerModal: React.ReactNode;
  followingModal: React.ReactNode;
}) {
  return (
    <div className="flex-column">
      {followerModal}
      {followingModal}
      <Link href="/user" className="main-button-dark">
        <IconBox Icon={RiSearchLine}>사용자 검색</IconBox>
      </Link>
      {children}
    </div>
  );
}
