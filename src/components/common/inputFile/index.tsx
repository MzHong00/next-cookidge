import Image from "next/image";
import { forwardRef } from "react";
import { RiImageAddFill } from "@react-icons/all-files/ri/RiImageAddFill";

import styles from "./index.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  previewUrl?: string;
}

export const InputFile = forwardRef<HTMLInputElement, Props>(
  ({ previewUrl, id, style, className, ...props }, ref) => {
    return (
      <div className={`${className} ${styles.container}`} style={style}>
        <label htmlFor={id}>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="미리보기"
              className={styles.image}
              fill
              sizes="200px"
            />
          ) : (
            <div className={styles.uploadPlaceholder}>
              <RiImageAddFill size={32} />
            </div>
          )}
        </label>

        <input id={id} ref={ref} type="file" accept="image/*" {...props} />
      </div>
    );
  }
);

InputFile.displayName = "InputFile";