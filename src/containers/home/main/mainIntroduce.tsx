"use client";

import type { IconType } from "@react-icons/all-files";
import type { Url } from "next/dist/shared/lib/router/router";
import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";

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

export const MainIntroduce = memo(() => {
  return (
    <section className={styles.container}>
      <div className={styles.logoText}>
        <GradualSpacing text="Cookidge" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 1 },
          }}
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
              initial={{ opacity: 0, x: 50 * direction }}
              exit={{ opacity: 0, x: 50 * direction }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", delay: 1.5, duration: 1 },
              }}
              whileHover={{ scale: 1.05 }}
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
