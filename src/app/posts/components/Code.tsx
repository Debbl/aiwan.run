import { cn } from "twl";
import type { ComponentProps, ReactElement } from "react";

export const Code = ({
  children,
  className,
  ...props
}: ComponentProps<"code">): ReactElement => {
  return (
    <code
      className={cn(
        "border-black border-opacity-[0.04] bg-opacity-[0.03] break-words rounded-md border text-[.9em] px-2 py-0.5 h-fit font-mono font-normal inline-block whitespace-nowrap bg-black/[.03] text-sm",
        "dark:border-white/10 dark:bg-white/10",
        className,
      )}
      dir="ltr"
      {...props}
    >
      {children}
    </code>
  );
};
