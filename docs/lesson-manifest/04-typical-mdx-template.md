# 📑 Standardized AAU Template Registry

This manifest defines the generic structural patterns for MDX fragments. Every lesson must adopt one of these archetypes to ensure pedagogical consistency across the knowledge graph.

---

## 1. Archetype: The "Conceptual Discovery" (Inductive)
*Goal: Move from a specific problem to a general theory.*

1.  **The Friction (Fragment 01):** introductory text describing a real-world bottleneck or logical paradox.
2.  **The Exploration (Fragment 02):** <GlobalSimulator /> (Generic data visualizer) showing the "messy" state.
3.  **The Mechanism (Fragment 03):** Main body text explaining the theoretical solution.
4.  **The Proof (Fragment 04):** <LocalSimulator /> (Specific tool) where the user applies the theory to solve the friction.
5.  **The Validation (Fragment 05):** <Test /> checking the mental model.

---

## 2. Archetype: The "Formal Deep-Dive" (Deductive)
*Goal: Establish a rigorous definition and then test its boundaries.*

1.  **The Axiom (Fragment 01):** Pure theoretical definition and mathematical/logical constraints.
2.  **The Global Reference (Fragment 02):** <GlobalSimulator /> acting as a reference library (e.g., a formal notation viewer).
3.  **The Implementation (Fragment 03):** Detailed technical text on how this theory manifests in code or hardware.
4.  **The Laboratory (Fragment 04):** <LocalSimulator /> for stress-testing the definition with custom inputs.
5.  **The Synthesis (Fragment 05):** Summary text and transition to the next unit.
6.  **The Validation (Fragment 06):** <Test /> checking the mental model.

---

## 3. Archetype: The "Comparative Analysis" (Relational)
*Goal: Understand trade-offs between two competing models.*

1.  **The Contenders (Fragment 01):** Parallel introduction to two related but different concepts.
2.  **Side-by-Side (Fragment 02):** <GlobalSimulator /> comparing generic metrics (Time vs. Space, Latency vs. Throughput).
3.  **The Deep Contrast (Fragment 03):** Text-heavy breakdown of specific technical differentiators.
4.  **The Selection Lab (Fragment 04):** <LocalSimulator /> where the user must choose the "correct" model for 3 different scenarios.
5.  **The Trade-off Summary (Fragment 05):** A structured list of "When to use X over Y."
6.  **The Validation (Fragment 06):** <Test /> checking the mental model.

---

## 4. Archetype: The "Refactoring/Debug" (Practical)
*Goal: Identify and fix flaws in a system.*

1.  **The Broken State (Fragment 01):** Intro text describing a system that is failing or inefficient.
2.  **The Audit (Fragment 02):** <LocalSimulator /> representing the broken system (e.g., a faulty logic gate or unoptimized loop).
3.  **The Heuristics (Fragment 03):** Text explaining the principles of "Clean" or "Correct" implementation.
4.  **The Correction (Fragment 04):** User modifies the <LocalSimulator /> state to reach a "Target" objective.
5.  **The Efficiency Check (Fragment 05):** <GlobalSimulator /> (Performance analyzer) validating the fix.
6.  **The Validation (Fragment 06):** <Test /> checking the mental model.

---

## 5. Archetype: The "High-Density Reference" (Fast-Track)
*Goal: Provide immediate utility for experienced engineers.*

1.  **The TL;DR (Fragment 01):** Bulleted summary of the core concept.
2.  **The Interactive Cheat-Sheet (Fragment 02):** <GlobalSimulator /> (Searchable table or interactive map of the concept).
3.  **The Nuances (Fragment 03):** Technical text focusing only on edge-cases and "gotchas."
4.  **The Sandbox (Fragment 04):** <LocalSimulator /> with no fixed target, just for open experimentation.
5.  **Quick Assessment (Fragment 05):** <Test /> High-speed quiz (5 questions, 30 seconds).

---

## 6. Archetype: The "Subject Mastery" (Capstone Exam)
*Goal: Final validation of an entire subject domain.*

1.  **The Retrospective (Fragment 01):** Narrative summary of all lessons in the subject.
2.  **The Theory Gauntlet (Fragment 02):** 20+ <Test /> items covering the entire curriculum.
3.  **The Practical Gauntlet (Fragment 03):** 3-5 <LocalSimulator /> instances from different lessons with new "High-Difficulty" targets.
4.  **The Connection (Fragment 04):** A multi-stage challenge requiring the coordination of two separate simulators (optional)
5.  **The Achievement (Fragment 05):** Final text and unlocking of the "Subject Complete" badge.
6.  **Next Horizonts (Fagment 06):** To end the subject you must encore the student to open his mind and sed curiosity for other subjects and the learning of CS.

*Tests must be difficult. Don’t help, and ask questions with similar options so as not to help, thereby demonstrating that the concept has been understood...*
