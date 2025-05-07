"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import { twistFade } from "@/lib/framer-motion";

import styles from "./dialog.module.scss";

// 병렬 라우팅 + 인터셉트 라우팅에서 사용하는 모달

interface Props {
  title?: string;
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export function Dialog({ title, style, className, children }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const closeDialog = () => {
    router.back();
  };

  return createPortal(
    <AnimatePresence>
      <motion.dialog
        ref={dialogRef}
        variants={twistFade}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
        style={style}
        className={`${styles.dialog} ${className}`}
      >
        <div className={`${styles.container}`}>
          <header>
            <button onClick={closeDialog}>
              <RiCloseLine />
            </button>
            {title && <h2>{title}</h2>}
          </header>
          {children}
        </div>
      </motion.dialog>
    </AnimatePresence>,
    document.body
  );
}
