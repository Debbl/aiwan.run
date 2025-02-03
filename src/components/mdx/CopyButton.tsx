"use client";
import { CheckIcon, CopyIcon } from "@repo/icons";
import { motion } from "@repo/motion";
import { useState } from "react";
import { cn } from "~/lib/utils";
import type { IconBaseProps } from "@repo/icons";

const CopyButtonIcon = ({
  isCopied,
  ...props
}: { isCopied: boolean } & IconBaseProps) => {
  if (isCopied) {
    return <CheckIcon {...props} />;
  }

  return <CopyIcon {...props} />;
};

export default function CopyButton({
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
    <motion.button
      type="button"
      aria-label="Copy code"
      data-value={code}
      data-lang={lang}
      className={className}
      onClick={handleCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <CopyButtonIcon
        isCopied={isCopied}
        className={cn("size-4", isCopied && "text-green-500")}
      />
      <span className="sr-only">Copy</span>
    </motion.button>
  );
}
