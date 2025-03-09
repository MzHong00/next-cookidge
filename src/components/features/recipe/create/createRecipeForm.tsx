import {
  useForm,
  SubmitHandler,
  useFieldArray,
  type UseFormReturn,
} from "react-hook-form";

import { Steps } from "@/components/common/steps";

import styles from './createRecipeForm.module.scss';

interface Props {
  useForm: UseFormReturn<IRecipe, any, undefined>;
}

export interface IIngredient {
  name: string;
  quantity: string;
}

export interface ICookingStep {
  description: string;
}

export interface IRecipe {
  name: string;
  pictures: string[];
  ingredients: Omit<IIngredient, "_id" | "expired_at">[];
  introduction: string;
  servings: number | string;
  category: string;
  cooking_time: number | string;
  cooking_steps: ICookingStep[];
}

export default function CreateRecipeForm() {
  const hookForm = useForm<IRecipe>();
  const {
    handleSubmit,
    formState: { errors },
  } = hookForm;
  
  const onSubmit: SubmitHandler<IRecipe> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Steps>
        <RecipeInfoFields key="정보" useForm={hookForm} />
        <IngredientFields key="재료" useForm={hookForm} />
        <CookingStepFields key="조리과정" useForm={hookForm} />
      </Steps>
    </form>
  );
}

const RecipeInfoFields = ({ useForm }: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm;

  return (
    <>
      <input
        placeholder="Recipe Name"
        {...register("name", { required: true })}
      />
      {errors.name && <span>Name is required</span>}

      <textarea
        placeholder="Introduction"
        {...register("introduction", { required: true })}
      />
      {errors.introduction && <span>Introduction is required</span>}

      <input
        placeholder="Category"
        {...register("category", { required: true })}
      />
      {errors.category && <span>Category is required</span>}

      <input
        type="number"
        placeholder="Servings"
        {...register("servings", { required: true })}
      />
      {errors.servings && <span>Servings is required</span>}

      <input
        type="number"
        placeholder="Cooking Time (minutes)"
        {...register("cooking_time", { required: true })}
      />
      {errors.cooking_time && <span>Cooking time is required</span>}
    </>
  );
};

export const IngredientFields = ({ useForm }: Props) => {
  const { register, control } = useForm;

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <>
      <h3>Ingredients</h3>
      {ingredientFields.map((field, index) => (
        <div key={field.id}>
          <input
            placeholder="Ingredient Name"
            {...register(`ingredients.${index}.name`, { required: true })}
          />
          <input
            placeholder="Quantity"
            {...register(`ingredients.${index}.quantity`, { required: true })}
          />
          <button type="button" onClick={() => removeIngredient(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendIngredient({ name: "", quantity: "" })}
      >
        Add Ingredient
      </button>
    </>
  );
};

export const CookingStepFields = ({ useForm }: Props) => {
  const { register, control } = useForm;

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "cooking_steps",
  });

  return (
    <>
      <h3>Cooking Steps</h3>
      {stepFields.map((field, index) => (
        <div key={field.id}>
          <textarea
            placeholder="Step Description"
            {...register(`cooking_steps.${index}.description`, {
              required: true,
            })}
          />
          <button type="button" onClick={() => removeStep(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendStep({ description: "" })}>
        Add Step
      </button>
    </>
  );
};
