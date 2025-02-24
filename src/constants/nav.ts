import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";
import { RiFridgeLine } from "@react-icons/all-files/ri/RiFridgeLine";

import type { NavTypes } from "@/types";

export const NAV_TYPES: NavTypes[] = [
  {
    Icon: RiHome5Line,
    href: "",
    text: "홈",
  },
  {
    Icon: RiBook2Line,
    href: "recipe",
    text: "레시피",
  },
  {
    Icon: RiFridgeLine,
    href: "fridge",
    text: "냉장고",
  },
];
