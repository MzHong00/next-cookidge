"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { twistFade } from "@/lib/framer-motion";
import { AnimatePresence, motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import styles from "./dialog.module.scss";

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  DialogTitle?: string;
  buttonComponent: React.ReactNode;
  children:
    | React.ReactNode
    | (({ closeHandler }: { closeHandler: () => void }) => React.ReactNode);
}

export const DialogButton = ({
  DialogTitle,
  buttonComponent,
  children,
  ...props
}: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const openHandler = () => {
    setIsShow(true);
  };

  const closeHandler = () => {
    setIsShow(false);
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? (
    <>
      <button onClick={openHandler} {...props}>
        {buttonComponent || "버튼"}
      </button>

      {createPortal(
        <AnimatePresence>
          {isShow && (
            <div
              className={styles.background}
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsShow(false);
              }}
            >
              <motion.div
                variants={twistFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className={styles.container}
              >
                <header>
                  <button onClick={closeHandler}>
                    <RiCloseLine />
                  </button>
                  {DialogTitle && <h2>{DialogTitle}</h2>}
                </header>
                {typeof children === "function"
                  ? children({ closeHandler })
                  : children}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  ) : null;
};
