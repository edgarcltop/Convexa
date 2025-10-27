# Con

## Convex + Better Auth + Expo (React Native) + Hero UI Native

This project was bootstrapped , a modern TypeScript stack combining Convex, Expo/React Native, Tailwind (NativeWind), Turborepo, and more. For architecture and deeper patterns, refer to the Better-T-Stack repo and docs.

## Tech Stack

* **TypeScript** — static typing for safety and DX
* **[React Native (Expo)](https://expo.dev/)** — SDK 54
* **[Tailwind (NativeWind)](https://www.nativewind.dev/)** — Tailwind for React Native
* **[Hero UI Native](https://github.com/heroui-inc/heroui-native)** — modern React Native UI library 🚧 *Alpha*
* **[Convex](https://docs.convex.dev/)** — reactive backend-as-a-service
* **[Better Auth](https://convex-better-auth.netlify.app/)** — auth primitives on Convex
* **[Biome](https://biomejs.dev/)** — fast formatting and linting
* **[Turborepo](https://turbo.build/repo/docs)** — monorepo build system

## Project Structure

```text
convex/
├─ apps/
│  └─ native/          # Expo App
└─ packages/
   └─ backend/         # Convex backend
```

## Authentication Providers


This starter includes multiple authentication methods using Convex + Better Auth:


- **Convex Account** — required for all forms of authentication
- **Email & Password** — requires Resend + custom domain setup
- **Google OAuth** — requires Google Cloud Console project

- **Apple OAuth** — requires Apple Developer account
	- ⚠️ Note: Apple Auth cannot be tested in Expo Go. Use a Development Build with EAS.
