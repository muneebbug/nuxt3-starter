# Nuxt 3 starter

A modular template that provides essential features to quickly get started on your full stack Nuxt project

## Features

- ✔️ Edge compatible
- ✔️ Prisma integration
- ✔️ User authentication with password and social login via [@bg-dev/nuxt-auth](https://nuxt-auth.bg.tn) module
- ✔️ File upload to S3 compatible file storage services via [@bg-dev/nuxt-s3](https://nuxt-s3.bg.tn) module
- ✔️ Customizable UI layer based on SHAD-CN Nuxt via [shadcn-nuxt](https://nuxt.com/modules/shadcn) module
- ✔️ Tailwindcss integration via [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org) module
- ✔️ HTTP security via [nuxt-security](https://nuxt-security.vercel.app) module

## Setup

1. Create new repository from this [template](https://github.com/muneebbug/nuxt3-starter).
1. Rename `.example.env` to `.env` and set the environment variables.
1. Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

4. Run prisma generate

```bash
npx prisma generate
```

That's it! You can now get started on your project ✨

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
