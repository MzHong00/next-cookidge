import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRecipe>();

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "cooking_steps",
  });

  const onSubmit: SubmitHandler<IRecipe> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <input type="submit" value="Create Recipe" />
    </form>
  );
}
