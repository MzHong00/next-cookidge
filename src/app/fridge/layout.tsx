import Link from "next/link";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IconBox } from "@/components/common/iconBox";

export const metadata = {
  title: "냉장고",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-column">
      <Link href={"/fridge/create"}>
        <IconBox Icon={RiAddLine} className="main-button">
          냉장고 만들기
        </IconBox>
      </Link>
      {children}
    </div>
  );
}
