# ✍️ Content & Syntax Standards: The AAU Writing Guide

This document defines the professional standards for generating MDX content for the CS Skillbuilder. Our focus is **Content Sovereignty**: the text must be pure, technical, and decoupled from the engine's implementation details.

## 1. File & Folder Taxonomy (The AAU Boundary)

The system discovers content dynamically via the filesystem. Every lesson is an **Atomic Autonomous Unit (AAU)**.

- **Path Hierarchy:** `/modules/[category]/[subject-id]/[lesson-id]/`
- **Internal Structure:**
    - `manifest.json`: The brain (Metadata & Order).
    - `fragments/`: The body (Atomic MDX units).
    - `local_simulators/`: The tools (React components).

## 2. Manifest vs. Frontmatter

**Strict Rule:** We reject YAML Frontmatter. metatada must NOT be inside MDX files. 

All administrative logic (IDs, titles, difficulty, estimated time, and fragment sequence) must reside in the `manifest.json`. This keeps the MDX files as "Pure Content" that can be read by any Markdown parser without noise.

```json
// manifest.json (Correct)
{
  "id": "turing-completeness",
  "title": "Understanding Turing Completeness",
  "fragments": ["01-introduction", "02-halting-problem"],
  "metadata": { "difficulty": "hard", "estimatedTime": "45m" }
}
```

## 3. Structural Hierarchy & Narrative Density

To prevent "List Fatigue" and maintain a professional engineering aesthetic:

- **Headings:** Use `##` (H2) for primary section titles within a fragment. `###` (H3) for sub-sections.
- **Title Reservation:** Do NOT include the lesson title as an `# H1` inside the MDX. The Kernel renders the title automatically from the manifest.
- **Narrative Blocks:** Maintain at least two paragraphs of narrative text between any two headings. Technical documentation should explain "Why," not just "What."
- **Atomic Fragments:** Each MDX file in the `/fragments/` folder should represent one manageable logical concept (max 100 lines).

## 4. Zero-Import Widgets (The Registry)

MDX files are forbidden from using JavaScript `import` statements. To include interactive simulators or engineering components:

1. **Standard Library:** Use global components (e.g., `<CodeBlock />`, `<Quiz />`) directly.
2. **Local Simulators:** Place your React component in `local_simulators/`.
3. **Usage:** Reference it in the MDX as a standard JSX tag. The Kernel will inject it automatically.

```markdown
## The Computational Model
As we can see in the following simulator, the tape head moves deterministically:

<TapeSimulator initialValue="0011" />

Observe how the state transition occurs...
```

## 5. Non-Textual Placeholders (Drafting Phase)

During the drafting of a "Master Draft," use a generic syntax to signal needs to the engineering team:

- **Visuals:** `[VISUAL: {Concept} | Goal: {Description}]`
- **Interactions:** `[WIDGET: {Type} | Goal: {Learning Objective}]`

## 6. Connectivity & Path Resolution

- **Internal Links:** Use the `resolvePath` protocol for any manual URL (e.g., `[See Logic Gates]({resolvePath('/subject/digital-logic/gates')})`).
- **Resource Reference:** Images or static assets should be placed in a `static/` folder within the AAU and referenced using absolute paths resolved by the manifest.
