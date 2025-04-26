"use client";

import type { IFridge } from "@/types/fridge/type";
import { Profile } from "@/components/common/profile";

export const FridgeSharedMembers = ({
  allowed_users,
}: {
  allowed_users: IFridge["allowed_users"];
}) => {
  return (
    <div className="flex-column dark-section">
      <h2>냉장고 공유</h2>
      <div className="flex-row">
        {allowed_users?.map(({ _id, name, picture }) => (
          <Profile key={_id} name={name} title={name} picture={picture} />
        ))}
      </div>
    </div>
  );
};
