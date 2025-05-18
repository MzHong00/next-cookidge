"use client";

import { Fragment } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IFridge } from "@/types/fridge/type";
import {
  IngredientFormSchema,
  IUpdateIngredientForm,
} from "@/types/ingredient/ingredient.contract";
import {
  INGREDIENT_CATEGORIES,
  INGREDIENT_TABLE_FIELD,
} from "@/constants/ingredient";
import { IconBox } from "@/components/common/iconBox";
import { ErrorMessage } from "@/components/common/inputErrorMessage";
import { useCreateIngredientMutation } from "@/services/ingredient/mutations/createIngredientMutation";

import styles from "./createIngredientForm.module.scss";

export const CreateIngredientForm = ({
  fridge_id,
}: {
  fridge_id: IFridge["_id"];
}) => {
  const { mutate } = useCreateIngredientMutation(fridge_id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateIngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "", expired_at: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onClickAppendField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ name: "", category: "", quantity: "", expired_at: "" });
  };

  const onSubmit: SubmitHandler<IUpdateIngredientForm> = (data) => {
    const ingredients = data.ingredients.map((ingredient) => {
      const { ...inputIngredientDto } = ingredient;

      return inputIngredientDto;
    });

    mutate(ingredients);
    reset();
  };

  return (
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
              {INGREDIENT_TABLE_FIELD.map((filed) => (
                <td key={filed}>{filed}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields?.map((ingredient, i) => (
              <Fragment key={ingredient.id}>
                <tr className={styles.ingredientRow}>
                  <td>
                    <select
                      id="category"
                      {...register(`ingredients.${i}.category`)}
                    >
                      {Object.entries(INGREDIENT_CATEGORIES).map(
                        ([text, emoji]) => (
                          <option key={text}>
                            {emoji} {text}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="재료 이름"
                      {...register(`ingredients.${i}.name`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="수량"
                      {...register(`ingredients.${i}.quantity`)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`ingredients.${i}.expired_at`)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => remove(i)}>
                      <IconBox
                        Icon={CgRemoveR}
                        className={styles.removeButton}
                        color="red"
                      />
                    </button>
                  </td>
                </tr>
                {errors.ingredients?.[i] && (
                  <ErrorMessage msg="모든 항목을 입력해주세요." />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onClickAppendField} style={{ width: "fit-content" }}>
        <IconBox Icon={RiAddLine}>추가</IconBox>
      </button>
      <input type="submit" className={styles.submit} value="생성" />
    </form>
  );
};
