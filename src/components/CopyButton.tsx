"use client";

import { useState } from "react";
import { Icon } from "~/icons";

export function CopyButton({
  lang,
  code,
  className,
}: {
  lang: string;
  code: string;
  className: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      type="button"
      aria-label="Copy code"
      data-value={code}
      data-lang={lang}
      className={className}
      onClick={handleCopy}
    >
      <Icon icon={isCopied ? "CarbonCheckmark" : "Copy"} />
    </button>
  );
}
