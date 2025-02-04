import axios from ".";

import type { IUser } from "@/types/user";
import type { PagenationParams } from "@/types";
import type { IIngredient } from "@/types/ingredient";
import type { IRecipe, IRecipeInput, IRecipeQuery } from "@/types/recipe";

export class RecipeService {
  static readonly root = "/api/recipe";

  static async readRecipe(
    id?: IRecipe["_id"]
  ): Promise<IRecipe & { user: IUser }> {
    return (await axios.get(`${this.root}/read/detail/${id}`)).data[0];
  }

  // next cookidge에서 다른 표현 방법 고려 (IRecipeCard)
  static async readRecipeList(config: {
    params: Partial<PagenationParams> & Partial<IRecipeQuery>;
    signal: AbortSignal;
  }) {
    return (await axios.get(`${this.root}/read-list`, config)).data;
  }

  static async readMyRecipe(config: {
    signal: AbortSignal;
  }): Promise<Pick<IRecipe, "_id" | "pictures">[]> {
    return (await axios.get(`${this.root}/read-list/me`, config)).data;
  }

  static async readRecipeListByUser(
    userName: IUser["name"]
  ): Promise<Pick<IRecipe, "_id" | "pictures">[]> {
    return (await axios.get(`${this.root}/read/user/${userName}`)).data;
  }

  static async createRecipe(
    IRecipeInputDTO: IRecipeInput
  ): Promise<{ message: string }> {
    return (
      await axios.post(`${this.root}/create`, IRecipeInputDTO, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  static async updateRecipe(
    recipeId: IRecipe["_id"],
    recipe: IRecipeInput
  ): Promise<{ message: string }> {
    return (
      await axios.put(`${this.root}/update`, recipe, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  static async readMyLikeRecieps(config: {
    signal: AbortSignal;
  }): Promise<Pick<IRecipe, "_id" | "pictures">[]> {
    return (await axios.get(`${this.root}/read-list/like`, config)).data;
  }

  static async likeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/like`, { recipe_id: recipeId });
  }

  static async unlikeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/unlike`, { recipe_id: recipeId });
  }
}
