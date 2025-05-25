"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { NavTypes } from "@/types/common";
import { NAV_TYPES } from "@/constants/nav";
import { fadeSlide } from "@/lib/framer-motion";
import { GradualSpacing } from "@/components/common/textAnimation/gradulaSpacing";

import styles from "./mainIntroduce.module.scss";

const SERVICE_TYPES = NAV_TYPES.filter(({ text }) =>
  ["레시피", "냉장고"].includes(text)
);

const ANIMATE_DELAY = 1;
const ANIMATE_DURATION = 1;
const HOVER_SCALE = 1;

export const MainIntroduce = () => {
  return (
    <section className={styles.container}>
      <div className={styles.logoBox}>
        <GradualSpacing text="Cookidge" className={styles.logo} />
        <motion.p
          variants={fadeSlide}
          initial="upSlide"
          animate="visible"
          transition={{ delay: ANIMATE_DELAY, duration: ANIMATE_DURATION }}
        >
          레시피 & 냉장고 서비스
        </motion.p>
      </div>

      <div className={styles.services}>
        {SERVICE_TYPES.map((type, key) => {
          const direction = key % 2 === 0 ? -1 : 1;

          return (
            <motion.div
              key={type.text}
              variants={fadeSlide}
              custom={50 * direction}
              initial="leftSlide"
              animate="visible"
              transition={{
                type: "spring",
                delay: ANIMATE_DELAY * 1.5,
                duration: ANIMATE_DURATION,
              }}
              whileHover={{ scale: HOVER_SCALE }}
            >
              <LinkIconCard {...type} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const LinkIconCard = ({ href, Icon, text }: NavTypes) => {
  return (
    <Link href={href} className={styles.card} scroll={false}>
      <Icon />
      <hr />
      <h4>{text}</h4>
    </Link>
  );
};
