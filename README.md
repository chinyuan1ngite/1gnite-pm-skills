# 1gnite PM Skills

Reusable agent skills for product management and visual communication workflows.

## Skills

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
