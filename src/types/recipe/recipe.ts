import type { IUser } from "../user";
import { ICreateRecipeForm } from "./recipe.contract";

export interface IRecipe {
  _id: string;
  name: string;
  pictures: string[];
  author_id: IUser["_id"];
  ingredients: Omit<IIngredient, "_id" | "expired_at">[];
  introduction: string;
  servings: number;
  category: string;
  cooking_time: number;
  cooking_steps: ICookingStep[];
  like_members: IUser["_id"][];
  created_at: string;
}

export interface IIngredient {
  _id: string;
  name: string;
  category: string;
  quantity: string;
  expired_at: string;
}

export interface ICookingStep {
  picture: string;
  instruction: string;
}

export interface IRecipeQuery {
  categories: IRecipe["category"][];
  sort: "time" | "like";
}

export interface IRecipeInputDTO
  extends Omit<ICreateRecipeForm, "pictures" | "cooking_steps"> {
  pictures: string[];
  cooking_steps: ICookingStep[];
}
