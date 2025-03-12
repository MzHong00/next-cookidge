import { useEffect, useState } from "react";

export const usePreviewImages = (imageFiles?: File[] | FileList |string[]) => {
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) return;

    const previewUrls =
      typeof imageFiles[0] === "string"
        ? (imageFiles as string[])
        : Array.from(imageFiles as File[]).map((file) =>
            URL.createObjectURL(file)
          );
          
    setPreviewImage(previewUrls);

    return () => {
      previewUrls.forEach((url) => {
        if (!url) return;
        return URL.revokeObjectURL(url);
      });
    };
  }, [imageFiles]);

  return previewImage;
};
