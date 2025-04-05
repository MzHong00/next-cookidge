"use client";

import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

export const BackButton = () => {
  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };

  return (
    <button onClick={goBackHandler} className={styles.button}>
      뒤로가기
    </button>
  );
};
