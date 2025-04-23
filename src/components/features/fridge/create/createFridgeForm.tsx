"use client";

import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import type { IFridgeFormInput } from "@/types/fridge/type";
import { InputBox } from "@/components/common/inputBox";
import { IconBox } from "@/components/common/iconBox";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useCreateFridgeMutation } from "@/services/fridge/mutations/createFridgeMutation";

import styles from "./createFridgeForm.module.css";

export const CreateFridgeForm = () => {
  const router = useRouter();

  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useCreateFridgeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFridgeFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFridgeFormInput> = (data) => {
    if (isPending) return;

    openDialogMessage({
      message: `${data.name} 냉장고를 생성하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync(data.name);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputBox
            label="이름"
            placeholder="냉장고 이름"
            {...register("name", { required: true, maxLength: 10 })}
            aria-invalid={errors.name ? "true" : "false"}
            autoComplete="off"
          />
          {errors.name?.type === "required" && (
            <p className="alert-text">*필수 항목</p>
          )}
          {errors.name?.type === "maxLength" && (
            <p className="alert-text">*10자 이내로 입력해주세요</p>
          )}
        </div>
        <div className={styles.actionBar}>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className={styles.closeButton}
          >
            취소
          </button>
          <button className="main-button">
            <IconBox>생성</IconBox>
          </button>
        </div>
      </form>
    </div>
  );
};
