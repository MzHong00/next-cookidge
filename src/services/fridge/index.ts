import type { AxiosRequestConfig } from "axios";
import axios from "..";

import type { IFridge } from "@/types/fridge/type";
import type { IUser } from "@/types/user/user";

export class FridgeService {
  static readonly root = "refrigerator";

  static async fetchFridgeList(options?: AxiosRequestConfig) {
    try {
      return (await axios.get(`${this.root}/read-list`, options)).data;
    } catch (error) {
      throw error;
    }
  }

  static async fetchFridgeDetail(
    fridgeId: IFridge["_id"],
    options?: AxiosRequestConfig
  ): Promise<IFridge> {
    try {
      return (
        await axios.get(
          `${this.root}/read-detail?refrigerator_id=${fridgeId}`,
          options
        )
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async createFridge(
    fridgeName: IFridge["name"]
  ): Promise<{ message: string }> {
    try {
      return (await axios.post(`${this.root}/create`, { name: fridgeName }))
        .data;
    } catch (error) {
      throw error;
    }
  }

  static async updateFridge(
    fridgeId?: IFridge["_id"],
    fridgeName?: IFridge["name"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.patch(`${this.root}/update`, {
          refrigerator_id: fridgeId,
          refrigerator_name: fridgeName,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFridge(
    fridgeId: IFridge["_id"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.delete(`${this.root}/delete`, {
          data: { refrigerator_id: fridgeId },
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async addSharedMember(
    fridgeId: IFridge["_id"],
    inviteName: IUser["_id"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.patch(`${this.root}/shared-member/add`, {
          refrigerator_id: fridgeId,
          invite_name: inviteName,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async removeSharedMember(
    fridgeId?: IFridge["_id"],
    memberId?: IUser["_id"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.patch(`${this.root}/shared-member/remove`, {
          refrigerator_id: fridgeId,
          member_id: memberId,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }
}
