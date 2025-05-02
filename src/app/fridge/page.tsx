import Link from "next/link";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IconBox } from "@/components/common/iconBox";
import QueryHydrate from "@/components/common/queryHydrate";
import { getCookiesAsString } from "@/utils/getStringCookies";
import { FridgeList } from "@/containers/fridge/fridgeList/fridgeList";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

import styles from "./page.module.scss";

export default async function FridgePage() {
  const cookies = await getCookiesAsString();

  return (
    <>
      <QueryHydrate
        queryOptions={[
          FridgeQueries.listQuery({ headers: { Cookie: cookies } }),
        ]}
      >
        <FridgeList />
      </QueryHydrate>
      <Link href="/fridge/create" className={styles.createButton}>
        <IconBox Icon={RiAddLine} className="main-button">
          냉장고 만들기
        </IconBox>
      </Link>
    </>
  );
}
