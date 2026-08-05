import type { ReactNode } from "react";
import Link from "next/link";
import { PreviewNotice } from "./PreviewNotice";
import { SiteHeader } from "./SiteHeader";

export function LegalShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PreviewNotice />
      <SiteHeader />
      <main id="main-content" className="legal-page">
        <div className="legal-page__hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <article className="legal-content">{children}</article>
        <Link className="text-link" href="/">← ホームへ戻る</Link>
      </main>
    </>
  );
}
