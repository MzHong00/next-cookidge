"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import type { IFridge } from "@/types/fridge/type";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";
import { UpdateFridgeForm } from "@/components/features/fridge/update/updateFridgeForm";
import { UnshareMemberBox } from "@/components/features/fridge/unshare/unshareMemberBox";
import { InviteShareMemberForm } from "@/components/features/fridge/share/inviteShareMemberForm";

export default function FridgeSetting({ id }: { id: IFridge["_id"] }) {
  const {
    data: { _id, name, allowed_users },
  } = useSuspenseQuery(FridgeQueries.detailQuery(id));
  
  return (
    <div className="flex-column">
      <h2>냉장고 이름 수정</h2>
      <UpdateFridgeForm fridge_id={_id} defaultName={name} />

      <h2>냉장고 공유 멤버 수정</h2>
      <div className="flex-column dark-section">
        <InviteShareMemberForm allowed_users={allowed_users} fridge_id={_id} />
        <UnshareMemberBox fridge_id={_id} allowed_users={allowed_users} />
      </div>
    </div>
  );
}
