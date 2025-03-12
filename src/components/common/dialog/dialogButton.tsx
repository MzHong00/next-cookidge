"use client";

import { createPortal } from "react-dom";
import { CSSProperties, useEffect, useState } from "react";
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
  className?: string;
  style?: CSSProperties;
  DialogTitle?: string;
  buttonComponent: React.ReactNode;
  children:
    | React.ReactNode
    | (({ closeHandler }: { closeHandler: () => void }) => React.ReactNode);
}

export const DialogButton = ({
  style,
  children,
  className,
  DialogTitle,
  buttonComponent,
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
      <button onClick={openHandler}>{buttonComponent || "버튼"}</button>

      {createPortal(
        <>
          {isShow && (
            <div
              className={`${styles.background}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsShow(false);
              }}
            >
              <motion.div
                variants={twistFade}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2 }}
                style={style}
                className={`${styles.container} ${className}`}
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
        </>,
        document.body
      )}
    </>
  ) : null;
};
