import imageCompression, { type Options } from "browser-image-compression";

const defaultOptions = {
  maxSizeMB: 0.3,
  initialQuality: 1,
  useWebWorker: true,
};

export const compressImageToBase64 = async (file: File, options?: Options) => {
  try {
    const compressedImage = await imageCompression(file, {
      ...defaultOptions,
      ...options,
    });
    const compressedBase64Image = await blobToBase64(compressedImage);

    return compressedBase64Image;
  } catch (error) {
    throw `압축 에러 발생: ${error}`;
  }
};

function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); // base64 형태의 data url로 데이터를 읽어 변환

    // 데이터를 모두 읽으면 onload 이벤트를 발생
    reader.onload = () => resolve(reader.result);
  });
}
