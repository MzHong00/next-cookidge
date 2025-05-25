"use client";

import Image from "next/image";
import { Fragment, memo } from "react";
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

import {
  type ICreateRecipeForm,
  CreateRecipeSchema,
} from "@/types/recipe/recipe.contract";
import { Steps } from "@/components/common/steps";
import { IconBox } from "@/components/common/iconBox";
import { Tooltip } from "@/components/common/toolTip";
import { InputBox } from "@/components/common/inputBox";
import { InputFile } from "@/components/common/inputFile";
import { ErrorMessage } from "@/components/common/inputErrorMessage";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { usePreviewImages } from "@/hooks/usePreviewImages";
import { compressImageToBase64 } from "@/lib/imageCompression";
import { INGREDIENT_CATEGORIES } from "@/constants/ingredient";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { FOOD_CATEGORIES, INTRODUCE_LIMIT_LENGTH } from "@/constants/recipe";
import { useCreateRecipeMutation } from "@/services/recipe/mutations/createRecipeMutation";

import styles from "./createRecipeForm.module.scss";

export const CreateRecipeForm = () => {
  const { mutateAsync } = useCreateRecipeMutation();
  const { openDialogMessage, setProcessMessage } = useConfirmDialogActions();
  const { alertEnqueue } = useAlertActions();

  const hookForm = useForm<ICreateRecipeForm>({
    mode: "onBlur",
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      ingredients: [
        { name: undefined, quantity: undefined, category: undefined },
      ],
      cooking_steps: [{ picture: undefined, instruction: undefined }],
    },
  });

  const { handleSubmit } = hookForm;

  const onSubmit: SubmitHandler<ICreateRecipeForm> = async (data) => {
    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        try {
          // 이미지 압축 로딩 메시지 출력
          setProcessMessage("이미지 압축 중...");

          // 요리 사진 압축
          const compressedCookImages = (await Promise.all(
            Array.from(data.pictures).map((file) => compressImageToBase64(file))
          )) as string[];

          // 요리 과정 사진 압축
          const compressedStepImages = await Promise.all(
            data.cooking_steps.map(async ({ instruction, picture }) => ({
              instruction: instruction,
              picture: (await compressImageToBase64(picture[0])) as string,
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

  const onError: SubmitErrorHandler<ICreateRecipeForm> = () => {
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

interface Props {
  useForm: UseFormReturn<ICreateRecipeForm, undefined>;
}

const RecipeInfoFields = ({ useForm }: Props) => {
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
          <Tooltip message="사진을 드래그하여 여러 개 선택하세요." />
        </label>
        <InputFile
          id="pictures"
          style={{ width: "50px" }}
          {...register(`pictures`)}
          multiple
        />
        <ul>
          {previewImages.map((image) => (
            <li key={image}>
              <Image src={image} alt="미리보기" fill />
            </li>
          ))}
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
        {...register("name")}
      />
      {errors.name && <ErrorMessage msg={errors.name.message}></ErrorMessage>}

      <div className="flex-column">
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

      <div className="flex-column">
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
        {...register("servings")}
      />
      {errors.servings && (
        <ErrorMessage msg={errors.servings.message}></ErrorMessage>
      )}
    </>
  );
};

const IngredientFields = ({ useForm }: Props) => {
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
    <div key="ingredients" className="flex-column">
      <label>재료</label>
      <ul className="flex-column">
        {ingredientFields.map((filed, i) => (
          <Fragment key={filed.id}>
            <li className="flex-row">
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

const CookingStepFields = ({ useForm }: Props) => {
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

  return (
    <div key="cookingSteps" className="flex-column">
      <label>요리 과정</label>
      <ul className={styles.stepInput}>
        {cookingStepFields.map((field, i) => (
          <Fragment key={field.id}>
            <li>
              <h2>{i + 1}</h2>
              <StepField
                i={i}
                imageFile={watch("cooking_steps")[i].picture}
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
            picture: undefined as unknown as FileList,
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
    imageFile,
    register,
  }: Pick<UseFormReturn<ICreateRecipeForm>, "register"> & {
    i: number;
    imageFile: ICreateRecipeForm["cooking_steps"][number]["picture"];
  }) => {
    const previewImages = usePreviewImages(imageFile)[0];

    return (
      <div className={styles.stepField}>
        <InputFile
          id={`cooking_steps.${i}.picture`}
          previewUrl={previewImages}
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
