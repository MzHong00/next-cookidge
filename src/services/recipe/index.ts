import axios from "..";

import type { IUser } from "@/types/user/user";
import type { PagenationParams } from "@/types/common";
import type {
  IRecipe,
  IIngredient,
  IRecipeQuery,
  IRecipeInputDTO,
} from "@/types/recipe/recipe";

export class RecipeService {
  static readonly root = "/recipe";

  static async readRecipe(
    id?: IRecipe["_id"]
  ): Promise<IRecipe & { user: IUser }> {
    return (await axios.get(`${this.root}/read/detail/${id}`)).data;
  }

  static async readRecipeList(config: {
    params: Partial<PagenationParams> & Partial<IRecipeQuery>;
    signal?: AbortSignal;
  }): Promise<IRecipe[]> {
    return (await axios.get(`${this.root}/read-list`, config)).data;
  }

  static async readMyLikeRecieps(config?: {
    signal: AbortSignal;
  }): Promise<Pick<IRecipe, "_id" | "pictures">[]> {
    return (await axios.get(`${this.root}/read-list/like`, config)).data;
  }

  static async readRecipeListByUserName(config: {
    signal?: AbortSignal;
    userName: IUser["name"];
  }): Promise<IRecipe[]> {
    const { userName, ...props } = config;
    return (await axios.get(`${this.root}/read/user/${userName}`, props)).data;
  }

  static async createRecipe(
    IRecipeInputDTO: IRecipeInputDTO
  ): Promise<{ message: string }> {
    return (await axios.post(`${this.root}/create`, IRecipeInputDTO)).data;
  }

  static async updateRecipe(
    recipeId: IRecipe["_id"],
    recipe: IRecipeInputDTO
  ): Promise<{ message: string }> {
    return (
      await axios.put(`${this.root}/update`, recipe, {
        params: { _id: recipeId },
      })
    ).data;
  }

  static async deleteRecipe(
    recipeId: IRecipe["_id"]
  ): Promise<{ message: string }> {
    return (
      await axios.delete(`${this.root}/delete`, {
        params: {
          _id: recipeId,
        },
      })
    ).data;
  }

  static async searchRecipe(config: {
    signal: AbortSignal;
    params: Partial<PagenationParams> & { query: string };
  }): Promise<IRecipe[]> {
    return (await axios.get(`${this.root}/search`, config)).data;
  }

  // next cookidge에서 다른 표현 방법 고려 (IRecipeCard)
  static async recommnedRecipe(config: {
    signal: AbortSignal;
    params: {
      categories?: IRecipe["category"][];
      my_ingredients?: IIngredient["name"][];
    };
  }): Promise<
    (IRecipe & {
      matched_ingredients: IIngredient["name"][];
    })[]
  > {
    if (config.params.my_ingredients?.length === 0) return [];

    return (await axios.get(`${this.root}/recommend`, config)).data;
  }

  static async likeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/like`, { recipe_id: recipeId });
  }

  static async unlikeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/unlike`, { recipe_id: recipeId });
  }
}
