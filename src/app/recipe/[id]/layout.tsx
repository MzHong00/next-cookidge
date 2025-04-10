import { Suspense } from "react";

import { BackButton } from "@/components/common/backButton";

import styles from "./styles.module.scss";

export default function Layout({
  children,
  modal,
  background,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  background: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      {modal}
      {background}
      <nav>
        <BackButton />
      </nav>
      <Suspense>{children}</Suspense>
    </div>
  );
}
