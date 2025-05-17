import ImageComponent from "next/image";
import { ImageResponse } from "next/og";

import { UserService } from "@/services/user";
import { PIdToURL } from "@/utils/pidToUrl";

export const alt = "프로필 사진";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
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
          width: "100%",
          height: "100%",
          display: "flex",
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageComponent
          src={PIdToURL(user.picture)}
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
