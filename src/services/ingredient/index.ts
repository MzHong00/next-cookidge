import axios from "..";
import type { IFridge } from "@/types/fridge/type";
import type { IIngredientInputDTO } from "@/types/ingredient/ingredient";

export class IngredientService {
  static readonly root = "/ingredient";

  static async createIngredientMutation(
    fridgeId: IFridge["_id"],
    ingredients: IIngredientInputDTO[]
  ) {
    return (
      await axios.post(
        `${this.root}/create`,
        { ingredients: ingredients },
        {
          params: {
            refrigerator_id: fridgeId,
          },
        }
      )
    ).data;
  }

  static async updateIngredientMutation(
    fridgeId: IFridge["_id"],
    ingredients: IIngredientInputDTO[]
  ) {
    return (
      await axios.patch(
        `${this.root}/update`,
        { ingredients: ingredients },
        {
          params: {
            refrigerator_id: fridgeId,
          },
        }
      )
    ).data;
  }
}
