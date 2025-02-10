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
        "border-black/4 break-words rounded-md border px-2 py-0.5 leading-none h-fit font-mono font-normal inline-block whitespace-nowrap bg-black/3",
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
