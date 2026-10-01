# Solvia Version Archive

このディレクトリは、完成済み・回収済みのSolvia各版を、ブランチ名ではなく版IDで保管する。

- `versions/`: 各版のソーススナップショット
- `registry/`: Version / Asset / Deployment台帳
- `assets/shared/`: 複数版が共有する不変資産
- 大容量の原本ZIPと監査画像はSpace `/Solvia/02_バージョン` を正本保管先とする

## 原則

1. 既存版を上書きしない
2. 版の切替と版への変更を分離する
3. `source_status: complete` の版だけを直接デプロイ候補にする
4. `pending` / `incomplete` は削除せず、回収待ちとして保持する
5. 現在の承認済み範囲はCanonical Heroのみ。全ページProductionは未承認
