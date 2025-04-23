"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";

import type { IFridge } from "@/types/fridge/type";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

import styles from "./fridgeList.module.scss";

export const FridgeList = ({
  active_fridge_id,
}: {
  active_fridge_id: IFridge["_id"];
}) => {
  const { data: fridgeList } = useSuspenseQuery(FridgeQueries.listQuery());

  return (
    <section className={styles.container}>
      {fridgeList?.map((fridge) => (
        <Link
          href={`detail/${fridge._id}`}
          key={fridge._id}
          className={`${styles.fridgeButton} ${
            fridge._id === active_fridge_id && styles.active
          }`}
        >
          <RiFridgeLine />
          {fridge.name}
        </Link>
      ))}
    </section>
  );
};
