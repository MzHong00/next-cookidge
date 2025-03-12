import {
  useForm,
  SubmitHandler,
  useFieldArray,
  type UseFormReturn,
} from "react-hook-form";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import { Steps } from "@/components/common/steps";

import styles from "./createRecipeForm.module.scss";
import { IconBox } from "@/components/common/iconBox";
import { INGREDIENT_CATEGORIES } from "@/constants/ingredient";
import { FOOD_CATEGORIES, INTRODUCE_LIMIT_LENGTH } from "@/constants/recipe";
import { Tooltip } from "@/components/common/toolTip";
import { InputBox } from "@/components/common/inputBox";
import { InputFile } from "@/components/common/inputFile";
import {
  CreateRecipeSchema,
  type CreateRecipe,
} from "@/types/recipe/recipe.contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, memo, useMemo } from "react";
import { usePreviewImages } from "@/hooks/usePreviewImages";
import Image from "next/image";
import { ErrorMessage } from "@/components/common/inputErrorMessage";

interface Props {
  useForm: UseFormReturn<CreateRecipe, any, undefined>;
}

export default function CreateRecipeForm() {
  const hookForm = useForm<CreateRecipe>({
    mode: "onBlur",
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      ingredients: [{ name: "a", quantity: "a", category: "고기" }],
      cooking_steps: [{ picture: undefined, instruction: "a" }],
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = hookForm;

  const onSubmit: SubmitHandler<CreateRecipe> = (data) => {
    console.log("제출", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Steps>
        <RecipeInfoFields key="정보" useForm={hookForm} />
        <IngredientFields key="재료" useForm={hookForm} />
        <CookingStepFields key="조리과정" useForm={hookForm} />
      </Steps>
    </form>
  );
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
          <Tooltip message="사진을 드래그하여 여러 개 선택하세요!" />
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

export const IngredientFields = ({ useForm }: Props) => {
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
                placeholder="재료 이름을 입력하세요."
                {...register(`ingredients.${i}.name`)}
              />
              <input
                id="quantity-1"
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

export const CookingStepFields = ({ useForm }: Props) => {
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
              >
                <IconBox Icon={CgRemoveR} className={styles.removeButton} />
              </button>
            </li>
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
          appendCookingStep({ picture: undefined, instruction: "" });
        }}
      >
        <IconBox Icon={RiAddLine}>추가</IconBox>
      </button>
    </div>
  );
};

export const StepField = memo(
  ({
    i,
    imageFile,
    register,
  }: Pick<UseFormReturn<CreateRecipe>, "register"> & {
    i: number;
    imageFile?: FileList;
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
