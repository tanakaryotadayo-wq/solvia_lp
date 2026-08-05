import Link from "next/link";
import { BrandMark } from "../components/BrandMark";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <BrandMark />
      <p className="eyebrow">404 / LOST STREAM</p>
      <h1>このページは、<br />配信を終了しました。</h1>
      <p>URLが変わったか、ページが削除された可能性があります。</p>
      <Link className="button button--dark" href="/">ホームへ戻る</Link>
    </main>
  );
}
