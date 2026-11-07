# 1gnite PM Skills

Reusable agent skills and a de-identified, project-shaped product-management workflow.

## Skills

### `government-project-visual-design`

Project adapter for a fictional “某政务项目”. It layers a government-service visual system, request routes, and a sanitized built-in reference-image catalog over the generic image-generation skill. This preserves the project-specific behavior that a generic extraction alone cannot show.

Invoke it explicitly:

```text
$government-project-visual-design
```

### `visual-design-imagegen`

Generates raster UI concepts, presentation infographics, and dashboard visuals from a content brief and optional reference images.

The skill separates reusable image-generation guidance from project-specific content and assets. It includes:

- brief patterns for UI concepts, presentation infographics, and dashboard concepts;
- visual hierarchy and composition guidance;
- reference-image role assignment and source-content isolation;
- dashboard data-integrity constraints;
- Codex UI metadata for explicit invocation.

## Use

Copy [`skills/visual-design-imagegen`](skills/visual-design-imagegen) into the skill directory used by your agent environment, then invoke:

```text
$visual-design-imagegen
```

Example:

```text
Use $visual-design-imagegen to create a 16:9 operations dashboard concept.
Show service volume, completion trend, regional distribution, and current alerts.
Use only the labels and values I provide; render missing data as placeholders.
```

Generated images are design concepts. They do not replace functional interfaces, editable presentation files, or validated data visualizations.

## Project-shaped agent example

[`examples/government-project-product-workflow`](examples/government-project-product-workflow) is a sanitized but structurally faithful example of a government-project product repository. It includes:

- a repository-level `AGENTS.md` with evidence boundaries and reverse-documentation rules;
- PRD writing, structure, and quality references;
- one complete PRD → HTML prototype → ledgers → acceptance-test chain;
- stable Chinese identifiers linking pages, fields, actions, permissions, states, and tests.

The example uses “某政务项目”, reserved example domains, masked personal data, and synthetic records. It is intended to demonstrate the workflow, not to provide real government-system requirements.
