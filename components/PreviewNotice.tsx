import { siteConfig } from "../content/site";

export function PreviewNotice() {
  if (siteConfig.isProductionApproved) return null;

  return (
    <div className="preview-notice" role="status">
      <strong>PREVIEW</strong>
      <span>事業情報・契約条件の最終確認前です。現在のフォーム入力は保存されません。</span>
    </div>
  );
}
