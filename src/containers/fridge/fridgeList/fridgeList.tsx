"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";

import { IconBox } from "@/components/common/iconBox";
import { FridgeSummary } from "../fridgeSummary/fridgeSummary";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

import styles from "./fridgeList.module.scss";

export const FridgeList = () => {
  const { data: fridgeList } = useSuspenseQuery(FridgeQueries.listQuery());

  return (
    <section className={styles.container}>
      <h2>냉장고 목록</h2>
      <ul className={styles.fridgeList}>
        {fridgeList?.map(({ _id, name, stored_ingredients, last_updated }) => (
          <li key={_id}>
            <Link
              key={_id}
              href={`/fridge/${_id}`}
            >
              <IconBox Icon={RiFridgeLine}>{name} 냉장고</IconBox>
            </Link>
            <FridgeSummary
              last_updated={last_updated}
              stored_ingredients={stored_ingredients}
              className={styles.fridgeSummary}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
