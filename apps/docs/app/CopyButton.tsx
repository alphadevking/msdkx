"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export function CopyButton({ text }: { text: string }): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={styles.copyBtn}
      aria-label="Copy to clipboard"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}
