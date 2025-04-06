"use client";

import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";

import { IconBox } from "../iconBox";

import styles from "./index.module.scss";

export const BackButton = () => {
  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };

  return (
    <button>
      <IconBox
        Icon={RiArrowLeftSLine}
        onClick={goBackHandler}
        className={styles.button}
      >
        뒤로가기
      </IconBox>
    </button>
  );
};
