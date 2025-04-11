import { useEffect, useState } from "react";

export const usePreviewImages = (imageFiles: FileList | string[]) => {
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  useEffect(() => {
    if (!imageFiles.length) return;

    const previewUrls = Array.isArray(imageFiles)
      ? imageFiles
      : Array.from(imageFiles).map((file) => URL.createObjectURL(file));

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
