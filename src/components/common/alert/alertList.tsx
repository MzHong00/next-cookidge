"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
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
    const timer = setTimeout(() => {
      alertDequeue(message);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, alertDequeue]);

  return (
    <motion.div
      variants={fadeSlide}
      initial="leftSlide"
      animate="visible"
      className={styles.alert}
      style={{ backgroundColor: isSuccess ? "green" : "red" }}
    >
      {isSuccess ? <RiCheckLine /> : <RiErrorWarningLine />}
      {message}
    </motion.div>
  );
};
