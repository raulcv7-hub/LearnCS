# 🛠️ CS Skillbuilder: Engineering Knowledge Engine

A high-performance, radically decoupled knowledge-graph designed to map the Computer Science curriculum. This system functions as a **Headless Knowledge Engine**, treating documentation as structured data orchestrated by a hierarchical manifest system.

## 🚀 Core Architecture: Radical Decoupling

The project implements a strict separation between the **Knowledge Base** (`/modules`) and the **Rendering Engine** (`/src`). This allows the curriculum to scale independently of the UI framework.

- **Atomic Knowledge Units:** MDX-based fragments for granular learning.
- **Manifest Orchestration:** JSON contracts define the curriculum structure.
- **Fuzzy Discovery:** Command palette (`CMD + K`) for instant conceptual access via Fuse.js.
- **State Persistence:** Granular progress tracking synchronized across React Islands.

## 🛠️ Technical Stack

- **Engine:** [Astro 4.0](https://astro.build/) (Static Site Generation)
- **Interface:** [React 18](https://reactjs.org/) (Hydrated Components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Atomic Design)
- **Logic:** TypeScript (Strict Mode)
- **Automation:** GNU Make (Build Pipeline)

## 🏗️ Development Lifecycle

This project uses a `Makefile` to standardize environment operations.

### 1. Initialization
```bash
# Install dependencies and deduplicate React instances
make install

# Generate the initial knowledge graph in /modules
make seed
```

### 2. Execution
```bash
# Start the development server with Hot Module Replacement
make run
```

### 3. Quality Assurance
```bash
# Run ESLint and TypeScript compiler checks
make check

# Audit for unused dependencies and dead code
make unused
```

## 🌐 Deployment Logic

Optimized for **Vercel** or **GitHub Pages**. 

**Requirement:** The build pipeline must execute `npm dedupe` before `npm run build` to ensure React singleton integrity across hydrated islands.

## 👨‍💻 Author

**Raul CV**
- [LinkedIn](https://www.linkedin.com/in/raul-carrillo-4117693bb)
- [GitHub](https://github.com/raulcv7-hub)
