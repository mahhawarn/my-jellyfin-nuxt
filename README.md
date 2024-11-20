# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## セットアップ

```bash
# jellyfinサーバーを立ち上げる（例）
docker run -d -p 8096:8096 -p 8920:8920 -v /path/to/config:/config -v /path/to/cache:/cache -v /path/to/metadata:/metadata -v /path/to/media:/media --name jellyfin jellyfin/jellyfin

# index.vueの設定 以下に追加
// jellyfin APIキー
const apiKey: string = 'hogehoge1';
// jellyfinサーバー URL
const baseUrl: string = 'hogehoge2';
// jellyfinのフォルダ名
const folderName: string = 'hogehoge3';

# nuxtサーバーを立ち上げる
sudo docker-compose up -d
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
