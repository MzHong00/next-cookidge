import UserFollowingPage from "../../following/page";
import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";

export default async function ModalFollowing({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <ClientRender>
      <Dialog title="팔로워">
        <UserFollowingPage params={params} />
      </Dialog>
    </ClientRender>
  );
}
