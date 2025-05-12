"use client";

import { type CSSProperties, useState } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import { ClientRender } from "../clientRender";
import { twistFade } from "@/lib/framer-motion";

import styles from "./dialog.module.scss";

// 병렬 라우팅 + 인터셉트 라우팅에서 사용하는 모달

interface Props {
  title?: string;
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export const Dialog = (props: Props) => (
  <ClientRender>
    <DialogComponent {...props} />
  </ClientRender>
);

const DialogComponent = ({ title, style, className, children }: Props) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(true);
  
  const closeDialog = () => {
    if (!isShow) return;

    setIsShow(false);
    router.back();
  };

  if(!isShow) return;

  return createPortal(
    <div
      className={styles.background}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDialog();
      }}
    >
      <motion.div
        variants={twistFade}
        initial="initial"
        animate="animate"
        style={style}
        className={`${styles.dialog} ${className}`}
      >
        <header>
          <button onClick={closeDialog}>
            <RiCloseLine />
          </button>
          {title && <h2>{title}</h2>}
        </header>
        {children}
      </motion.div>
    </div>,
    document.body
  );
};
