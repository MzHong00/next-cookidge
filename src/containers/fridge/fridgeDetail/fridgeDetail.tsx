"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BsGear } from "@react-icons/all-files/bs/BsGear";

import type { IFridge } from "@/types/fridge/type";
import { IconBox } from "@/components/common/iconBox";
import { Dropdown } from "@/components/common/dropdown";
import { DeleteFridgeButton } from "@/components/features/fridge/delete/fridgeDeleteButton";
import { FridgeSummary } from "../fridgeSummary/fridgeSummary";
import { FridgeSharedMembers } from "../fridgeSharedMembers/fridgeSharedMembers";
import { IngredientContainer } from "../../ingredient/ingredientContainer/ingredientContainer";
import { RecipeRecommend } from "@/containers/recipe/recipeRecommend/recipeRecommend";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

import styles from "./fridgeDetailPage.module.scss";

export const FridgeDetail = ({ id }: { id: IFridge["_id"] }) => {
  const {
    data: { _id, name, allowed_users, stored_ingredients, last_updated },
  } = useSuspenseQuery(FridgeQueries.detailQuery(id));

  return (
    <div className="flex-column">
      <h2>{name} 냉장고</h2>

      <div style={{ marginLeft: "auto" }}>
        <Dropdown
          buttonChildren={<IconBox Icon={BsGear} className={styles.config} />}
        >
          <Link href={`/fridge/${_id}/setting`}>설정</Link>
          <DeleteFridgeButton id={_id} />
        </Dropdown>
      </div>

      <FridgeSharedMembers allowed_users={allowed_users} />
      <FridgeSummary
        stored_ingredients={stored_ingredients}
        last_updated={last_updated}
      />
      <IngredientContainer _id={_id} stored_ingredients={stored_ingredients} />
      <RecipeRecommend fridge_id={_id} my_ingredients={stored_ingredients} />
    </div>
  );
};
