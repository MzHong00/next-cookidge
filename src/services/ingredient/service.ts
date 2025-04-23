import axios from "..";
import type { IFridge } from "@/types/fridge/type";
import type { IIngredient, IIngredientInputDto } from "@/types/ingredient/ingredient";


export class IngredientService {
  static readonly root = "/api/ingredient";

  static async createIngredientMutation(
    ingredients: Omit<IIngredient, "_id">[],
    fridgeId?: IFridge["_id"]
  ) {
    if (!fridgeId) return;

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
    ingredients: IIngredientInputDto[],
    fridgeId?: IFridge["_id"]
  ) {
    if (!fridgeId) return;

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
