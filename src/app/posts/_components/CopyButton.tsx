"use client";
import { useState } from "react";
import { cn } from "twl";
import { Icon } from "~/icons";
import { motion } from "~/lib/motion";

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
      <Icon
        icon={isCopied ? "CarbonCheckmark" : "Copy"}
        className={cn(isCopied && "text-green-500")}
      />
    </motion.button>
  );
}
