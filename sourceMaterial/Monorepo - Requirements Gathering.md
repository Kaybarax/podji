# Requirements Gathering

- # **Monorepo Management**

  - ## **Yarn Workspaces**

    - Define root-level `package.json` with workspaces for:

      - `packages/@shared-components/web`
      - `packages/@monorepo-components/mobile`
      - `packages/@monorepo-components/shared`
      - `packages/@configs`
      - `packages/@schemas`
      - `packages/@stores`
      - `apps/nextjs-web-app`
      - `apps/expo-mobile-app`

    - Use `nohoist` for React Native–specific modules to avoid Metro bundler conflicts
    - Hoist common dependencies (React, TypeScript, ESLint, Prettier) to root for consistency

  - ## **Turborepo (Turbo)**

    - Install Turborepo to orchestrate builds, caching, and script pipelines
    - Structure the repository with separate top-level directories:

      - `packages/@monorepo-components` (UI component libraries: `web`, `mobile`, `shared`)
      - `packages/@configs` (buildable configuration utilities)
      - `packages/@schemas` (buildable Zod schemas + parsing functions)
      - `packages/@stores` (buildable React Query hooks / stores)
      - `apps/nextjs-web-app` (**Next.js–powered React web application**)
      - `apps/expo-mobile-app` (Expo-managed React Native mobile application)

    - Configure incremental builds and parallel task execution for faster CI/CD

  - ## **Version Consistency**

    - Pin React, React Native, Expo SDK, and other critical dependencies to identical versions across all packages
    - Enforce a single-version policy for React Native to prevent bundler mismatches

  - ## **Containerization with Podman**

    - Use Podman to build and run development containers for both web and mobile environments
    - Provide `Containerfile`(s) at the repo root (or in each app) to define a reproducible dev image (Node, Yarn, **Next.js CLI**, Expo CLI, etc.)
    - Publish Podman images to a container registry (e.g., Quay or GitHub Container Registry) so other developers can pull and run the environment easily
    - Leverage Podman Compose (or a `docker-compose.yml`-compatible file) to spin up dependent services (e.g., a local mock API proxy) in containers

- # **Design System & Style Management**

  - ## **Design Tokens (Kaleidoscope Design System)**

  - ## **Style Dictionary**

  - ## **Web Styling (Tailwind CSS)**

  - ## **Mobile Styling (Nativewind)**

- # **Shared Modules**

  - ## **@monorepo-components Package**

  - ## **@configs Package**

  - ## **@schemas Package**

  - ## **@stores Package**

  - ## **services Module**

- # **Application Structure**

  - ## **Web App (React + Next.js)**

    - Use **Next.js** as the development and build framework (no CRA)
    - Organize code into:

      - `/components` for app-specific UI
      - `/app` or `/pages` for route-based layouts (leveraging Next.js routing)
      - `/services` for wrappers around shared `services`
      - `/styles` for global CSS imports (including generated tokens)
      - `/i18n` for translation resource files (e.g., `public/locales/{en,es,fr}/common.json`)

    - Integrate React i18next for internationalization
    - Configure **`next.config.js`** with `async rewrites()` (or middleware) to proxy API requests (e.g., `"/api"` → `https://dummyjson.com/docs/users`) and avoid CORS in development
    - Consume shared components from `@monorepo-components/web`, services from `@stores` and `services`, and validation via `@schemas`
    - Display fetched images with loading/fallback states
    - Manage state and data streaming with React Query (`@tanstack/react-query`) for caching and background refetch

  - ## **Mobile App (Expo React Native)**

- # **Testing Strategy**

- # **CI/CD & DevOps (Frontend Focus)**

- # **Observability & Client-Side Monitoring**

- # **Security & Best Practices**

  - ## **Frontend Performance**

    - Lazy-load components and routes (`React.lazy` and `Suspense`, or **Next.js dynamic imports with `next/dynamic`**)

- # **Documentation & Developer Experience**

  - ## **Root-Level Documentation**

    - **Nix-based Environment Setup**
      - Define dependencies installed in the Nix environment (Node.js, Yarn, Podman, **Next.js CLI**, Expo CLI, and any extra required dependencies)

  - ## **Package-Level READMEs**

    - **`services/README.md`**

      - Instructions for handling CORS in development via **Next.js rewrites/middleware**

    - **`apps/nextjs-web-app/README.md`**
      - App-specific setup steps (e.g., running **Next.js** (`yarn dev:web`) or Expo (`yarn dev:mobile`))

  - ## **Developer Scripts**

    - `yarn dev:web` — start web app in development mode (**Next.js**)

  - ## **Pre-commit Hooks**

  - ## **Workspaces (`package.json`)**
    ```jsonc
    {
      "workspaces": [
        "packages/@monorepo-components/web",
        "packages/@monorepo-components/mobile",
        "packages/@monorepo-components/shared",
        "packages/@configs",
        "packages/@schemas",
        "packages/@stores",
        "packages/services",
        "apps/nextjs-web-app",
        "apps/expo-mobile-app"
      ]
    }
    ```
