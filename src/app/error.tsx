"use client";

import { DisplayProblem } from "@/components/common/displayProblem";

export default function GlobalError() {
  return <DisplayProblem msg="예기치 못한 에러가 발생했습니다." />;
}
