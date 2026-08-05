"use client";

import { track } from "@vercel/analytics";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { publicSiteConfig } from "../content/public-site";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  placement: string;
  children: ReactNode;
};

export function TrackedLineLink({ placement, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      href={publicSiteConfig.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        track("line_open", { placement });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
