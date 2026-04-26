# 🎯 Learning Objectives Framework: Technical Milestones

This document defines the strict protocol for formulating learning objectives within the CS Skillbuilder. Objectives are not summaries; they are **measurable cognitive and technical milestones** that serve as the structural backbone of every Atomic Autonomous Unit (AAU).

## 1. The Core Purpose: Engineering Utility
Every objective must dictate exactly one section of content. They serve as a contract between the content and the user: if an objective is defined, there must be a corresponding fragment in the manifest to fulfill it.

## 2. The Universal Objective Formula (High-Density)
When drafting a lesson, every objective must follow this underlying logic to ensure it is actionable and constrained:

> **[Condition / Problem]** + **[Action Verb]** + **[Concept / Tool]** + **[Purpose / Result]** + **[Criterion / Limitation]**

- **Ineffective:** "Learn how Deterministic Finite Automata work."
- **Engineering Standard:** "Given a set of formal language strings **(Condition)**, build **(Verb)** a DFA state machine **(Concept)** to validate input acceptance **(Result)**, identifying the limitations of DFAs compared to Pushdown Automata **(Criterion)**."

## 3. Verbal Hygiene (The Blacklist)
The use of passive, internal, or unmeasurable verbs is strictly **PROHIBITED**.

| ❌ BANNED (Subjective) | ✅ REQUIRED (Measurable) |
|-------------------------|--------------------------|
| Understand, Know, Learn | Build, Refactor, Debug   |
| Grasp, Familiarize      | Explain, Contrast, Design|
| Appreciate, Be aware of | Implement, Formulate     |

## 4. AAU Synchronization (The 1:1 Mapping Rule)
To maintain structural integrity and prevent "Knowledge Bloat," we enforce a strict 1:1 mapping between objectives and the AAU manifest:

1. **Quantity:** If the `manifest.json` defines 4 fragments (e.g., `01-intro`, `02-logic`, `03-sim`, `04-summary`), the lesson must have exactly 4 technical objectives.
2. **Placement:** The full checklist of objectives must be the first element of the `01-intro.mdx` fragment.

## 5. Skill Categorization & Tagging
Every objective must be tagged for the Skillbuilder's indexing engine using two specific labels:

- **[Hard Skill]:** Direct tool usage, code implementation, or configuration.
- **[Mental Model]:** Architectural theory, paradigms, or logical patterns.

*Example Format:* `[Hard Skill] [Skill: gate-minimization-kmap]`

## 6. Theory Validation (Mental Model Sovereignty)
If an objective is tagged as a `[Mental Model]`, the corresponding fragment must prepare the user to:
1. Identify a conceptual error in a flawed technical explanation.
2. Predict the behavior of a system based on theoretical constraints.

## 7. User-Facing Format (The Interactive Checklist)
The final output at the top of the `01-intro.mdx` must be formatted as an interactive markdown checklist. The tone must be direct and professional: **"By the end of this lesson, you will be able to:"**

### Reference Example:
```markdown
## 🎯 By the end of this lesson, you will be able to:

- [ ] **[Hard Skill] [Skill: dfa-implementation]** Given a regular expression, build a transition table to implement a DFA in code, recognizing when a state explosion makes the approach inefficient.
- [ ] **[Mental Model] [Skill: pumping-lemma-theory]** Contrast regular and non-regular languages by applying the Pumping Lemma to prove the non-regularity of specific language sets.
- [ ] **[Hard Skill] [Skill: automata-debugging]** Debug a faulty state machine by identifying missing transitions or incorrect final states in a provided simulator.
```
