"use client";

import { type CSSProperties, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import { ClientRender } from "../clientRender";
import { twistFade } from "@/lib/framer-motion";

import styles from "./dialog.module.scss";

/*
  buttonComponent: 모달 창 열기 트리거 버튼
  children: 모달 창 내용

  - 한 줄로 모달창을 구현하기 위해 만든 모달 컴포넌트
*/

interface Props {
  title: string;
  style?: CSSProperties;
  className?: string;
  buttonComponent: React.ReactNode;
  children:
    | React.ReactNode
    | (({ closeHandler }: { closeHandler: () => void }) => React.ReactNode);
}

export const DialogCSR = (props: Props) => (
  <ClientRender>
    <Dialog {...props} />
  </ClientRender>
);

const Dialog = ({
  children,
  title,
  style,
  className,
  buttonComponent,
}: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const openHandler = () => {
    setIsShow(true);
  };

  const closeHandler = () => {
    setIsShow(false);
  };

  return (
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
                style={style}
                className={`${className} ${styles.dialog}`}
              >
                <header>
                  <button onClick={closeHandler}>
                    <RiCloseLine />
                  </button>
                  {title && <h2>{title}</h2>}
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
  );
};
