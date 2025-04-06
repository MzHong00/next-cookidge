import UserFollowerPage from "../../follower/page";
import { Dialog } from "@/components/common/dialog/dialog";
import { ClientRender } from "@/components/common/clientRender";

export default async function ModalFollower({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <ClientRender>
      <Dialog title="팔로워">
        <UserFollowerPage params={params} />
      </Dialog>
    </ClientRender>
  );
}
