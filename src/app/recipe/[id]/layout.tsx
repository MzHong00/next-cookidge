import Link from "next/link";

import { IconBox } from "@/components/common/iconBox";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/recipe" className="main-button-dark" scroll={false}>
          <IconBox>목록으로</IconBox>
        </Link>
      </nav>
      {children}
    </div>
  );
}
