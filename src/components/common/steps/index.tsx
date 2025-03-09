import { Fragment, useState } from "react";

import { IconBox } from "../iconBox";
import { Underline } from "../underline";

import styles from "./index.module.scss";

export function Steps({ children }: { children: React.ReactElement[] }) {
  const [curStep, setCurStep] = useState<number>(0);
  const lastStep = children.length - 1;

  return (
    <div className={styles.container}>
      <header className="flex-row">
        {children.map((node, i) => (
          <button key={node.key} onClick={() => setCurStep(i)}>
            <IconBox>
              {node.key}
              {curStep === i && <Underline />}
            </IconBox>
          </button>
        ))}
      </header>
      <main>
        {children.map(
          (node, i) =>
            curStep === i && <Fragment key={node.key}>{node}</Fragment>
        )}
      </main>
      <footer>
        {lastStep === curStep ? (
          <input type="submit" value="완료" />
        ) : (
          <button onClick={() => setCurStep((prev) => prev + 1)}>다음</button>
        )}
      </footer>
    </div>
  );
}
