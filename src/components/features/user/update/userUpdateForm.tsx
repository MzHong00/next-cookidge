"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import type { IUser } from "@/types/user";
import { PIdToURL } from "@/utils/pidToUrl";
import { InputBox } from "@/components/common/inputBox";
import { InputFile } from "@/components/common/inputFile";
import { usePreviewImages } from "@/hooks/usePreviewImages";
import { compressImageToBase64 } from "@/lib/imageCompression";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useUpdateUserMutation } from "@/services/user/mutation/updateUserMutation";

import styles from "./userUpdateForm.module.scss";

interface UserEditInputs extends Omit<IUser, "picture"> {
  picture: FileList;
}

export const UserUpdateForm = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useUpdateUserMutation();

  const { watch, register, handleSubmit } = useForm<UserEditInputs>({
    defaultValues: {
      name: user.name,
      introduce: user.introduce,
    },
  });

  const previewImages = usePreviewImages(watch("picture"));

  const onSubmit: SubmitHandler<UserEditInputs> = async (user) => {
    const { name, introduce, picture } = user;

    openDialogMessage({
      message: `프로필을 수정하시겠습니까?`,
      requestFn: async () => {
        const compressedPicture =
          picture.length !== 0 &&
          ((await compressImageToBase64(picture[0], {
            maxSizeMB: 2,
          })) as string);

        await mutateAsync({
          name: name,
          introduce: introduce,
          ...(compressedPicture && { picture: compressedPicture }),
        });

        router.back();
      },
      option: { backspace: false },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputFile
        id="picture"
        className={styles.imageInput}
        previewUrl={`${
          previewImages.length === 0 ? PIdToURL(user.picture) : previewImages
        }`}
        {...register(`picture`)}
      />
      <InputBox label="이메일" id="email" value={user.email} disabled />
      <InputBox label="이름" {...register("name")} />
      <div className="flex-column">
        <label htmlFor="introduce">소개</label>
        <textarea id="introduce" maxLength={100} {...register("introduce")} />
      </div>

      <button className={styles.updateButton} disabled={isPending}>
        수정
      </button>
    </form>
  );
};
