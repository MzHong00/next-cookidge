"use client";

import { useQueryClient } from "@tanstack/react-query";

import Link from "next/link";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import type { IRecipe } from "@/types/recipe/recipe";
import type { IComment } from "@/types/comment";
import { PIdToURL } from "@/utils/pidToUrl";
import { CurrentDateGap } from "@/utils/currentDateGap";
import { UserQueries } from "@/services/user/queries/userQueries";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { CommentQueries } from "@/services/comment/queries/commentQueries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Profile } from "@/components/common/profile";
import { IconBox } from "@/components/common/iconBox";
import { FlexColumn } from "@/components/common/flexBox";
import { CreateComment } from "../create/createComment";
import { DeleteCommentButton } from "../delete/deleteCommentButton";

import styles from "./comment.module.scss";

export const CommentList = ({ recipe_id }: { recipe_id: IRecipe["_id"] }) => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    CommentQueries.infiniteQuery(recipe_id)
  );
  const setTarget = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <FlexColumn className={styles.commentList}>
      <h2>댓글</h2>
      <CreateComment recipeId={recipe_id} />
      <div className="flex-column">
        {data?.pages.map((page) =>
          page.map((comment) => (
            <Comment key={comment._id} commentData={comment} />
          ))
        )}
        <div id="observer" ref={setTarget} style={{ height: "10%" }} />
      </div>
    </FlexColumn>
  );
};

const Comment = ({
  commentData,
}: {
  commentData: IComment & { user: Pick<IUser, "_id" | "name" | "picture">[] };
}) => {
  const { _id, user_id, recipe_id, comment, created_at, user } = commentData;

  const queryClient = useQueryClient();

  const me = queryClient.getQueryData<IUser>([UserQueries.keys.me]);
  const recipe = queryClient.getQueryData<IRecipe>([
    RecipeQueries.keys.root,
    recipe_id,
  ]);

  const deleteAuthorize =
    recipe && (user_id === me?._id || recipe.author_id === me?._id);

  return (
    <div className={styles.comment}>
      <Link href={`/user/${user[0].name}`}>
        <IconBox className={styles.profileButton}>
          <Profile picture={PIdToURL(user[0].picture)}/>
        </IconBox>
      </Link>
      <div>
        <header className={styles.nameBar}>
          <h4>{user[0].name}</h4>
          {created_at && <p>{CurrentDateGap(created_at)}전</p>}
          {deleteAuthorize && (
            <div className={styles.actionBar}>
              <DeleteCommentButton
                comment_id={_id}
                recipe_id={recipe_id}
                author_id={recipe.author_id}
              />
            </div>
          )}
        </header>
        <p>{comment}</p>
      </div>
    </div>
  );
};
