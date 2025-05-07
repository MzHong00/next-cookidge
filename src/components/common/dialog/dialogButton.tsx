"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { twistFade } from "@/lib/framer-motion";
import { motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import styles from "./dialog.module.scss";

/*
  buttonComponent: 모달 창 열기 트리거 버튼
  children: 모달 창 내용

  - 한 줄로 모달창을 구현하기 위해 만든 모달 컴포넌트
*/

interface Props {
  DialogTitle: string;
  buttonComponent: React.ReactNode;
  children:
    | React.ReactNode
    | (({ closeHandler }: { closeHandler: () => void }) => React.ReactNode);
}

export const DialogButton = ({
  children,
  DialogTitle,
  buttonComponent,
}: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const openHandler = () => {
    setIsShow(true);
  };

  const closeHandler = () => {
    setIsShow(false);
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted ? (
    <>
      <button onClick={openHandler}>{buttonComponent}</button>

      {createPortal(
        <>
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
                transition={{ duration: 0.2 }}
                className={styles.dialog}
              >
                <div className={styles.container}>
                  <header>
                    <button onClick={closeHandler}>
                      <RiCloseLine />
                    </button>
                    {DialogTitle && <h2>{DialogTitle}</h2>}
                  </header>
                  {typeof children === "function"
                    ? children({ closeHandler })
                    : children}
                </div>
              </motion.div>
            </div>
          )}
        </>,
        document.body
      )}
    </>
  ) : null;
};
