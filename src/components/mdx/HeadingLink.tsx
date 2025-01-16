import { cn } from "~/lib/utils";
import type { ComponentProps, ReactElement } from "react";

export function HeadingLink({
  tag: Tag,
  children,
  id,
  className,
  ...props
}: ComponentProps<"h2"> & {
  tag: `h${2 | 3 | 4 | 5 | 6}`;
}): ReactElement {
  const cls =
    className === "sr-only"
      ? "sr-only"
      : cn(
          "font-semibold tracking-tight text-slate-900 dark:text-slate-100",
          {
            h2: "mt-10 border-b pb-1 text-3xl border-neutral-200/70 contrast-more:border-neutral-400 dark:border-primary-100/10 contrast-more:dark:border-neutral-400",
            h3: "mt-8 text-2xl",
            h4: "mt-8 text-xl",
            h5: "mt-8 text-lg",
            h6: "mt-8 text-base",
          }[Tag],
        );

  return (
    <Tag className={cls} {...props}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          id={id}
          className="subheading-anchor"
          aria-label="Permalink for this section"
        />
      )}
    </Tag>
  );
}
