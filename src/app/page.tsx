import { MainIntroduce } from "@/containers/home/main/mainIntroduce";
import { IntroduceBackground } from "@/containers/home/background/introduceBackground";

import styles from "./styles.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <MainIntroduce />
      <IntroduceBackground />
    </div>
  );
}
