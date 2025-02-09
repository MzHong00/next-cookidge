"use client";

import { useMotionValueEvent, useScroll } from "motion/react";

import { RecipeIntroduce } from "@/containers/home/recipe/recipeIntroduce";
import { FridgeIntroduce } from "@/containers/home/fridge/fridgeIntroduce";

export const Home = () => {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });

  return (
    <div>
      <RecipeIntroduce />
      <FridgeIntroduce />
    </div>
  );
};
