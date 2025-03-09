import Link from "next/link";
import { Fragment } from "react";

import useSearchParams from "@/hooks/useSearchParams";
import { useRouter } from "next/navigation";

const PARAMS_KEY = "step";

export function Steps({ children }: { children: React.ReactElement[] }) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <nav>
        <button>이전</button>
        <section className="flex-row">
          {children.map((node) => (
            <Link key={node.key} href={`?${PARAMS_KEY}=${node.key}`}>
              {node.key}
            </Link>
          ))}
        </section>
      </nav>

      {children.map((node, i) => {
        const curStep = node.key === searchParams.get(PARAMS_KEY);
        const isLastStep = children.length === i + 1;

        return (
          curStep && (
            <Fragment key={node.key}>
              {node}
              {isLastStep ? (
                <input type="submit" value="완료" />
              ) : (
                <button>다음</button>
              )}
            </Fragment>
          )
        );
      })}
    </div>
  );
}
