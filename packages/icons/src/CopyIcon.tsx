"use client";

import { motion, useAnimation } from "@workspace/motion";
import type { Transition } from "@workspace/motion";
import type { ClassName } from "./types";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const CopyIcon = ({ className }: ClassName) => {
  const controls = useAnimation();

  return (
    <svg
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
    >
      <motion.rect
        width="14"
        height="14"
        x="8"
        y="8"
        rx="2"
        ry="2"
        variants={{
          normal: { translateY: 0, translateX: 0 },
          animate: { translateY: -3, translateX: -3 },
        }}
        animate={controls}
        transition={defaultTransition}
      />
      <motion.path
        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: 3, y: 3 },
        }}
        transition={defaultTransition}
        animate={controls}
      />
    </svg>
  );
};

export { CopyIcon };
