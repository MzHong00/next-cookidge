import type { IUser } from "../user/user";
import type { IIngredient } from "../ingredient/ingredient";

export interface IFridge {
  _id: string;
  name: string;
  owner_id: IUser["_id"];
  shared_members: IUser["_id"][];
  allowed_users: Pick<IUser, "_id" | "picture" | "name">[];
  stored_ingredients: IIngredient[];
  last_updated: string;
}

export type IFridgeList = Pick<
  IFridge,
  "_id" | "name" | "last_updated" | "stored_ingredients"
>;
