# solvia — website v2

「配信を見て、次の一手まで返す。」を中心に再設計した、ライバー事務所 solvia の公式サイトです。Next.js App Routerで静的なブランド体験を保ちつつ、相談受付、通知、計測、法務情報、公開前審査を一つのプロジェクトにまとめています。

## 現在の公開状態

このブランチは安全なプレビュー状態です。運営者情報、契約条件、公開コピーの事実確認が完了するまでは、以下をコード側で強制します。

- `noindex, nofollow`
- フォーム内容を保存・通知しない
- PREVIEW表示
- 本番環境のビルドをrelease gateで拒否

確認前の仮値や「No.1」「100%」などの裏付けが必要な表現を、見た目だけ整えて公開しないための仕様です。

## ローカル開発

Node.js 20.9以降を使用します。

```bash
npm install
cp .env.example .env.local
npm run dev
```

検証コマンド:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## システム構成

- Next.js 16 / React 19 / TypeScript 6
- Vercel Analytics / Speed Insights
- PostgreSQL (`postgres.js`) による相談台帳
- Transactional outboxによるWebhook通知
- HMAC署名、idempotency、IPハッシュ単位のrate limit
- Vercel Cronによる通知再試行と180日経過データの削除
- typed claim registryとproduction release gate

相談フォームの送信は `POST /api/leads` です。DB保存と通知は、VercelのProduction環境かつ、承認ファイル・承認envが一致した場合だけ有効になります。

## データベース

PostgreSQLを用意し、最初に [`migrations/001_leads.sql`](./migrations/001_leads.sql) を実行します。

主な保証:

- 同じidempotency keyの再送は同じ受付番号を返す
- 同じキーで内容が変わった場合は409
- IPハッシュ単位で15分あたり5件まで
- Webhook通知は短いleaseで排他取得
- 408 / 429 / 5xxだけを指数バックオフで再試行
- 12回失敗または恒久的4xxはdead letter化
- 相談情報とoutbox payloadは原則180日で削除

## 通知Webhook

通知先には次のヘッダーを送ります。

- `x-solvia-timestamp`: Unix秒
- `x-solvia-signature`: `HMAC-SHA256(secret, timestamp + "." + rawBody)` のhex値

受信側はタイムスタンプの許容範囲を確認し、`eventId`を一意キーにして重複排除してください。配送保証はat-least-onceです。

## 本番公開の承認手順

1. `content/claims.json` の各主張を運営者が確認し、根拠を記録して `verified` にする
2. `content/release.json` を `approved` にし、`reviewedAt` と `reviewedBy` を記録する
3. 下記の本番環境変数をVercelへ登録する
4. DB migrationとWebhook受信側の重複排除を確認する
5. Preview URLでモバイル、フォーム、OG画像、法務ページを承認する
6. Productionへ昇格する

release gateは未検証claim、未入力の契約条件、HTTPのWebhook URL、短いsecret、不正なメール・日付を拒否します。

### 必須の本番環境変数

公開・承認:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LINE_URL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `NEXT_PUBLIC_RELEASE_MODE=production`
- `SOLVIA_RELEASE_APPROVED=true`

運営者・契約:

- `SOLVIA_OPERATING_ENTITY`
- `SOLVIA_REPRESENTATIVE`
- `SOLVIA_OPERATING_ADDRESS`
- `SOLVIA_CONTACT_EMAIL`
- `SOLVIA_PRIVACY_EFFECTIVE_DATE` (`YYYY-MM-DD`)
- `SOLVIA_INITIAL_FEE`
- `SOLVIA_MONTHLY_FEE`
- `SOLVIA_REWARD_FORMULA`
- `SOLVIA_PAYMENT_SCHEDULE`
- `SOLVIA_CONTRACT_TERM`
- `SOLVIA_TERMINATION_NOTICE`
- `SOLVIA_ACCOUNT_OWNERSHIP`
- `SOLVIA_MINOR_POLICY`

相談受付:

- `DATABASE_URL`
- `LEAD_HASH_SECRET`（32文字以上）
- `LEAD_NOTIFICATION_WEBHOOK_URL`（HTTPS）
- `LEAD_WEBHOOK_SECRET`（32文字以上）
- `CRON_SECRET`（32文字以上）

完全な雛形は [`.env.example`](./.env.example) を参照してください。

## 計測イベント

- `line_open`: LINE導線のクリック。`placement`でhero/header/contact/mobileを区別
- `lead_start`: フォームの入力開始
- `lead_submit`: フォーム受付完了。Previewかどうかを区別

`line_open`は「応募完了」ではありません。LINE内の実際の相談・契約と混同せず、相談開始の参考指標として扱います。

## Vercel

`vercel.json` は通知再試行を5分ごと、保持期限の削除を毎日03:17 UTCに実行します。Cronの利用可否と実行頻度は、対象Vercelチームの契約プランで公開前に確認してください。CronはProduction deploymentでのみ稼働します。
