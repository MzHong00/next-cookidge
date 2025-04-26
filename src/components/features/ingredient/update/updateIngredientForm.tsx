import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IFridge } from "@/types/fridge/type";
import {
  IngredientFormSchema,
  type IUpdateIngredientForm,
} from "@/types/ingredient/ingredient.contract";
import type { IIngredient } from "@/types/ingredient/ingredient";
import {
  INGREDIENT_CATEGORIES,
  INGREDIENT_TABLE_FIELD,
} from "@/constants/ingredient";
import { IconBox } from "@/components/common/iconBox";
import { useUpdateIngredientMutation } from "@/services/ingredient/mutations/updateIngredientMutation";

import styles from "./updateIngredientForm.module.scss";

interface Props {
  fridge_id: IFridge["_id"];
  onSubmitAttach: () => void;
  stored_ingredients: IIngredient[];
}

export const UpdateIngredientForm = ({
  fridge_id,
  onSubmitAttach,
  stored_ingredients,
}: Props) => {
  const { mutate } = useUpdateIngredientMutation(fridge_id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateIngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      ingredients: stored_ingredients,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onClickAppendField = () => {
    append({ name: "", category: "", quantity: "", expired_at: Date() });
  };

  const onSubmit: SubmitHandler<IUpdateIngredientForm> = ({ ingredients }) => {
    onSubmitAttach();
    mutate(ingredients);
    reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ overflowY: "auto" }}>
          <table className={styles.table}>
            <colgroup>
              {Array.from({ length: 5 }).map((_, i) => (
                <col key={i} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {INGREDIENT_TABLE_FIELD.map((field) => (
                  <td key={field}>{field}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((ingredient, index) => (
                <tr key={ingredient.id} className={styles.ingredient}>
                  <td>
                    <select {...register(`ingredients.${index}.category`)}>
                      {Object.entries(INGREDIENT_CATEGORIES).map(
                        ([text, emoji]) => (
                          <option key={text} value={text}>
                            {emoji} {text}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td>
                    <input
                      placeholder="재료 이름"
                      {...register(`ingredients.${index}.name`)}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="수량"
                      {...register(`ingredients.${index}.quantity`)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`ingredients.${index}.expired_at`)}
                    />
                  </td>
                  <td>
                    <button onClick={() => remove(index)}>
                      <IconBox
                        Icon={CgRemoveR}
                        className={styles.removeButton}
                        color="red"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.appendButton}>
          <button onClick={onClickAppendField}>
            <IconBox Icon={RiAddLine}>추가</IconBox>
          </button>
        </div>
        <input type="submit" className={styles.submitButton} value="확인" />
      </form>
    </div>
  );
};
