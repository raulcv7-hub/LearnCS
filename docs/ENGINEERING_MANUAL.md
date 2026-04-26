# 🛠️ CS Skillbuilder: Full Engineering Manual

This document provides a 100% comprehensive overview of the project's technical landscape, operational protocols, and development lifecycle.

## 1. Project Essence: The Headless Knowledge Engine
The CS Skillbuilder is not a website; it is an **orchestrator**. It transforms a structured filesystem (`/modules`) into a high-performance, interactive learning environment using a Microkernel architecture.

## 2. The Technical Stack
- **Orchestrator:** [Astro 4.0](https://astro.build/) (Static Site Generation / Islands Architecture).
- **Interactive Layers:** [React 18](https://reactjs.org/) (Hydrated only where interaction is needed).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Atomic Utility-First Design).
- **Content:** [MDX](https://mdxjs.com/) (Markdown with JSX capabilities).
- **Discovery:** [Fuse.js](https://www.fusejs.io/) (Local fuzzy-search indexing).
- **Automation:** [GNU Make](https://www.gnu.org/software/make/) (Standardized entry points).

## 3. Directory Map (Clean Root Strategy)
The repository follows a "Configuration Externalization" pattern to keep the root directory focused on business domains.

```text
/
├── config/           # Tooling Infrastructure (Prettier, Linter, Tailwind, TS)
├── docs/             # The Knowledge Base of the Engine (Architecture, Specs)
├── modules/          # THE PLUGINS (Atomic Autonomous Units - AAU)
│   └── [cat]/[sub]/  # Self-contained content and domain-specific logic
├── scripts/          # Shell automation for seeding and cleaning
├── src/              # THE KERNEL (The Framework-Agnostic Engine)
│   ├── core/         # Business Logic (Resolvers, State Management, Utils)
│   ├── components/   # UI Atoms and Organisms (React Islands)
│   └── pages/        # Astro Routing Orchestration
└── Makefile          # Project Entry Point (The Developer Interface)
```

## 4. The AAU Lifecycle (Atomic Autonomous Unit)
Every lesson is an independent plugin. To add content, follow this protocol:
1. **Create Directory:** `/modules/category/subject/lesson-id/`.
2. **Define Manifest:** Create `manifest.json` following the contract in `MANIFEST_SYSTEM.md`.
3. **Segment Content:** Create MDX fragments inside `/fragments/` (max 100 LOC).
4. **Co-locate Logic:** Place React simulators inside `/local_simulators/`.
5. **Verify:** Add unit tests in `__tests__/` for the simulator's logic.

## 5. Coding Standards & Quality Gates
- **Pure Functions:** Business logic must be framework-agnostic and deterministic.
- **Single Responsibility (SRP):** Files must not exceed 100 lines. Functions must not exceed 25 lines.
- **No-Else Policy:** Use Early Returns and Guard Clauses to flatten logic.
- **Arity Limit:** Maximum of 2 positional parameters per function (use DTOs for more).
- **Path Resolution:** Use `resolvePath()` for all internal URLs to support subpath deployments.
- **Singleton React:** Every build must run `npm dedupe` to prevent hook errors.

## 6. Operation & Automation
The `Makefile` is the authoritative source for project operations:
- `make install`: Dependency alignment and React deduplication.
- `make seed`: Generates/updates the Knowledge Graph from scripts.
- `make run`: Starts the development environment with Vite.
- `make build`: Generates the production-ready static site.
- `make check`: Runs strict TypeScript and Linter audits.

## 7. State & Interaction Laws
- **Persistence:** Progress is saved in `localStorage`.
- **Sync:** Components communicate via a Global Event Bus (`progress-update`).
- **Aesthetics:** Hover interactions override completion states. Transitions are strictly color-based to prevent layout jumps.
- **Legibility:** 100% opaque backgrounds for all reading surfaces.
