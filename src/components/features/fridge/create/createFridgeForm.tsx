"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  FridgeFormSchema,
  type IFridgeForm,
} from "@/types/fridge/fridge.contract";
import { IconBox } from "@/components/common/iconBox";
import { ErrorMessage } from "@/components/common/inputErrorMessage";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useCreateFridgeMutation } from "@/services/fridge/mutations/createFridgeMutation";

import styles from "./createFridgeForm.module.scss";

export const CreateFridgeForm = () => {
  const router = useRouter();

  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useCreateFridgeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFridgeForm>({
    mode: "onBlur",
    resolver: zodResolver(FridgeFormSchema),
  });

  const onSubmit: SubmitHandler<IFridgeForm> = (data) => {
    openDialogMessage({
      message: `${data.name} 냉장고를 생성하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync(data.name);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column">
      <div>
        <input
          placeholder="냉장고 이름"
          className={styles.input}
          {...register("name")}
        />
        {errors.name && <ErrorMessage msg={errors.name.message} />}
      </div>
      <div className="flex-row-center">
        <button disabled={isPending}>
          <IconBox className="main-button">생성</IconBox>
        </button>
        <button
          onClick={() => {
            router.back();
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
};
