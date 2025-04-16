import axios from "..";

import type { IUser } from "@/types/user/user";
import type { PagenationParams } from "@/types/common";
import type { IComment } from "@/types/comment/comment";
import type { IRecipe } from "@/types/recipe/recipe";

export class CommentService {
  static root = "/comment";

  // 댓글 리스트 읽기
  static async readCommentsQuery(config: {
    params: {
      recipe_id: IRecipe["_id"];
      last_comment_id: IComment["_id"];
    } & Partial<PagenationParams>;
    signal: AbortSignal;
  }): Promise<
    (IComment & {
      user: Pick<IUser, "_id" | "name" | "picture">[];
    })[]
  > {
    return (await axios.get(`${this.root}/read-list`, config)).data;
  }

  // 댓글 생성
  static async createComment(
    recipeId: IRecipe["_id"],
    comment: IComment["comment"]
  ): Promise<{ message: string }> {
    return (
      await axios.post(`${this.root}/create`, {
        recipe_id: recipeId,
        comment: comment,
      })
    ).data;
  }

  // 댓글 수정 (※ 아직 미사용)
  static async updateComment(
    commentId: IComment["_id"],
    comment: IComment["comment"]
  ): Promise<{ message: string }> {
    return (
      await axios.patch(`${this.root}/update`, {
        comment_id: commentId,
        comment,
      })
    ).data;
  }

  // 댓글 삭제
  static async deleteComment(
    commentId: IComment["_id"],
    authorId: IRecipe["author_id"]
  ): Promise<{ message: string }> {
    return (
      await axios.delete(`${this.root}/delete`, {
        data: {
          comment_id: commentId,
          author_id: authorId,
        },
      })
    ).data;
  }
}
