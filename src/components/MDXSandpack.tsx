"use client";
import type { SandpackInternal } from "@codesandbox/sandpack-react";
import { Sandpack } from "@codesandbox/sandpack-react";

const MDXSandpack: SandpackInternal = (props) => {
  return (
    <div className="m-4">
      <Sandpack
        options={{
          showConsoleButton: true,
        }}
        {...props}
      />
    </div>
  );
};

export default MDXSandpack;
