# Bun Next Expo Starter

A full-stack TypeScript monorepo starter with Next.js web app, Expo mobile app, and shared server package. Built with modern tools and authentication.

## 🚀 Tech Stack

- **Framework**: Next.js 14 + Expo
- **Runtime**: Bun
- **Language**: TypeScript
- **Authentication**: Better Auth
- **UI**: Tamagui (React Native + Web)
- **State Management**: TanStack Query + tRPC
- **Monorepo**: Bun workspaces

## 📁 Project Structure

```
├── apps/
│   ├── expo/          # Expo mobile app
│   └── nextjs/        # Next.js web app
└── packages/
    └── server/        # Shared server/API package
```

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) 18+ (for Expo CLI)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Set up environment variables**

   ```bash
   # Copy environment files
   cp apps/expo/.env.example apps/expo/.env
   cp apps/nextjs/.env.example apps/nextjs/.env
   ```

3. **Start development servers**

   **Web app (Next.js):**

   ```bash
   bun dev
   # or
   cd apps/nextjs && bun dev
   ```

   **Mobile app (Expo):**

   ```bash
   bun expo
   # or
   cd apps/expo && expo start
   ```

## 📱 Mobile Development

### Expo Go Setup

- Install Expo Go on your mobile device
- **Important**: Change API URL from `localhost` to your network IP address in the mobile app configuration
- Scan the QR code from the Expo development server

### Build Commands

```bash
# Start Expo development server
cd apps/expo && expo start

# Build for specific platforms
cd apps/expo && expo start --android
cd apps/expo && expo start --ios
cd apps/expo && expo start --web

# Build web version for deployment
cd apps/expo && bun run web:build
```

## 🌐 Web Development

### Next.js Commands

```bash
cd apps/nextjs

# Start development server
bun dev

# Build for production
bun build

# Start production server
bun start
```

## 🔐 Authentication

This project uses Better Auth for authentication across both web and mobile platforms:

- Organization management
- Team support
- Session handling
- Multi-platform support with `@better-auth/expo`

## 📦 Key Dependencies

### Shared

- **better-auth**: Authentication system
- **@tanstack/react-query**: Data fetching and caching
- **@trpc/client**: Type-safe API client

### Mobile (Expo)

- **@better-auth/expo**: Expo-specific auth integration
- **expo-router**: File-based routing
- **@tamagui/core**: Universal UI components

### Web (Next.js)

- **next**: React framework
- **@tamagui/core**: Shared UI components

## 🚀 Deployment

### Web App

The Next.js app can be deployed to any platform that supports Node.js:

- Vercel (recommended)
- Netlify
- Railway
- Self-hosted

### Mobile App

```bash
cd apps/expo

# Deploy web version
bun run web:deploy

# Build for app stores (requires EAS)
eas build --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
