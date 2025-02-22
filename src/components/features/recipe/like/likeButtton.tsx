"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiHeart3Fill } from "@react-icons/all-files/ri/RiHeart3Fill";

import type { IRecipe } from "@/types/recipe";
import { IconBox } from "@/components/common/iconBox";
import { UserQueries } from "@/services/user/queries/userQueries";
import {
  useLikeMutation,
  useUnlikeMutation,
} from "@/services/recipe/mutations/useLikeMutation";

const BUTTON_COLOR = "red";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  recipe_id: IRecipe["_id"];
  likeMembers?: IRecipe["like_members"];
}

export const LikeButton = ({
  recipe_id,
  likeMembers = [],
  ...props
}: Props) => {
  const { data: me } = useQuery(UserQueries.meQuery());

  const { mutate: likeMutate } = useLikeMutation(recipe_id);
  const { mutate: unlikeMutate } = useUnlikeMutation(recipe_id);

  const onClickLike = () => {
    if (!me) return;
    isLike ? likeMutate() : unlikeMutate();
  };

  const isLike = useMemo(
    () => me?._id && likeMembers.includes(me?._id),
    [me?._id, likeMembers]
  );

  return (
    <button onClick={onClickLike} style={{ width: "fit-content" }} {...props}>
      <IconBox
        Icon={() =>
          isLike ? (
            <RiHeart3Fill color={BUTTON_COLOR} />
          ) : (
            <RiHeart3Line color={BUTTON_COLOR} />
          )
        }
      >
        {likeMembers.length}
      </IconBox>
    </button>
  );
};
