"use client";

import { useQueryClient } from "@tanstack/react-query";

import Link from "next/link";
import Image from "next/image";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import type { IRecipe } from "@/types/recipe";
import type { IComment } from "@/types/comment";
import { PIdToURL } from "@/utils/pidToUrl";
import { CurrentDateGap } from "@/utils/currentDateGap";
import { UserQueries } from "@/services/user/queries/userQueries";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { CommentQueries } from "@/services/comment/queries/commentQueries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { IconBox } from "@/components/common/iconBox";
import { SubjectBox } from "@/components/common/subjectBox";
import { CreateComment } from "../create/createComment";
import { DeleteCommentButton } from "../delete/deleteCommentButton";

import styles from "./comment.module.scss";

export const CommentList = ({ recipe_id }: { recipe_id: IRecipe["_id"] }) => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    CommentQueries.infiniteQuery({ recipeId: recipe_id, limit: 10 })
  );
  const setTarget = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <SubjectBox title="댓글" className={styles.commentList}>
      <CreateComment recipeId={recipe_id} />
      <div className="flex-column">
        {data?.pages.map((page) =>
          page.map((comment) => (
            <Comment key={comment._id} commentData={comment} />
          ))
        )}
        <div id="observer" ref={setTarget} style={{ height: "10%" }} />
      </div>
    </SubjectBox>
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
          <Image
            src={PIdToURL(user[0].picture)}
            alt=""
            width={40}
            height={40}
          />
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
