# Harness Engineering — Quick-Start Cheat Sheet

## How to build a harness in practice

This cheat sheet uses a working model with four components: **Context, Constraints, Tools, and Feedback**. It is a practical model for designing and analyzing a harness, not a formal industry standard.

Don't try to create a perfect, exhaustive harness right away. For an existing project, it's more practical to start with a minimal version, test it on real tasks, and improve it gradually.

A harness is not a document that gets created once and considered finished. It evolves along with the project and is refined based on the actual experience of coding agents working with it.

Evolving a harness forms its own feedback loop:
1. task
2. agent behavior
3. evaluation
4. harness improvement
5. next task

### 1. Explore the project

The agent studies the existing project without making any changes, and formulates its understanding. The human reviews this description, corrects mistakes, and adds what cannot be reliably determined from the code alone.

### 2. Create the first version of the harness

Based on the resulting understanding, a minimal working version of the harness is created.

It should define:

* the necessary **context**;
* the core **rules, boundaries, and sandbox**;
* the available **tools**;
* **validation, feedback loop, and Definition of Done**.

Don't document everything indiscriminately. The harness should contain the information that genuinely helps the agent make the right decisions and work within the permitted bounds.

### 3. Test the harness on real tasks

A harness should be evaluated not by the volume of its documentation, but by the agent's behavior on real tasks.

It's useful to use different kinds of tasks:

* a small bug fix;
* a change to existing functionality;
* a small new feature;
* a refactor.

Watch not only the final result, but also the agent's process:

* did it correctly understand the task and the relevant part of the project;
* did it use the existing architecture and conventions;
* did it avoid changing things unrelated to the task;
* did it use the available tools;
* did it run the necessary checks;
* did it catch its own mistakes;
* did it recognize when a human decision was required.

### 4. Classify the problems found

Mistakes in the agent's behavior help identify which part of the harness is lacking.

* The agent misunderstood the project or architecture → a **context** problem.
* The agent changed something it shouldn't have → a **constraints / boundaries** problem.
* The agent couldn't perform a necessary action or check due to a missing tool or missing access → a **tools** problem.
* The agent didn't verify the result, or declared the task done too early → a **feedback / Definition of Done** problem.

Fix the corresponding part of the harness and re-test.

### 5. Test the harness in a fresh session

A useful final test is to start a fresh coding-agent session with no history of prior conversation, and give it only the project, the harness, and an ordinary work task.

If the agent is able to:

* obtain the necessary context on its own;
* correctly understand where the task fits in the architecture;
* follow the established rules and boundaries;
* use the intended tools;
* verify the result on its own;
* turn to the human only when a human decision is actually required;

then the harness is doing its job.

### Harness quality criterion

The quality of a harness is not determined by the amount of documentation, rules, or automated checks it has, but by how reliably the agent carries out the project's real tasks in the right way, stays within the established bounds, and catches most of its own mistakes on its own.

## Prompts for building each of the 4 tasks

Below are ready-to-use prompts for each of the four components of a harness. The pattern is the same throughout: the agent explores and proposes, the human reviews and approves, nothing is implemented without confirmation.

### Context

Context — what the agent needs to know about the project and where its task fits within it.

Prompt:
```text
Study the project and describe the context an AI coding agent needs to work in it.
Include:
- the project's purpose and domain;
- the technical stack and significant configuration details;
- the project structure and architecture — layers, components, their responsibilities;
- sources of additional context (documentation, specifications) worth consulting for detail.
Do not make any changes. Formulate your understanding of the project and propose a brief AGENTS.md/CLAUDE.md structure with links to sources of detailed context.
```

Where to store it: the file should not contain the entire project's documentation — only the minimum orientation needed, plus links to sources of context. For example:

```text
docs/project.md       — the project's purpose and main features
docs/domain.md        — the domain, its entities and terminology
docs/architecture.md  — the architecture, layers, and how components interact
```

Documentation should not duplicate information the agent can reliably and unambiguously obtain from the code and configuration files.

### Constraints

Constraints — the rules, boundaries, and sandbox that limit the agent's actions.

Prompt:
```text
Study the project and propose constraints for an AI coding agent working in it.
Split them into:
- rules — how the agent should work;
- boundaries — what the agent must not change without explicit permission;
- sandbox — the environment and resources within which the agent can safely work.
Do not make any changes. Only formulate proposals and explain why each constraint is needed.
```

Where to store it: the root `AGENTS.md` / `CLAUDE.md` holds the main rules and boundaries that apply to every task (see the example at the end of this document). If there are many constraints, or they apply only to a specific part of the project, the detailed instructions are moved into separate documents, and the root file points to where they are and when to consult them.

### Tools

Tools — the exploration, execution, and verification tools the agent needs to work with the project.

Prompt:
```text
Study the project and determine what tools the AI coding agent has for exploring the project, making changes, and verifying the result.
Check:
- exploration tools — access to reading, code search, Git history;
- execution tools — package manager, dev server, framework CLIs, working with the database and migrations;
- verification tools — lint, typecheck, tests, build, and whether there is a single validate command.
Do not make any changes. Point out which tools are missing and propose what to add.
```

Where to store it: the main commands should be available through the project's standard interfaces (`package.json`, scripts, Makefile, etc.), and the root `AGENTS.md` / `CLAUDE.md` should state their purpose (see the `## Commands` section in the example at the end of this document).

### Feedback

Feedback — how the agent knows the result is correct and the task is complete.

Prompt:
```text
Study the project and determine what feedback mechanisms already exist for the AI coding agent.
Check:
- which checks are available — static, automated functional, runtime, task-requirements verification;
- whether there is a single way to know the task is complete (a Definition of Done);
- what the agent should do when a check fails.
Do not make any changes. Propose what's missing: a feedback loop, a Definition of Done, additional checks.
```

Where to store it: the root `AGENTS.md`/`CLAUDE.md` should state the required checks, the conditions for running them, what to do when a check fails, and the Definition of Done (see the `## Validation` section in the example at the end of this document). If the verification rules are complex or differ across parts of the project, they are moved into dedicated documents (`docs/testing.md`, `docs/validation.md`, `docs/e2e.md`), and the root file links to them.

## Upgrading: once the basic harness is working

Below are practices worth adopting once the minimal harness built from the 4 tasks above is already working on real tasks.

### Detecting hidden harness violations (conformance review)

Successfully passing `lint`, `typecheck`, tests, and `build` does not guarantee that the harness has been respected. An agent can meet the requirements in a technically correct way while still bypassing an architectural rule or boundary.

For example, a rule requires using the service layer, but the agent accesses the database directly from a component. The code works and the checks pass, but the harness has been violated.

So, in addition to technical verification, you need a **conformance review** — a check that the result was obtained in a way the project considers acceptable.

In this cheat sheet, **Feedback** is the broader category of feedback mechanisms; **verification** checks whether the result works, **conformance** checks whether the harness's rules and boundaries were respected, and the **Definition of Done** defines the conditions for considering the task complete.

#### Checks after every task

Before finishing a task, the agent should review the resulting `git diff` against the harness's rules and boundaries:

```text
Review the final diff against the project rules and boundaries.

Check that:
- no architectural boundary was bypassed;
- no unrelated code was changed;
- no unnecessary abstraction was introduced;
- existing project mechanisms were reused where appropriate;
- no rule was satisfied only formally while violating its intent.

If compliance is uncertain, report it instead of assuming it.
```

For large tasks, a single diff can be too large to review reliably — it risks overloading the agent's context window and causing violations to be missed. In that case, split the diff into logical parts or move the review to a separate, isolated session (see independent review below).

So the Definition of Done actually includes two distinct checks:

**verification** — does the result work;

**conformance** — was the result obtained in a permissible way.

#### Human review of the result

Don't check only whether the feature works. Also review the diff for:

* changes outside the scope of the task;
* existing architectural layers being bypassed;
* parallel mechanisms appearing instead of reusing existing ones;
* new abstractions or dependencies introduced without necessity;
* a rule being satisfied only on paper while its intent is actually circumvented.

For ordinary tasks, a brief look at the diff is enough. More thorough review is needed for architectural changes, large refactors, migrations, security-sensitive code, and changes to public APIs.

#### Periodic reviews

After a series of tasks, it's useful to assess recurring violations.

If the agent breaks the same rule several times:

1. clarify how the rule is worded;
2. add an example of an acceptable and an unacceptable solution;
3. where possible, turn the rule into an automated check.

For example, the rule:

```text
Components must not access IndexedDB directly.
```

can be reinforced with an automated check that forbids importing `db` outside the service layer.

#### Reviews for risky changes

For architectural changes, migrations, security-sensitive code, and large refactors, it's useful to periodically use an independent review: give another session or agent the task, the harness, and the resulting diff, and ask it to find rule and boundary violations.

This isn't needed for every task — only where the cost of a hidden violation is high enough.

#### Minimal workflow

For each task:
* implementation
* technical validation
* conformance review of the resulting diff
* done

For recurring violations:
* refine the harness
* add an automated check where possible

For risky changes:
* independent review

### Running multiple agents in parallel

If several agents or parallel sessions are working on the same project, the harness must isolate their changes and define areas of responsibility — through separate working copies, not several agents writing to the same working context at the same time.

Main risks:

* two agents change the same file or the same piece of functionality;
* one agent builds on code that another agent is changing at the same time;
* shared files are changed in parallel: dependencies, configuration, the database schema, migrations;
* one agent accidentally changes or reverts another agent's unfinished work.

#### Isolate working copies

Each parallel task should run on its own Git branch, ideally in its own `worktree`.

| Task | Worktree | Agent |
| --- | --- | --- |
| task A | branch/worktree A | agent A |
| task B | branch/worktree B | agent B |
| task C | branch/worktree C | agent C |

Don't run several independent agents with write access to the same working directory.

#### Define areas of responsibility

Before starting parallel work, define which part of the project each agent is responsible for.

For example:

```text
Agent A:
- notifications UI
- components/notifications/**
- related tests

Agent B:
- chat UI
- components/chat/**
- related tests
```

An agent should not change code outside its own area without good reason. If a task requires changing shared code or another agent's area, it should report this instead of expanding its own boundaries on its own initiative.

#### Treat shared files as a high-risk zone

Extra care is required for changes to:

* `package.json` / lock files;
* configuration;
* shared types and utilities;
* public APIs;
* the database schema and migrations;
* shared architectural components.

If several tasks require changes to the same such resource, it's better to designate a single owner for the change, or to perform these changes sequentially.

Practical recommendation: before the final check or merge, have the agent run `git rebase main` (or the equivalent for the target branch) — this helps surface hidden conflicts in lock files or the database schema before the changes are merged.

#### Don't fix other agents' changes

If an agent finds unfamiliar changes unrelated to its task, it should not automatically fix, remove, or revert them.

Practical rule for the harness:

```text
Do not modify, revert, or clean up changes that you did not create
unless they are explicitly part of your task.

If existing changes conflict with your task, stop and report the conflict.
```

#### Verify after merging

A successful check of each branch on its own does not guarantee that merging them will be correct.

After merging parallel changes, the required validation must be run again.

If the changes touch the same piece of functionality or the same architectural boundary, the corresponding integration/E2E checks should also be re-run after the merge.

#### Minimal workflow

* split the tasks
* define boundaries
* set up a separate branch/worktree for each task
* agents work in parallel
* validate each task
* merge
* overall validation

## Example of an assembled AGENTS.md/CLAUDE.md

The root `AGENTS.md`/`CLAUDE.md` is the AI agent's main entry point into the project.

It should not duplicate the entire project's documentation. Its job is to give the agent the minimum information it needs to start working, define the rules of engagement, and point it to further sources of information.

For example:

```md
# Project Instructions

## Context

This is a Nuxt application for managing TODO items.

Tech stack:
- Nuxt
- Vue
- TypeScript
- Dexie / IndexedDB

Before making changes, read the documentation relevant to the task:

- `docs/project.md` — project purpose and main features
- `docs/domain.md` — domain entities and terminology
- `docs/architecture.md` — architecture and responsibilities of application layers

Do not duplicate information that can be reliably obtained from the source code or configuration.

## Rules

- Follow the existing architecture and conventions.
- Study the existing implementation before making changes.
- Access IndexedDB only through the service layer.
- Do not introduce new architectural abstractions unless necessary.
- Ask before adding new dependencies.

## Boundaries

Without explicit approval:

- do not change the database schema;
- do not change existing public APIs;
- do not modify unrelated parts of the project;
- do not perform `git push` or other operations affecting the remote repository;
- do not use production resources or credentials.

## Sandbox

Work only with:

- the local working copy;
- the current Git branch/worktree;
- local or test databases;
- mock APIs and test data.

Do not access production resources.

## Commands

Use the project's standard commands:

- `npm run dev` — start the development server
- `npm run lint` — run lint
- `npm run typecheck` — check TypeScript
- `npm run test` — run tests
- `npm run build` — verify the production build
- `npm run validate` — run the required validation checks

## Validation

After making changes:

1. Run the checks relevant to the changed functionality.
2. Run `npm run validate` when required by the project.
3. Verify the task acceptance criteria.
4. If a check fails, determine whether the failure is caused by your changes.
5. Fix related errors and run the check again.
6. If fixing the problem requires leaving the established boundaries, stop and ask for approval.

## Definition of Done

A task is complete when:

- the requested behavior is implemented;
- relevant acceptance criteria are satisfied;
- required validation checks pass;
- relevant tests pass;
- the changed functionality has been verified;
- no known errors caused by the changes remain.

## Documentation

If a change makes the documented project context outdated, update the corresponding documentation.

Do not consider a task complete while relevant documentation contradicts the current implementation.
```

This is an example of a structure, not a universal template. The actual content of `AGENTS.md`/`CLAUDE.md` should be shaped by how the project is built, the tools available, and the level of autonomy chosen for the agent.

`AGENTS.md` / `CLAUDE.md` should be short enough to serve as a working instruction, while still containing everything the agent must know before starting work.

More detailed information should be moved into dedicated documentation, with the root file giving the agent links and stating when to consult it.
