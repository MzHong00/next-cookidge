"use client";

import type { IconType } from "@react-icons/all-files";
import type { Url } from "next/dist/shared/lib/router/router";
import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";

import { fadeSlide } from "@/lib/framer-motion";
import { GradualSpacing } from "@/components/common/textAnimation/gradulaSpacing";

import styles from "./mainIntroduce.module.scss";

interface ServiceType {
  Icon: IconType;
  href: Url;
  text: string;
}

const SERVICE_TYPES: ServiceType[] = [
  {
    Icon: RiBook2Line,
    href: "recipe",
    text: "레시피",
  },
  {
    Icon: RiFridgeLine,
    href: "fridge",
    text: "냉장고",
  },
];

const ANIMATE_DELAY = 1;
const ANIMATE_DURATION = 1;
const HOVER_SCALE = 1;

export const MainIntroduce = memo(() => {
  return (
    <section className={styles.container}>
      <div className={styles.logoText}>
        <GradualSpacing text="Cookidge" />
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
});

const LinkIconCard = ({ href, Icon, text }: ServiceType) => {
  return (
    <Link href={href} className={styles.card} scroll={false}>
      <Icon />
      <hr />
      <h4>{text}</h4>
    </Link>
  );
};
