export const fadeSlide = {
  upSlide: (v: number = 10) => ({ opacity: 0, y: v }),
  downSlide: (v: number = 10) => ({ opacity: 0, y: -v }),
  leftSlide: (v: number = 10) => ({ opacity: 0, x: v }),
  rightSlide: (v: number = 10) => ({ opacity: 0, x: -v }),
  hidden: { opacity: 0 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export const twistFade = {
  initial: { opacity: 0, rotateY: "50deg", rotate: "5deg" },
  animate: { opacity: 1, rotateY: "0deg", rotate: "0deg" },
  exit: { opacity: 0, rotateY: "50deg", rotate: "-5deg" },
};
