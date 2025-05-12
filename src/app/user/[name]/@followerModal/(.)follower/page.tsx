import UserFollowerPage from "../../follower/page";
import { Dialog } from "@/components/common/dialog/dialog";

export default async function ModalFollower({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <Dialog title="팔로워">
      <UserFollowerPage params={params} />
    </Dialog>
  );
}
