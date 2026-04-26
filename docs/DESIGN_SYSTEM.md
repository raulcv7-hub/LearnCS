# 🎨 Design System: High-Density Engineering Standard

The visual and linguistic identity of the CS Skillbuilder is based on technical clarity, structural efficiency, and high contrast for prolonged reading sessions. We reject "aesthetic" design choices that compromise accessibility.

## 1. Naming Philosophy: "Cold & Clear"

We reject "magical" or "narrative" terminology in favor of direct, descriptive language. The system speaks like a compiler, not a story.

| Prohibited (Extravagant) | Mandatory (Cold/Clear) |
|--------------------------|-------------------------|
| Abort Sequence           | Back / Exit             |
| Execution / Commit       | Progress / Save         |
| Node                     | Lesson                  |
| Knowledge Graph / Map    | Curriculum / Contents   |
| Initializing...          | Loading...              |

## 2. Layout Architecture: The Three-Column Grid

To maintain visual balance and focus during technical reading, the lesson view implements a strict three-column system:
1. **Left Sidebar (w-60):** Course navigation (Lessons).
2. **Center Column (flex-1):** Primary reading content (Article).
3. **Right Sidebar (w-60):** Local fragment navigation (Sections).

**Constraint:** To prevent parent wrapper issues from breaking the `sticky` behavior, sidebars must be direct children of the flex container.

## 3. The 100% Opacity Rule (Anti-Grey Mandate)

To ensure maximum legibility across all screen types and browsers (specifically mitigating issues with Brave's aggressive dark mode and mobile power-saving color shifting):
- **No text over transparent backgrounds:** All main reading containers must use `bg-blueprint-surface` (fully opaque).
- **Completed states:** When a lesson or subject is completed, it must *not* use a transparent green background. It must retain its solid background and indicate completion strictly via borders, badges, and high-contrast text.

## 4. Semantic Color System

The system uses specific color scales to map domains and difficulty levels. This provides instant "at-a-glance" cognitive processing.

### 4.1. Domain Categories (Accents)
- **Foundations:** Blue (`blue-500`) - Logic and math.
- **Software:** Emerald (`emerald-500`) - Code and algorithms.
- **Middleware:** Indigo (`indigo-500`) - Systems and networks.
- **Hardware:** Orange (`orange-500`) - Architecture and gates.
- **Security:** Rose (`rose-500`) - Cryptography and protocols.

### 4.2. Difficulty Scales
- **Easy:** Emerald border + text.
- **Medium:** Amber border + text.
- **Hard:** Rose border + text.

## 5. Interaction State Priority

When multiple states apply to a single component, the CSS must follow this strict priority hierarchy:

1. **Hover (Highest Priority):** Moving the mouse over an item must *always* trigger the domain's accent color (Blue/Orange/etc.), overriding any other state.
2. **Active:** The current location must be highlighted. In the Sidebar, the active lesson is always Blue, even if it was previously completed.
3. **Completed (Lowest Priority):** The emerald (green) color is a resting state. It applies only when the item is neither hovered nor active.

## 6. Typography & Cognitive Load

- **Headings:** Black (`text-text-main`), heavy tracking-tighter, and large (`text-8xl` for H1s) to anchor the page.
- **Line Length:** The reading prose uses `max-w-none` but is constrained by the three-column grid to prevent lines from being too long (which causes eye fatigue).
- **Monospace:** All technical data (times, difficulties, IDs) must use `font-mono` and `uppercase` to visually separate metadata from actual content.
