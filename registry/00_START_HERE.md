# Solvia Version Registry

このディレクトリは、Solviaの各デザイン版・共有資産・Vercel公開先を追跡する台帳です。

## 最初に読む

1. `VERSION_REGISTRY.yaml`
2. `ASSET_REGISTRY.yaml`
3. `DEPLOYMENT_REGISTRY.yaml`
4. `../docs/Solvia_資産・バージョン監査台帳_20261002.md`

## 現状

- GitHubブランチ名: 14
- GitHub固有HEAD: 8
- 回収済み完全実装パッケージ: 11
- 運用上の系統: 14
- 現在承認済み: Heroのみ
- 削除許可: なし

## 原則

- 既存ブランチ、Vercelプロジェクト、Library資産は削除しない
- 完全版は将来 `versions/` 配下へ無改変で取り込む
- ブランチ名だけをバージョン実体として扱わない
- `current` はページ全体が承認されるまで固定しない
