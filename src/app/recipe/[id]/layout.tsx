import Link from "next/link";
import { Suspense } from "react";

import { IconBox } from "@/components/common/iconBox";

import styles from "./styles.module.scss";

export default function Layout({
  children,
  background,
}: {
  children: React.ReactNode;
  background: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      {background}
      <nav>
        <Link href="/recipe" className="main-button-dark" scroll={false}>
          <IconBox>목록으로</IconBox>
        </Link>
      </nav>
      <Suspense>{children}</Suspense>
    </div>
  );
}
