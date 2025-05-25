import { create } from "zustand";

import { IIngredientInputDTO } from "@/types/ingredient/ingredient";

interface IIngredientFormStore {
  ingredients: Partial<IIngredientInputDTO>[];
  setIngredients: (ingredients: Partial<IIngredientInputDTO>[]) => void;
}

export const useIngredientFormStore = create<IIngredientFormStore>()((set) => ({
  ingredients: [{ name: "", quantity: "", expired_at: "" }],
  setIngredients: (ingredients) =>
    set(() => ({
      ingredients: ingredients,
    })),
}));

export const useSetIngredientsAction = () =>
  useIngredientFormStore((state) => state.setIngredients);
