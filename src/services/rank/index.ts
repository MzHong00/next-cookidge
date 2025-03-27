import axios from "..";

import type { IUser } from "@/types/user";
import type { PagenationParams } from "@/types";

export class RankServices {
  static readonly root = "/user";

  // 팔로우 랭킹
  static async followerRank(option: {
    params: PagenationParams;
    signal: AbortSignal;
  }): Promise<
    (Pick<IUser, "_id" | "picture" | "name"> & {
      follower_count: number;
    })[]
  > {
    return (await axios.get(`${this.root}/rank-follower`, option)).data;
  }

  // 레시피 메이커 랭킹
  static async recipeMakerRank(option: {
    params: PagenationParams;
    signal: AbortSignal;
  }): Promise<
    {
      _id: string;
      recipe_count: number;
      author: Pick<IUser, "_id" | "picture" | "name">;
    }[]
  > {
    return (await axios.get(`${this.root}/rank-recipe-maker`, option)).data;
  }
}
