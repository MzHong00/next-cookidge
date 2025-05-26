"use client";

import Image from "next/image";

import type { ICookingStep } from "@/types/recipe/recipe";
import { PIdToURL } from "@/utils/pidToUrl";
import { useSlide } from "@/hooks/useSlide";
import { IconBox } from "@/components/common/iconBox";

import styles from "./recipeStep.module.scss";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";

export const RecipeStep = ({
  recipeSteps,
}: {
  recipeSteps: ICookingStep[];
}) => {
  const {
    ref,
    index,
    onClickPrev,
    onClickNext,
    onClickSlideByIndicator,
    onScrollDetectIndex,
  } = useSlide();

  return (
    <div className={styles.container}>
      <ul className={styles.indicatorContainer}>
        {Array.from({ length: recipeSteps.length }).map((_, i) => (
          <li key={i}>
            <button
              className={`${index === i && styles.activeIndicator}`}
              data-index={i}
              onClick={onClickSlideByIndicator}
            />
          </li>
        ))}
      </ul>

      <ul
        ref={ref}
        onScroll={onScrollDetectIndex}
        className={styles.sliderContainer}
      >
        {recipeSteps.map(({ picture, instruction }, idx) => (
          <li key={`${instruction}${idx}`}>
            <div className={styles.pictureBox}>
              <Image
                src={PIdToURL(picture)}
                alt={picture}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <b>{idx + 1}</b>
              <p>{instruction}</p>
            </div>
          </li>
        ))}
      </ul>

      <nav className={styles.navContainer}>
        <button>
          <IconBox Icon={RiArrowLeftSLine} onClick={onClickPrev} />
        </button>
        <button>
          <IconBox Icon={RiArrowRightSLine} onClick={onClickNext} />
        </button>
      </nav>
    </div>
  );
};
