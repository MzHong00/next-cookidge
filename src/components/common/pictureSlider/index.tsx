"use client";

import Image from "next/image";
import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";

import type { IRecipe } from "@/types/recipe";
import { IconBox } from "@/components/common/iconBox";
import { useSlide } from "@/hooks/useSlide";
import { PIdToURL } from "@/utils/pidToUrl";

import styles from "./index.module.scss";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  pictures: IRecipe["pictures"];
  isThumbnaileMode?: boolean;
}

export const PictureSlider = ({
  pictures,
  isThumbnaileMode = false,
  className,
  ...props
}: Props) => {
  const {
    ref,
    index,
    onClickPrev,
    onClickNext,
    onClickSlideByIndicator,
    onScrollDetectIndex,
  } = useSlide();

  if (pictures.length < 1)
    return (
      <div className={styles.emptyPicture}>
        <div>사진 없음</div>
      </div>
    );

  return (
    <div className={styles.container}>
      <ul
        ref={ref}
        className={`${className} ${styles.pictureContainer}`}
        onScroll={onScrollDetectIndex}
        {...props}
      >
        {pictures.map((picture) => (
          <li key={picture}>
            <Image src={PIdToURL(picture)} alt="image" fill />
          </li>
        ))}
      </ul>
      {!isThumbnaileMode && pictures.length > 1 && (
        <nav className={styles.indicatorContainer}>
          <button>
            <IconBox Icon={RiArrowDropLeftLine} onClick={onClickPrev} />
          </button>
          <nav>
            {pictures.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${index === i && styles.activeDot}`}
                onClick={onClickSlideByIndicator}
                data-index={i}
              />
            ))}
          </nav>
          <button>
            <IconBox Icon={RiArrowDropRightLine} onClick={onClickNext} />
          </button>
        </nav>
      )}
    </div>
  );
};
