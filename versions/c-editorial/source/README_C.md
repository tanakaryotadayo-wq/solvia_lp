# Solvia C — Fashion Editorial Preview

Aの親しみやすさとBの信用設計を、ファッションブランドのエディトリアル構成へ再編集したC版です。

## 状態

- A Production: 変更なし
- B Preview: 変更なし
- C Vercel: デザイン閲覧専用。外部送信・個人情報収集なし
- このZIP: フル版。LINE導線、TikTok導線、モバイルメニュー、スクロール演出、Trust/Privacy/Termsを含む

## Cの8場面

1. Cover — 配信の先に、まだ知らない自分がいる。
2. Philosophy — ひとりで反省会、しなくていい。
3. Observation — 見た人にしか、返せない言葉がある。
4. Reply — 次回から使える一手へ。
5. Method — WATCH / NAME / TRY / REVIEW
6. Creator — ライバーを表現者として見る。
7. Trust — 契約は才能より先に見せる。
8. Invitation — 次の配信を変える話をしよう。

## ローカル表示

```bash
python3 -m http.server 4173
```

その後 `http://localhost:4173` を開いてください。

## 検証済み

- 1440px desktop
- 390px mobile
- horizontal overflowなし
- JavaScript console errorなし
- モバイルメニュー
- reduced-motion
- 内部リンク
- noindex preview

## 本番前に必要

- 運営主体・契約条件の確定
- 本物の写真／映像素材への差し替え
- BのLead API／DB／outboxとの統合
- Production release gateの承認
