"use client";

import { motion, useAnimation } from "motion";
import type { Transition, Variants } from "motion";
import type { ClassName } from "./types";

const svgVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
  },
};

const svgTransition: Transition = {
  duration: 1.2,
  ease: "easeInOut",
};

const MoonIcon = ({ className }: ClassName) => {
  const controls = useAnimation();

  return (
    <motion.svg
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={svgVariants}
      animate={controls}
      transition={svgTransition}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </motion.svg>
  );
};

export { MoonIcon };
