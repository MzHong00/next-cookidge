import axios from "..";

import type { IUser } from "@/types/user/user";
import type { PagenationParams } from "@/types/common";

export class UserService {
  static readonly root = "/user";

  static async fetchMe(): Promise<IUser | null> {
    const response = await axios.get(`${this.root}/me`, {
      headers: {
        "Cache-Control": "no-cache", // 캐시를 사용하지 않음
      },
    });
    const { user } = response?.data;

    return user ?? null;
  }

  static async fetchUser(userName: IUser["name"]): Promise<IUser> {
    const response = await axios.get(`${this.root}/find`, {
      params: { user_name: userName },
    });

    return response.data;
  }

  static async fetchFollowerList(config: {
    signal: AbortSignal;
    params: PagenationParams & {
      name: IUser["name"];
    };
  }): Promise<Pick<IUser, "_id" | "name" | "picture">[]> {
    const response = await axios.get(`${this.root}/follower`, config);

    return response.data;
  }

  static async fetchFollowingList(config: {
    signal: AbortSignal;
    params: PagenationParams & {
      name: IUser["name"];
    };
  }): Promise<Pick<IUser, "_id" | "name" | "picture">[]> {
    const response = await axios.get(`${this.root}/following`, config);

    return response.data;
  }

  static async searchUser(config: {
    signal: AbortSignal;
    params: {
      user_name: IUser["name"];
    } & PagenationParams;
  }): Promise<
    (Pick<IUser, "_id" | "picture" | "name"> & {
      introduce: string;
      follower_count: string | number;
    })[]
  > {
    return (await axios.get(`${this.root}/search`, config)).data;
  }

  static async updateUser(
    updateData: Pick<IUser, "name" | "introduce"> & {
      picture?: IUser["picture"];
    }
  ): Promise<{ message: string }> {
    return (await axios.patch(`${this.root}/update`, updateData)).data;
  }

  // 유저 팔로우
  static async followUser(followUserId: IUser["_id"]) {
    return (
      await axios.patch(`${this.root}/follow`, {
        follow_user_id: followUserId,
      })
    ).data;
  }

  // 유저 언팔로우
  static async unfollowUser(unfollowUserId: IUser["_id"]) {
    return (
      await axios.patch(`${this.root}/unfollow`, {
        unfollow_user_id: unfollowUserId,
      })
    ).data;
  }

  // 유저 삭제
  static async deleteUser(): Promise<{ message: string }> {
    return (await axios.delete(`${this.root}/delete`)).data;
  }
}
