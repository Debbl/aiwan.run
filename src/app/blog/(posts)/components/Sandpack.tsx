"use client";
import type { SandpackInternal } from "@codesandbox/sandpack-react";
import { Sandpack as SpandpackBase } from "@codesandbox/sandpack-react";

const Sandpack: SandpackInternal = (props) => {
  return (
    <div className="m-4">
      <SpandpackBase
        options={{
          showConsoleButton: true,
        }}
        {...props}
      />
    </div>
  );
};

export default Sandpack;
