# Breeze Stack 🌪️

A modern, full-stack web application boilerplate built with speed and developer experience in mind.

## Tech Stack 🛠️

- **[React Router v7](https://reactrouter.com/en/main)** - Next generation routing with file-based routing, type safety, and server components
- **[Prisma ORM](https://www.prisma.io/)** - Next-generation Node.js and TypeScript ORM
- **[Better Auth](https://better-auth.netby.dev/)** - Simple and secure authentication
- **[Turso](https://turso.tech/)** - Distributed SQLite database built on libSQL
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI and Tailwind CSS
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Conform](https://conform.guide/)** - Form validation and state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## Getting Started 🚀

### Prerequisites

1. Node.js 18+ and pnpm
2. Turso CLI installed (`brew install tursodatabase/tap/turso`)
3. Git

### Setting up Turso Database

1. Sign up for a free account at [Turso](https://turso.tech)
2. Create a new database:
   ```bash
   turso db create [your-db-name]
   ```
3. Get your database URL and authentication token:
   ```bash
   turso db show [your-db-name]
   turso db tokens create [your-db-name]
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/osmanorhan/breeze-stack.git
   cd breeze-stack
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a .env file:
   ```
   DATABASE_URL="libsql://[your-db-url]"
   DATABASE_AUTH_TOKEN="[your-token]"
   SESSION_SECRET="[your-session-secret]"
   ```

4. Generate auth tables:
   ```bash
   npx @better-auth/cli generate
   ```

5. Generate Prisma client:
   ```bash
   pnpm run db:generate
   ```

6. Apply migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

7. Apply migrations to Turso:
   ```bash
   turso db shell [your-db-name] < ./prisma/migrations/[migration-name]/migration.sql
   ```

### Development

Start the development server:
```bash
pnpm run dev
```

## Project Structure 📁

```
├── app/
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and configurations
│   ├── routes/           # File-based routing
│   └── styles/           # Global styles
├── prisma/
│   ├── migrations/       # Database migrations
│   └── schema.prisma     # Database schema
```

## Database Migrations 🔄

When making changes to the schema:

1. Update `prisma/schema.prisma`
2. Generate migration:
   ```bash
   npx prisma migrate dev --name [descriptive-name]
   ```
3. Apply to Turso:
   ```bash
   turso db shell [your-db-name] < ./prisma/migrations/[timestamp]_[name]/migration.sql
   ```

## Authentication 🔐

Authentication is handled by Better Auth. The setup includes:
- Email/Password authentication
- OAuth providers (Google)
- Session management
- Protected routes

## Features ✨

- 🎯 Type-safe routing and data loading
- 🔒 Built-in authentication with multiple providers
- 📱 Responsive layout with modern UI components
- 🎨 Dark mode support
- 🔍 Form validation with schema-based approach
- 🚀 Fast development workflow
- 📦 Pre-built components and layouts

## License 📝

MIT
## Roadmap
## Roadmap 🗺️

### Upcoming Features 🚀

#### Authentication & Authorization
- [ ] Role-based access control (RBAC)
- [ ] Team/Organization support
- [ ] Two-factor authentication (2FA)
- [ ] Password reset flow
- [ ] Email verification

#### UI/UX Improvements
- [ ] Advanced table features (sorting, filtering, pagination)
- [ ] File upload support with object storage
- [ ] Rich text editor integration (Lexical?)
- [ ] Dashboard analytics and charts
- [ ] Notification system
- [ ] Search functionality (add Meili?)
- [ ] SVG 

#### Developer Experience
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration testing setup
- [ ] GitHub Actions CI/CD pipeline
- [ ] Performance monitoring
- [ ] Error tracking integration

#### Infrastructure
- [ ] WebSocket support for real-time features
- [ ] Background job processing
- [ ] Caching layer

### Recently Completed ✅

- [x] Basic authentication flow
- [x] Project CRUD operations
- [x] Form validation with Conform
- [x] Responsive dashboard layout
- [x] Dark mode support
- [x] Database migrations

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request. Check our roadmap for planned features or suggest new ones.