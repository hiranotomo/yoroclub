"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useSoundEngine } from "./SoundProvider";

interface SoundLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  se?: string;
  children: ReactNode;
}

export default function SoundLink({
  se = "select",
  children,
  ...props
}: SoundLinkProps) {
  const { playSE } = useSoundEngine();

  return (
    <a
      {...props}
      onClick={(e) => {
        playSE(se);
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
