import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// 클라이언트 렌더링 내부에서 사용하는 스크롤 위치 저장 훅스
export function useScrollRestorationCSR() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let curScrollY = 0;

    const scrollHandler = () => {
      curScrollY = window.scrollY;
    };

    const scrollResetHandler = () => {
      sessionStorage.setItem(`scrollY:${pathname}`, "0");
    };

    const storageScrollY = Number(
      sessionStorage.getItem(`scrollY:${pathname}`)
    );
    if (storageScrollY) window.scrollTo(0, storageScrollY);

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("unload", scrollResetHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("unload", scrollResetHandler);

      if (curScrollY !== 0)
        sessionStorage.setItem(`scrollY:${pathname}`, curScrollY.toString());
    };
  }, [pathname]);
}
