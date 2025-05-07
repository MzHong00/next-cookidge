export interface IIngredient {
  _id: string;
  name: string;
  category: string;
  quantity: string;
  expired_at: string;
}

export type IIngredientInputDTO = Omit<IIngredient, "_id">;
