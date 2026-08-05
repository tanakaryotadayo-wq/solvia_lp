import Link from "next/link";
import { navigation } from "../content/site";
import { BrandMark } from "./BrandMark";
import { TrackedLineLink } from "./TrackedLineLink";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" href="/" aria-label="solvia ホーム">
          <BrandMark compact />
        </Link>
        <nav aria-label="メインナビゲーション">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <TrackedLineLink className="header-cta" placement="header">
          LINEで相談 <span aria-hidden="true">↗</span>
        </TrackedLineLink>
      </div>
    </header>
  );
}
