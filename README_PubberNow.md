# PubberNow

飲食店・バーなどで交換した名刺をスマホで簡単に管理するためのWebアプリケーション

---

## コンセプト

PubberNowは「交換した名刺を忘れない」をテーマに開発したスマートフォン向け名刺管理アプリです。

画像保存だけでなく、店舗・タグ・利用者情報を紐付けることで、後から「あの人誰だっけ？」を防ぐことを目的としています。

---

## システム概要

PubberNowは名刺情報をデジタル管理するためのWebアプリケーションです。

スマートフォンでの利用を前提とし、名刺画像の保存、検索、タグ付け、利用者管理を行うことができます。

---

## 主な機能

### 認証

- ログイン
- JWT認証
- ロール管理（ADMIN / USER）

### 名刺管理

- 名刺登録
- 名刺編集
- 名刺削除
- 名刺検索
- 名刺画像アップロード

### 店舗管理

- 店舗登録
- 店舗編集
- 店舗削除

### タグ管理

- タグ登録
- タグ編集
- タグ削除

### ユーザー管理

- ユーザー登録
- ユーザー編集
- ユーザー削除

---

## 技術スタック

### Frontend

- Next.js 15
- React 19
- TypeScript
- CSS Modules

### Backend

- NestJS
- Prisma ORM

### Database

- PostgreSQL
- Neon

### Authentication

- JWT

### Test

- Jest
- React Testing Library
- Playwright（準備中）

---

## システム構成

```text
business-card-manager

├─ apps
│  ├─ web
│  └─ api
│
├─ packages
│
└─ docs
```

---

## 環境変数

### API

`.env`

```env
DATABASE_URL=

JWT_SECRET=
```

### WEB

`.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

---

## 起動方法

### API

```bash
cd apps/api

pnpm install

pnpm prisma generate

pnpm start:dev
```

### WEB

```bash
cd apps/web

pnpm install

pnpm dev
```

---

## テスト

### Unit Test

```bash
pnpm test
```

### E2E Test

```bash
pnpm e2e
```

---

## 今後の改善予定

- Playwright E2Eテスト整備
- 画像圧縮対応
- ページネーション
- PWA対応
- AWSデプロイ

---

## ライセンス

This project is for personal portfolio and study purposes.
