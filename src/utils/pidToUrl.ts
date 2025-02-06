export const PIdToURL = (publicId: string) =>
  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1738427246/${publicId}.jpg`;
