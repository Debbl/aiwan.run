import type { SandpackInternal } from "@codesandbox/sandpack-react/types";

export interface SandpackChildrenProps {
  filename?: string;
  children: { props: { children: string } };
}

export type SandpackInternalParams = Parameters<SandpackInternal>[0];

export interface SandpackProps extends SandpackInternalParams {
  children:
    | Array<{
        props: SandpackChildrenProps;
      }>
    | { props: SandpackChildrenProps };
}
