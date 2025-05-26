"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiCalendarLine } from "@react-icons/all-files/ri/RiCalendarLine";

import type { IRecipe } from "@/types/recipe/recipe";
import type { IIngredient } from "@/types/ingredient/ingredient";
import { fadeSlide } from "@/lib/framer-motion";
import { CurrentDateGap } from "@/utils/currentDateGap";
import { INGREDIENT_CATEGORIES } from "@/constants/ingredient";
import { UserQueries } from "@/services/user/queries/userQueries";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { IconBox } from "@/components/common/iconBox";
import { Underline } from "@/components/common/underline";
import { UserCard } from "@/containers/user/userCard/userCard";
import { PictureSlider } from "@/components/common/pictureSlider";
import { RecipeStep } from "@/containers/recipe/recipeStep/recipeStep";
import { LikeButton } from "@/components/features/recipe/like/likeButtton";
import { CommentList } from "@/components/features/comment/read/commentList";
import { RecipeDeleteButton } from "@/components/features/recipe/delete/recipeDeleteButton";

import styles from "./recipeDetail.module.scss";

const SECTION = ["요리소개", "조리과정"] as const;
const SLIDE_MOVE_PX = 300;

export function RecipeDetail({ id }: { id: string }) {
  const [tab, setTab] = useState<(typeof SECTION)[number]>(SECTION[0]);

  const { data: me } = useQuery(UserQueries.meQuery());
  const { data: recipe } = useSuspenseQuery(RecipeQueries.detailQuery(id));

  const { _id, ingredients, cooking_steps, user, ...contents } = recipe;

  const changeTabHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTab(e.currentTarget.innerText as (typeof SECTION)[number]);
    },
    []
  );

  return (
    <div className="flex-column">
      <motion.section
        className={styles.card}
        variants={fadeSlide}
        initial="leftSlide"
        animate="visible"
        custom={SLIDE_MOVE_PX}
      >
        <header className={styles.cardHeader}>
          <UserCard name={user.name} picture={user.picture} />
          {me?._id === user._id && (
            <div className={styles.recipeAction}>
              <RecipeUpdateLink recipe_id={recipe._id} />
              <RecipeDeleteButton recipe_id={recipe._id} />
            </div>
          )}
        </header>
        <hr style={{opacity: 0.5}}/>

        <TabIndex tab={tab} onClick={changeTabHandler} />

        {tab === SECTION[0] && (
          <motion.div
            variants={fadeSlide}
            initial="rightSlide"
            animate="visible"
          >
            <Contents recipe={contents} />
          </motion.div>
        )}
        {tab === SECTION[1] && (
          <motion.div
            variants={fadeSlide}
            initial="leftSlide"
            animate="visible"
          >
            <RecipeStep recipeSteps={cooking_steps} />
          </motion.div>
        )}
        <LikeButton
          recipe_id={_id}
          likeMembers={contents.like_members}
          style={{ width: "fit-content" }}
        />
      </motion.section>

      <section>
        <Ingredients ingredients={ingredients} />
      </section>

      <section>
        <CommentList recipe_id={_id} author_id={recipe.author_id} />
      </section>
    </div>
  );
}

const Contents = ({
  recipe,
}: {
  recipe: Omit<IRecipe, "_id" | "ingredients" | "cooking_steps">;
}) => {
  const { name, introduction, pictures, servings, cooking_time, created_at } =
    recipe;

  return (
    <div className={styles.contentContainer}>
      <PictureSlider pictures={pictures} className={styles.pictureSlider} />
      <div className={styles.contents}>
        <h2>{name}</h2>
        <section>
          <IconBox Icon={RiCalendarLine}>
            {CurrentDateGap(created_at)}전
          </IconBox>
          <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
          <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
        </section>
        <p>{introduction}</p>
      </div>
    </div>
  );
};

const Ingredients = ({
  ingredients,
}: {
  ingredients: Pick<IIngredient, "category" | "name" | "quantity">[];
}) => {
  return (
    <ul className={styles.ingredients}>
      {ingredients.map(({ category, name, quantity }, i) => (
        <motion.li
          key={name}
          variants={fadeSlide}
          initial="leftSlide"
          animate="visible"
          transition={{ delay: i * 0.1 }}
        >
          <IconBox>
            {INGREDIENT_CATEGORIES[category]} {name} {quantity}
          </IconBox>
        </motion.li>
      ))}
    </ul>
  );
};

const TabIndex = memo(
  ({
    tab,
    onClick,
  }: {
    tab: (typeof SECTION)[number];
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <div className={styles.cardTabIndex}>
        {SECTION.map((v) => (
          <button key={v} onClick={onClick}>
            <IconBox>
              {v}
              {v === tab && <Underline />}
            </IconBox>
          </button>
        ))}
      </div>
    );
  }
);
TabIndex.displayName = "TabIndex";

const RecipeUpdateLink = ({ recipe_id }: { recipe_id: IRecipe["_id"] }) => {
  return <Link href={`/recipe/${recipe_id}/update`}>수정</Link>;
};
