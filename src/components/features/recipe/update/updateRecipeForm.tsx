"use client";

import Image from "next/image";
import { Fragment, memo, useMemo } from "react";
import {
  type UseFormReturn,
  type SubmitErrorHandler,
  useForm,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import type { IRecipe } from "@/types/recipe/recipe";
import {
  IUpdateRecipeForm,
  UpdateRecipeSchema,
} from "@/types/recipe/recipe.contract";
import { PIdToURL } from "@/utils/pidToUrl";
import { Steps } from "@/components/common/steps";
import { IconBox } from "@/components/common/iconBox";
import { Tooltip } from "@/components/common/toolTip";
import { InputBox } from "@/components/common/inputBox";
import { InputFile } from "@/components/common/inputFile";
import { ErrorMessage } from "@/components/common/inputErrorMessage";
import { usePreviewImages } from "@/hooks/usePreviewImages";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { compressImageToBase64 } from "@/lib/imageCompression";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { INGREDIENT_CATEGORIES } from "@/constants/ingredient";
import { FOOD_CATEGORIES, INTRODUCE_LIMIT_LENGTH } from "@/constants/recipe";
import { useUpdateRecipeMutation } from "@/services/recipe/mutations/updateRecipeMutation";

import styles from "./updateRecipeForm.module.scss";

export const UpdateRecipeForm = ({ recipe }: { recipe: IRecipe }) => {
  const { alertEnqueue } = useAlertActions();
  const { mutateAsync } = useUpdateRecipeMutation(recipe._id);
  const { openDialogMessage, setProcessMessage } = useConfirmDialogActions();

  const hookForm = useForm<IUpdateRecipeForm>({
    mode: "onBlur",
    resolver: zodResolver(UpdateRecipeSchema),
    defaultValues: recipe,
  });

  const { handleSubmit } = hookForm;

  const onSubmit: SubmitHandler<IUpdateRecipeForm> = async (data) => {
    openDialogMessage({
      message: `${data.name} 레시피를 수정하시겠습니까?`,
      requestFn: async () => {
        try {
          // 이미지 압축 로딩 메시지 출력
          setProcessMessage("이미지 압축 중...");

          // 요리 사진이 FileList(유사 객체)라면 압축
          const compressedCookImages = Array.isArray(data.pictures)
            ? data.pictures
            : await Promise.all(
                Array.from(data.pictures).map(async (file) =>
                  typeof file === "string"
                    ? file
                    : ((await compressImageToBase64(file)) as string)
                )
              );

          // 요리 과정 사진 압축
          const compressedStepImages = await Promise.all(
            data.cooking_steps.map(async ({ instruction, picture }) => ({
              instruction: instruction,
              picture:
                typeof picture === "string"
                  ? picture
                  : ((await compressImageToBase64(picture[0])) as string),
            }))
          );

          // 서버 전송 로딩 메시지 출력
          setProcessMessage("서버에 전송 중...");

          // 서버 요청
          await mutateAsync({
            ...data,
            pictures: compressedCookImages,
            cooking_steps: compressedStepImages,
          });
        } catch (error) {
          console.error(error);
          alertEnqueue({
            message:
              "레시피 생성에 실패하였습니다. ※ 모바일 환경에서 원활하지 않을 수 있습니다.",
            type: "error",
          });
        }
      },
    });
  };

  const onError: SubmitErrorHandler<IUpdateRecipeForm> = () => {
    alertEnqueue({
      message: "작성하지 않은 항목이 존재합니다.",
      type: "error",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
      <Steps>
        <RecipeInfoFields key="정보" useForm={hookForm} />
        <IngredientFields key="재료" useForm={hookForm} />
        <CookingStepFields key="조리과정" useForm={hookForm} />
      </Steps>
    </form>
  );
};

interface FieldProps {
  useForm: UseFormReturn<IUpdateRecipeForm, undefined>;
}

const RecipeInfoFields = ({ useForm }: FieldProps) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useForm;

  const previewImages = usePreviewImages(watch("pictures"));

  return (
    <>
      <div className={styles.pictureInput}>
        <label>
          사진
          <Tooltip message="사진을 드래그하여 여러 개 선택하세요!" />
        </label>
        <InputFile
          id="pictures"
          className={styles.inputFile}
          {...register(`pictures`)}
          multiple
        />
        <ul>
          {previewImages.map((image) => {
            const imageUrl = image.startsWith("blob") ? image : PIdToURL(image);

            return (
              <li key={image}>
                <Image src={imageUrl} alt="미리보기" width={200} height={200} />
              </li>
            );
          })}
        </ul>
      </div>
      {errors.pictures && (
        <ErrorMessage msg={errors.pictures.message}></ErrorMessage>
      )}

      <InputBox
        id="name"
        label="이름"
        type="text"
        placeholder="요리 이름을 입력하세요."
        className={styles.inputBox}
        {...register("name")}
      />
      {errors.name && <ErrorMessage msg={errors.name.message}></ErrorMessage>}

      <div className={styles.inputBox}>
        <label htmlFor="introduce">소개</label>
        <textarea
          id="introduce"
          maxLength={INTRODUCE_LIMIT_LENGTH}
          placeholder="요리의 간단한 소개를 작성해주세요."
          {...register("introduction")}
        />
      </div>
      {errors.introduction && (
        <ErrorMessage msg={errors.introduction.message}></ErrorMessage>
      )}

      <div className={styles.inputBox}>
        <label htmlFor="category">카테고리</label>
        <select id="category" {...register("category")}>
          {FOOD_CATEGORIES.map((category) => (
            <option key={category.text} value={category.text}>
              {category.emoji} {category.text}
            </option>
          ))}
        </select>
      </div>
      {errors.category && (
        <ErrorMessage msg={errors.category.message}></ErrorMessage>
      )}

      <InputBox
        id="cooking_time"
        label="조리 시간(분)"
        type="number"
        defaultValue={1}
        className={styles.inputBox}
        {...register("cooking_time")}
      />
      {errors.cooking_time && (
        <ErrorMessage msg={errors.cooking_time.message}></ErrorMessage>
      )}

      <InputBox
        id="serving"
        label="인분"
        type="number"
        defaultValue={1}
        className={styles.inputBox}
        {...register("servings")}
      />
      {errors.servings && (
        <ErrorMessage msg={errors.servings.message}></ErrorMessage>
      )}
    </>
  );
};

const IngredientFields = ({ useForm }: FieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm;

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  return (
    <div key="ingredients" className={styles.ingredientContainer}>
      <label>재료</label>
      <ul className={styles.ingredientList}>
        {ingredientFields.map((filed, i) => (
          <Fragment key={filed.id}>
            <li className={styles.ingredientItem}>
              <select id="category" {...register(`ingredients.${i}.category`)}>
                {Object.entries(INGREDIENT_CATEGORIES).map(([text, emoji]) => (
                  <option key={text} value={text}>
                    {emoji} {text}
                  </option>
                ))}
              </select>
              <input
                id="ingredient-1"
                type="text"
                placeholder="재료 이름을 입력하세요."
                {...register(`ingredients.${i}.name`)}
              />
              <input
                id="quantity-1"
                type="text"
                placeholder="양을 입력하세요. ex) 1개, 1큰술, 1컵"
                {...register(`ingredients.${i}.quantity`)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  ingredientRemove(i);
                }}
              >
                <IconBox Icon={CgRemoveR} className={styles.removeButton} />
              </button>
            </li>
            {errors.ingredients?.[i]?.name?.message && (
              <ErrorMessage msg={errors.ingredients[i].name.message} />
            )}
            {errors.ingredients?.[i]?.quantity?.message && (
              <ErrorMessage msg={errors.ingredients[i].quantity.message} />
            )}
          </Fragment>
        ))}
        <button
          className={styles.appendButton}
          onClick={(e) => {
            e.preventDefault();
            ingredientAppend({ name: "", quantity: "", category: "고기" });
          }}
        >
          <IconBox Icon={RiAddLine}>추가</IconBox>
        </button>
      </ul>
    </div>
  );
};

const CookingStepFields = ({ useForm }: FieldProps) => {
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useForm;

  const {
    fields: cookingStepFields,
    append: appendCookingStep,
    remove: removeCookingStep,
  } = useFieldArray({
    name: "cooking_steps",
    control,
  });

  const cooking_steps = watch("cooking_steps");

  return (
    <div key="cookingSteps" className={styles.stepContainer}>
      <label>요리 과정</label>
      <ul className={styles.stepInput}>
        {cookingStepFields.map((field, i) => (
          <Fragment key={field.id}>
            <li>
              <h2>{i + 1}</h2>
              <StepField
                i={i}
                picture={cooking_steps[i].picture}
                register={register}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeCookingStep(i);
                }}
                style={{ height: "fit-content" }}
              >
                <IconBox Icon={CgRemoveR} className={styles.removeButton} />
              </button>
            </li>
            {errors.cooking_steps?.[i]?.picture?.message && (
              <ErrorMessage msg={errors.cooking_steps[i].picture.message} />
            )}
            {errors.cooking_steps?.[i]?.instruction?.message && (
              <ErrorMessage msg={errors.cooking_steps[i].instruction.message} />
            )}
          </Fragment>
        ))}
      </ul>
      <button
        className={styles.appendButton}
        onClick={(e) => {
          e.preventDefault();
          appendCookingStep({
            picture: "",
            instruction: "",
          });
        }}
      >
        <IconBox Icon={RiAddLine}>추가</IconBox>
      </button>
    </div>
  );
};

const StepField = memo(
  ({
    i,
    picture,
    register,
  }: Pick<UseFormReturn<IUpdateRecipeForm>, "register"> & {
    i: number;
    picture: IUpdateRecipeForm["cooking_steps"][number]["picture"];
  }) => {
    const image = useMemo(
      () => (typeof picture === "string" ? [picture] : picture),
      [picture]
    );

    const previewImages = usePreviewImages(image)[0];
    const previewUrl = !previewImages
      ? undefined
      : previewImages.startsWith("blob")
      ? previewImages
      : PIdToURL(previewImages);

    return (
      <div className={styles.stepField}>
        <InputFile
          id={`cooking_steps.${i}.picture`}
          previewUrl={previewUrl}
          style={{ ...(previewUrl && { border: "none" }) }}
          className={styles.inputFile}
          {...register(`cooking_steps.${i}.picture`)}
        />
        <textarea
          id={`step${i}`}
          placeholder="조리 과정을 설명해주세요."
          {...register(`cooking_steps.${i}.instruction`)}
        />
      </div>
    );
  }
);
StepField.displayName = "StepField";
