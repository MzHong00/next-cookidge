"use client";

import { useRouter } from "next/navigation";
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine";

import { IconBox } from "../iconBox";

import styles from "./index.module.scss";

export const DisplayProblem = ({
  msg,
}: {
  msg: string;
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <RiErrorWarningLine />
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
