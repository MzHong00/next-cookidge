"use client";

import { useState } from "react";

import { IconBox } from "@/components/common/iconBox";

import styles from "./createComment.module.scss";

export const CreateComment = () => {
  const [comment, setComment] = useState<string>("");

  const onClickCreateComment = () => {
    setComment("");
  };

  return (
    <div className={styles.container}>
      <textarea
        value={comment}
        placeholder="댓글을 입력하세요"
        className={styles.textArea}
        onChange={(e) => setComment(e.target.value)}
        maxLength={100}
      />
      <button>
        <IconBox className="main-button" onClick={onClickCreateComment}>
          입력
        </IconBox>
      </button>
    </div>
  );
};
