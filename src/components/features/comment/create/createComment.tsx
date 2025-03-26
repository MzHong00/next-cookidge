"use client";

import { useState } from "react";

import type { IRecipe } from "@/types/recipe/recipe";
import { IconBox } from "@/components/common/iconBox";
import { AuthGuardButton } from "@/components/common/authGuardButton";
import { useCreateCommentMutation } from "@/services/comment/mutations/createCommentMutation";

import styles from "./createComment.module.scss";

export const CreateComment = ({ recipeId }: { recipeId: IRecipe["_id"] }) => {
  const [comment, setComment] = useState<string>("");
  const { mutate } = useCreateCommentMutation(recipeId);

  const onClickCreateComment = () => {
    mutate(comment);
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
      <AuthGuardButton onClick={onClickCreateComment}>
        <IconBox className="main-button">입력</IconBox>
      </AuthGuardButton>
    </div>
  );
};
