import Image from "next/image";
import { forwardRef } from "react";
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line";

import styles from "./index.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  previewUrl?: string;
}

export const InputFile = forwardRef<HTMLInputElement, Props>(
  ({ previewUrl, id, style, className, ...props }, ref) => {
    return (
      <div className={`${className} ${styles.container}`} style={style}>
        <label htmlFor={id} style={{position: "relative"}}>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="미리보기"
              fill
              className={styles.image}
            />
          ) : (
            <div className={styles.uploadPlaceholder}>
              <RiUpload2Line size={24} />
            </div>
          )}
        </label>

        <input id={id} ref={ref} type="file" accept="image/*" {...props} />
      </div>
    );
  }
);

InputFile.displayName = "InputFile";