"use client";

import { useQuery } from "@tanstack/react-query";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import type { IRecipe } from "@/types/recipe/recipe";
import type { IComment } from "@/types/comment";
import { PIdToURL } from "@/utils/pidToUrl";
import { CurrentDateGap } from "@/utils/currentDateGap";
import { UserQueries } from "@/services/user/queries/userQueries";
import { CommentQueries } from "@/services/comment/queries/commentQueries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Profile } from "@/components/common/profile";
import { IconBox } from "@/components/common/iconBox";
import { CreateComment } from "../create/createComment";
import { DeleteCommentButton } from "../delete/deleteCommentButton";

import styles from "./comment.module.scss";

export const CommentList = ({
  recipe_id,
  author_id,
}: {
  recipe_id: IRecipe["_id"];
  author_id: IRecipe["author_id"];
}) => {
  const { data: me } = useQuery(UserQueries.meQuery());
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    CommentQueries.infiniteQuery(recipe_id)
  );
  const setTarget = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div className={styles.commentList}>
      <h2>댓글</h2>
      <CreateComment recipeId={recipe_id} />
      <ul className="flex-column">
        {data?.pages.map((page) =>
          page.map((comment) => {
            const delAuth = comment.user_id == me?._id || author_id === me?._id;

            return (
              <li key={comment._id} className="flex-row-between">
                <Comment commentData={comment} />
                {delAuth && (
                  <div className={styles.actionBar}>
                    <DeleteCommentButton
                      comment_id={comment._id}
                      recipe_id={recipe_id}
                      author_id={author_id}
                    />
                  </div>
                )}
              </li>
            );
          })
        )}
        <div id="observer" ref={setTarget} style={{ height: "10%" }} />
      </ul>
    </div>
  );
};

const Comment = ({
  commentData,
}: {
  commentData: Pick<IComment, "comment" | "created_at"> & {
    user: Pick<IUser, "_id" | "name" | "picture">[];
  };
}) => {
  const { comment, created_at, user } = commentData;

  return (
    <div className={styles.comment}>
      <IconBox className={styles.profileButton}>
        <Profile name={user[0].name} picture={PIdToURL(user[0].picture)} />
      </IconBox>
      <div>
        <header className={styles.nameBar}>
          <h4>{user[0].name}</h4>
          {created_at && <p>{CurrentDateGap(created_at)}전</p>}
        </header>
        <p>{comment}</p>
      </div>
    </div>
  );
};
