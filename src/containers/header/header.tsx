import Link from "next/link";
import type { CSSProperties } from "react";

import { Logo } from "@/components/common/logo";

import styles from "./header.module.scss";

interface Props {
  style: CSSProperties;
  className: string;
}

export const Header = ({ style, className }: Partial<Props>) => {
  return (
    <header style={style} className={`${className} ${styles.header}`}>
      <Link href="/">
        <Logo />
      </Link>
    </header>
  );
};
