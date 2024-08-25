"use client";
import type { SandpackInternal } from "@codesandbox/sandpack-react";
import { Sandpack as CodeSandboxSandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

const Sandpack: SandpackInternal = (props) => {
  const { theme: _theme } = useTheme();
  const theme = _theme === "dark" ? "dark" : "light";

  return (
    <div className="m-4">
      <CodeSandboxSandpack
        theme={theme}
        options={{
          showConsoleButton: true,
        }}
        {...props}
      />
    </div>
  );
};

export default Sandpack;
