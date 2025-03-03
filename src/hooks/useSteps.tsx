import { createContext } from "react";

const StepContext = createContext("steps");

// 1️⃣ Funnel 컴포넌트 정의 (자체적으로 상태 관리)
export function useSteps({ steps, children }: { steps: readonly string[]; children: React.ReactNode }) {

  return (
   <StepContext.Provider value="steps">
    {children}
   </StepContext.Provider>
  );
}