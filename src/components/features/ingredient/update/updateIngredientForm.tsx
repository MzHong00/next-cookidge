import {
  useForm,
  useFieldArray,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";
import {
  type IUpdateIngredientForm,
  IngredientFormSchema,
} from "@/types/ingredient/ingredient.contract";
import { IconBox } from "@/components/common/iconBox";
import { INGREDIENT_CATEGORIES } from "@/constants/ingredient";
import { useUpdateIngredientMutation } from "@/services/ingredient/mutations/updateIngredientMutation";

import styles from "./updateIngredientForm.module.scss";

interface Props {
  fridge_id: IFridge["_id"];
  stored_ingredients: IIngredient[];
}

export const UpdateIngredientForm = ({
  fridge_id,
  stored_ingredients,
}: Props) => {
  const { mutate } = useUpdateIngredientMutation(fridge_id);

  const { control, register, handleSubmit } = useForm<IUpdateIngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      ingredients: stored_ingredients,
    },
  });

  const { fields, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmit: SubmitHandler<IUpdateIngredientForm> = ({ ingredients }) => {
    mutate(ingredients);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.ingredientList}>
        {fields.map((ingredient, i) => (
          <li key={ingredient.id}>
            <button
              onClick={() => {
                remove(i);
              }}
            >
              <IconBox Icon={RiCloseLine} className={styles.removeButton} />
            </button>

            <IngredientUpdateCard {...ingredient} i={i} register={register} />
          </li>
        ))}
      </ul>
      <input type="submit" value="저장" className={styles.submit} />
    </form>
  );
};

const IngredientUpdateCard = ({
  i,
  register,
}: {
  i: number;
  register: UseFormRegister<IUpdateIngredientForm>;
}) => {
  return (
    <div className={styles.updateCard}>
      <select {...register(`ingredients.${i}.category`)}>
        {Object.entries(INGREDIENT_CATEGORIES).map(([text, emoji]) => (
          <option key={text}>
            {emoji} {text}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="재료 이름"
        {...register(`ingredients.${i}.name`)}
      />
      <input
        type="text"
        placeholder="수량"
        {...register(`ingredients.${i}.quantity`)}
      />
      <input type="date" {...register(`ingredients.${i}.expired_at`)} />
    </div>
  );
};
