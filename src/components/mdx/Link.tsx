import type { ComponentProps } from "react";

export type AnchorProps = Omit<ComponentProps<"a">, "ref"> & {
  newWindow?: boolean;
};

export const Link = ({ href = "", ...props }: AnchorProps) => (
  <a
    href={href}
    target="_blank"
    className="text-primary underline decoration-from-font [text-underline-position:from-font]"
    rel="noreferrer"
    {...props}
  >
    {props.children}
    <span className="sr-only select-none"> (opens in a new tab)</span>
  </a>
);
