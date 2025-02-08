import { cn } from "~/lib/utils";
import type { ComponentProps, ReactElement } from "react";

export const Code = ({
  children,
  className,
  ...props
}: ComponentProps<"code">): ReactElement => {
  return (
    <code
      className={cn(
        "inline-block h-fit rounded-md border border-black/4 bg-black/3 px-2 py-0.5 font-mono leading-none font-normal break-words whitespace-nowrap",
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
