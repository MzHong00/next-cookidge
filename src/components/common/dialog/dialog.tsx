"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import { twistFade } from "@/lib/framer-motion";

import styles from "./dialog.module.scss";

export function Dialog({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
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
        className={styles.container}
      >
        <header>
          <button onClick={closeDialog}>
            <RiCloseLine />
          </button>
          {title && <h2>{title}</h2>}
        </header>
        {children}
      </motion.dialog>
    </AnimatePresence>,
    document.body
  );
}
