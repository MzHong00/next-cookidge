"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine";

import {
  type AlertTypes,
  useAlertActions,
  useAlertQueue,
} from "@/lib/zustand/alertStore";
import { fadeSlide } from "@/lib/framer-motion";

import styles from "./alertList.module.scss";


export const AlertList = () => {
  const queue = useAlertQueue();

  if (queue.length === 0) return null;

  return createPortal(
    <div className={styles.alertList}>
      {queue.map((alert, i) => (
        <Alert key={`${alert.message}${i}`} {...alert} />
      ))}
    </div>,
    document.body
  );
};


const Alert = ({ message, type }: AlertTypes) => {
  const { alertDequeue } = useAlertActions();
  const isSuccess = type === "success";

  useEffect(() => {
    setTimeout(() => {
      alertDequeue();
    }, 2000);
  }, [alertDequeue]);

  return (
    <AnimatePresence>
      <motion.div
      variants={fadeSlide}
      initial="leftSlide"
      animate="visible"
      exit="rightSlide"
      className={styles.alert}
      style={{ backgroundColor: isSuccess ? "green" : "red" }}
    >
      {isSuccess ? <RiCheckLine /> : <RiErrorWarningLine />}
      {message}
    </motion.div>
    </AnimatePresence>
  );
};