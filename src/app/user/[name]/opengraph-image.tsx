import Image from "next/image";
import { ImageResponse } from "next/og";

import { UserService } from "@/services/user";

export const alt = "프로필 사진";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function UserOpenGraph({
  params,
}: {
  params: { name: string };
}) {
  const user = await UserService.fetchUser(params.name);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={user.picture}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
