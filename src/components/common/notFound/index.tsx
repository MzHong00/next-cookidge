"use client";

import { useRouter } from "next/navigation";

import { IconBox } from "../iconBox";

import styles from "./index.module.scss";

export const NotFound = ({
  msg = "페이지를 찾지 못했어요..!",
}: {
  msg?: string;
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>{msg}</p>
      <button
        onClick={() => {
          router.back();
        }}
      >
        <IconBox>돌아가기</IconBox>
      </button>
    </div>
  );
};
