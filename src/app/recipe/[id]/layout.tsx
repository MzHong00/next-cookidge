import { IconBox } from "@/components/common/iconBox";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/recipe" className="main-button-dark">
          <IconBox>목록으로</IconBox>
        </Link>
      </nav>
      {children}
    </div>
  );
}
