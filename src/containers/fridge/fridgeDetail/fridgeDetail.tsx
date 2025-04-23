import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BsGear } from "@react-icons/all-files/bs/BsGear";

import type { IFridge } from "@/types/fridge/type";
import { IconBox } from "@/components/common/iconBox";
import { DeleteFridgeButton } from "@/components/features/fridge/delete/fridgeDeleteButton";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

import styles from "./fridgeDetailPage.module.scss";

const THRESHOLD = 5;

export const FridgeDetail = ({id}:{id: IFridge['_id']}) => {
  const { data: fridge } = useSuspenseQuery(FridgeQueries.detailQuery(id));

  return (
    <div className="flex-column">
      <div className={styles.config}>
        <button ref={modalRef} onClick={toggleModal}>
            <IconBox Icon={BsGear}  />
        </button>

        {isOpen && (
          <div className={styles.configDropdown}>
            <Link href={`/dashboard/fridge/setting/${fridge._id}`}>
              설정
            </Link>
            <DeleteFridgeButton id={fridge._id} />
          </div>
        )}
      </div>

        <SharedMemberList allowed_users={fridge.allowed_users} />

      <div className="flex-row">
        <IngredientTotalCount count={fridge.stored_ingredients?.length} />
        <IngredientNearExpiry
          threshHold={THRESHOLD}
          ingredients={fridge.stored_ingredients}
        />
      </div>

      <RecipeRecommendWidget
        fridge_id={fridge._id}
        my_ingredients={fridge.stored_ingredients}
      />

      <p className={styles.lastestUpdate}>
        최근 수정: {new Date(fridge.last_updated).toLocaleString()}
      </p>

      <MyIngredientWidget fridge={fridge} />
    </div>
  );
};

const SharedMemberList = ({ allowed_users }: {
    allowed_users: IFridge["allowed_users"];
  }) => {
    return (
      <div className="flex-row">
        {allowed_users?.map((user) => (
          <Link key={user._id} to={`/user/${user.name}`}>
            <ProfileImage
              src={user.picture}
              title={user.name}
              style={{ width: "20px" }}
            />
          </Link>
        ))}
      </div>
    );
  };

  const IngredientTotalCount = ({count}:  {
    count: number
}) => {
    return (
      <SubjectBox
        title="재료"
        Icon={RiSeedlingLine}
        headerClassName={styles.header}
      >
        <h1>{count}</h1>
        <p>총 재료 수</p>
      </SubjectBox>
    );
  };
  
  const IngredientNearExpiry = ({ ingredients, threshHold }: {
    threshHold: number;
    ingredients: IIngredient[];
  }) => {
    const nearExpiredIngredients = ingredients.filter((ingredient) => {
      const dayMillis = 1000 * 60 * 60 * 24;
      const diffDay =
        (new Date(ingredient.expired_at).getTime() - Date.now()) / dayMillis;
  
      return diffDay <= threshHold;
    });
  
    return (
      <SubjectBox
        title="유통기한 임박"
        Icon={RiTimer2Line}
        headerClassName={styles.header}
      >
        <h1>{nearExpiredIngredients.length}</h1>
        <p>{threshHold}일 이내 유통기한 만료 재료 수</p>
      </SubjectBox>
    );
  };