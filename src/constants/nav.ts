import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";
import { RiTrophyLine } from "@react-icons/all-files/ri/RiTrophyLine";

import type { NavTypes } from "@/types";

export const NAV_TYPES: NavTypes[] = [
  {
    Icon: RiBook2Line,
    href: "/recipe",
    text: "레시피",
  },
  {
    Icon: RiFridgeLine,
    href: "/fridge",
    text: "냉장고",
  },
  {
    Icon: RiTrophyLine,
    href: "/rank",
    text: "랭킹",
  },
];
