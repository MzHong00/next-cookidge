"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import type { IFridge } from "@/types/fridge/type";
import {
  FridgeFormSchema,
  type IFridgeForm,
} from "@/types/fridge/fridge.contract";
import { ErrorMessage } from "@/components/common/inputErrorMessage";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useUpdateFridgeMutation } from "@/services/fridge/mutations/updateFridgeMutation";

import styles from "./updateFridgeForm.module.scss";

export const UpdateFridgeForm = ({
  fridge_id,
  defaultName,
}: {
  fridge_id: IFridge["_id"];
  defaultName?: string;
}) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useUpdateFridgeMutation(fridge_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFridgeForm>({
    defaultValues: {
      name: defaultName,
    },
    mode: "onBlur",
    resolver: zodResolver(FridgeFormSchema),
  });

  const onSubmit: SubmitHandler<IFridgeForm> = (data) => {
    openDialogMessage({
      message: `${data.name}(으)로 이름을 바꾸시겠습니까?`,
      requestFn: async () => {
        await mutateAsync(data.name);
      },
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="변경할 이름을 입력하세요."
          style={{ flexGrow: 1 }}
          {...register("name")}
        />
        <input
          type="submit"
          value="변경"
          className={styles.submitButton}
          disabled={isPending}
        />
      </form>
      {errors.name && <ErrorMessage msg={errors.name.message} />}
    </div>
  );
};
