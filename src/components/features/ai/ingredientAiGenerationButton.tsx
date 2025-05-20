"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiImageAddFill } from "@react-icons/all-files/ri/RiImageAddFill";

import { IconBox } from "@/components/common/iconBox";

import type { IFridge } from "@/types/fridge/type";
import { AIService } from "@/services/ai";
import { usePreviewImages } from "@/hooks/usePreviewImages";
import { compressImageToBase64 } from "@/lib/imageCompression";
import { useSetIngredientsAction } from "@/lib/zustand/ingredientFormStore";
import { InputFile } from "@/components/common/inputFile";
import { LoadingDots } from "@/components/common/loadingDots";
import { DialogCSR } from "@/components/common/dialog/dialogCSR";
import { ErrorMessage } from "@/components/common/inputErrorMessage";

import styles from "./ingredientAiGenerationButton.module.scss";

interface Props {
  id: IFridge["_id"];
}

interface IFormInput {
  picture: FileList;
}

export const IngredientAIGenerationButton = (props: Props) => {
  return (
    <DialogCSR
      title="AI 재료 추가"
      buttonComponent={<GenerationButton />}
      style={{ minHeight: "300px" }}
    >
      {({ closeHandler }) => (
        <IngredientAIGenerationForm closeHandler={closeHandler} {...props} />
      )}
    </DialogCSR>
  );
};

const GenerationButton = () => {
  return (
    <IconBox Icon={RiImageAddFill} className={styles.button}>
      AI Generate
    </IconBox>
  );
};

const IngredientAIGenerationForm = ({
  id,
  closeHandler,
}: Props & { closeHandler: () => void }) => {
  const router = useRouter();
  const setIngredients = useSetIngredientsAction();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: "onSubmit",
  });
  const previewImages = usePreviewImages(watch("picture"));

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const compressedImage = (await compressImageToBase64(
        data.picture[0]
      )) as string;
      const result = await AIService.generateIngredientByReceiptImage(
        compressedImage
      );

      closeHandler();
      setIngredients(result);
      router.push(`/fridge/${id}/ingredient`);
    } catch (error) {
      console.error(error);
    }
  };

  if (isSubmitting) return <LoadingDots msg="AI 재료 생성중..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p className={styles.explain}>영수증 사진을 첨부해주세요.</p>
      <InputFile
        id="picture"
        previewUrl={previewImages[0]}
        {...register("picture", { required: "사진을 첨부해주세요." })}
      />
      {errors.picture?.message && (
        <ErrorMessage msg={errors.picture?.message} />
      )}
      <input type="submit" value="Generate" className={styles.submit} />
    </form>
  );
};
