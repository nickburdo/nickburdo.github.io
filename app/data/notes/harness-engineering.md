# Harness Engineering

Harness Engineering is the practice of building the environment around an AI agent that gives it the necessary context, constrains its permissible actions, provides it with tools, and gives it feedback on the results of its work — with the goal of making the project understandable, controllable, and verifiable for an AI agent.

## Where harness engineering fits in the evolution of AI engineering

The evolution of practices for working with AI agents can be viewed, in broad terms, as a progression from prompt engineering to context engineering and then to harness engineering:

1. **Prompt engineering** — how to phrase a request to the model to get a better response.
2. **Context engineering** — what information (files, project rules, architectural constraints) to give the model in its workspace so it can reason about a specific codebase.
3. **Harness engineering** — how to build the environment around the model: tools, guardrails, verification loops, observability. Within this model, this can be expressed as: **Agent = Model + Harness**.

Within this model, one of the key differences of harness engineering is the shift from probabilistic rule compliance (telling the agent in a prompt to follow standards) toward deterministic enforcement where possible (for example, having a linter block a PR on violation). In this document, that distinction is reflected between **Rules** (rules stated in instructions) and mechanically enforced checks in **Tools/Feedback**.

Prompt engineering does not disappear in the process. Within this model, it can be viewed as one element of the broader work of building a harness: formulating prompts for the agent remains a useful skill, but by itself it does not describe the agent's entire working environment.

## Components of a harness

In this document, a harness is considered through four practical components: **Context, Constraints, Tools, and Feedback**. This is a working model for designing and analyzing a harness, not a formal industry standard.

| Component | Task |
| --------------- | ------------------------------------------------------- |
| **Context**     | Give the agent the necessary context |
| **Constraints** | Constrain the agent's permissible actions |
| **Tools**       | Give the agent ways to act on the system |
| **Feedback**    | Let the agent understand the result of its actions |

## General pattern for building a harness with a coding agent

Harness engineering can be organized as collaborative work between a human and an AI agent:

1. **The human sets goals and makes decisions**
2. **The agent explores the project and proposes a harness**
3. **The human reviews and approves the harness**
4. **The agent implements the harness**
5. **The agent verifies the harness**

The cycle:
1. the agent explores
2. the agent formulates a proposal
3. the human reviews, corrects, and adds to it
4. the result is recorded in the harness

repeats for each of the four components (context, constraints, tools, feedback). What changes is only what the agent explores and what goes into its proposal:

| Component | What the agent investigates | What the agent proposes |
|---|---|---|
| Context | the project's purpose, domain, stack, structure, architecture | its understanding of the project |
| Constraints | potentially dangerous and irreversible actions | rules, boundaries, and sandbox parameters |
| Tools | available tools and whether they are sufficient | missing tools and commands |
| Feedback | existing verification methods | required checks and a Definition of Done |

The final decision on what from the proposal gets recorded in the harness always rests with the human.

The approved version of each component is recorded in the instructions the agent receives before starting work: the entry point is the root `AGENTS.md`/`CLAUDE.md`, and for a large amount of material — a separate document that the root file links to.

Below is what each of the four Harness Engineering tasks means.

## Task 1. Give the agent the necessary context

Context is the information the agent needs to understand the project and where the specific task fits within it.

Context includes:

* **the project's purpose** — what the project is, who it is for, and what problems it solves;
* **the domain** — the project's main entities and concepts, their meaning and relationships;
* **the technical stack** — the languages, frameworks, libraries, platforms used, and significant configuration details;
* **the project structure** — where the main parts of the project live and what they are responsible for;
* **the architecture** — the system's main layers and components, their responsibilities, and how they interact;
* **sources of additional context** — documentation, specifications, and other materials the agent should consult for detail.

### Keeping context up to date

Context and documentation must match the project's current state.

If project changes affect the documented architecture, structure, domain, or other recorded specifics, the corresponding documentation must be updated.

Stale context can be worse than no context, because the agent will make decisions based on incorrect information.

## Task 2. Constrain the agent's permissible actions

The agent needs to understand not only how the project is built, but also the permissible bounds of its work.

Constraints reduce the risk of unwanted changes and prevent the agent from making decisions on its own that should remain the human's to make.

Constraints must be stated explicitly and unambiguously, so the agent does not have to guess the permissible bounds of its work on its own.

The specific constraints depend on the project and on the level of autonomy the human is willing to grant the agent.

Constraints can be split into three groups:

* **rules** — how the agent should do its work;
* **boundaries** — what the agent is allowed to change;
* **sandbox** — the environment and resources within which the agent may act.

### Rules

May describe:

* architectural principles and conventions;
* code organization and style requirements;
* the order in which tasks should be carried out;
* the need to study the existing implementation before making changes;
* actions that require prior agreement with the human.

For example:

```text
API access goes only through the service layer.

Adding a new dependency requires prior confirmation.

Do not introduce a new architectural abstraction if the task can be solved with existing project facilities.
```

### Boundaries

May define:

* files and directories;
* specific parts of the application;
* public APIs and interfaces;
* project configuration;
* dependencies;
* the database schema and data;
* Git operations and other actions with consequences beyond the current task.

For example:

```text
Do not change the database schema without a separate instruction.

Do not change the public API of existing services unless the task requires it.

Do not run git push or other operations against the remote repository without explicit permission.
```

### Sandbox

May be:

* the local working copy of the project;
* a separate Git branch or worktree;
* a local or test database;
* a mock API and test data;
* a local environment instead of production;
* a limited set of available external resources and credentials.

## Task 3. Give the agent ways to act on the system

The agent needs access to the tools required to explore the project, make changes, and verify the result.

Tools can be split into three groups:

* **exploration tools** — let the agent study the project and its current state;
* **execution tools** — let the agent change, run, and maintain the project;
* **verification tools** — let the agent technically verify the result of its changes.

### Exploration tools

These include the means by which the agent gathers information about the project:

* reading and searching files;
* searching code;
* Git (`status`, `diff`, `log`, etc.);
* inspecting the project's dependencies and configuration;
* other exploration facilities available in the agent's working environment.

Most coding agents already provide these capabilities, so the harness task here is usually not to create these facilities, but to ensure the agent has the access it needs to the project.

### Execution tools

These include the means needed for hands-on work with the project:

* package manager;
* dev server;
* the CLI of the frameworks and libraries in use;
* database and migration tools;
* mock APIs and test data;
* other project-specific commands and utilities.

The agent must be able to perform the necessary actions within its designated sandbox and established boundaries.

### Verification tools

These include the means for automatically detecting errors in the agent's work:

* lint;
* typecheck;
* unit/integration/E2E tests;
* build;
* other automated project checks.

For example:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Where possible, it's useful to provide a single command that runs the full required set of checks:

```bash
npm run validate
```

Having a verification tool does not by itself determine when and under what conditions the agent must use it. The order in which checks run, how their results are handled, and the criteria for completion belong to the feedback task.

## Task 4. Let the agent understand the result of its actions

The agent needs to be able to determine on its own whether the result of its work is correct and complete.

For this, the harness must define:

* which checks need to be run;
* when they need to be run;
* what result counts as successful;
* what to do when an error is found;
* under what conditions a task is considered complete.

### Feedback loop

The agent's work should form a feedback loop:
1. change
2. check
3. analyze the result
4. fix
5. re-check

If a check finds an error, the agent should use the information it got to fix the result and re-run the check.

The cycle continues until the required checks pass, or until the agent reaches a point where it cannot safely solve the problem on its own and must turn to the human.

### Levels of verification

Feedback can include several levels.

**Static checks:**

* lint;
* typecheck;
* other source-code checks.

**Automated functional checks:**

* unit tests;
* integration tests;
* E2E tests.

**Runtime checks:**

* the application starts successfully;
* there are no runtime errors;
* the changed functionality works in the running application.

**Task-requirements verification:**

* the required behavior has been implemented;
* the acceptance criteria are met;
* existing behavior that the task should not change has not been broken.

Not every task requires every level of verification. The required set is determined by the nature of the changes and the project's capabilities.

### Definition of Done

The harness must define the minimum conditions under which the agent can consider a task complete.

The Definition of Done should not force the agent to mechanically run checks that are irrelevant to the task, when the project clearly provides a more suitable way to verify it.

### Error handling

A failed check is not only a signal that something is wrong — it's also a source of information for the agent's next action.

The agent should:

1. determine the cause of the error;
2. establish whether it is related to the changes it made;
3. fix the problem, if that is within the scope of the task and the permitted boundaries;
4. re-run the corresponding check;
5. turn to the human if fixing it would require going beyond the established boundaries, or making a decision the agent should not make on its own.

---

## Sources

- [Harness Engineering: A Guide to AI Coding Agents — Faros](https://www.faros.ai/blog/harness-engineering)
- [Harness engineering for coding agent users — Martin Fowler](https://martinfowler.com/articles/harness-engineering.html)
- [Context Engineering vs Prompt Engineering: The 2025 AI Shift](https://medium.com/@aqilraza/context-engineering-vs-prompt-engineering-the-2025-ai-shift-13156842c8a3)
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
