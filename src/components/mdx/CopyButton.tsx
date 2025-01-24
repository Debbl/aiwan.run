"use client";
import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import { motion } from "~/lib/motion";
import { cn } from "~/lib/utils";
import type { IconBaseProps } from "react-icons";

const CopyIcon = ({
  isCopied,
  ...props
}: { isCopied: boolean } & IconBaseProps) => {
  if (isCopied) {
    return <LuCheck {...props} />;
  }

  return <LuCopy {...props} />;
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
      <CopyIcon
        isCopied={isCopied}
        className={cn(isCopied && "text-green-500")}
      />
      <span className="sr-only">Copy</span>
    </motion.button>
  );
}
