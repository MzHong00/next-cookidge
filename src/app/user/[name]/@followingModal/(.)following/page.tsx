import UserFollowingPage from "../../following/page";
import { Dialog } from "@/components/common/dialog/dialog";

export default async function ModalFollowing({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <Dialog title="팔로워">
      <UserFollowingPage params={params} />
    </Dialog>
  );
}
