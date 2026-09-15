# Dashboard Concept Guidelines

## Purpose

A dashboard concept communicates layout, hierarchy, chart language, density, and operational emphasis. It is not evidence that metrics, aggregations, maps, or interactions are analytically correct.

## Canvas and structure

- Default to a front-facing 16:9 canvas. Use ultrawide ratios only when the installation requires them.
- Organize around the operator's primary question: overview, comparison, trend, flow, geography, alerts, or investigation.
- Give the most decision-relevant view the most space; use supporting regions for causes, trends, segments, and exceptions.
- Maintain a stable grid and a limited number of panel types.

## Data integrity

- Render exact metrics, units, dates, labels, thresholds, rankings, and geographic boundaries only when supplied.
- For unspecified values, use `--`, empty states, unscaled abstract marks, or clearly labeled sample data.
- Keep color semantics consistent and distinguish normal, warning, critical, selected, and unavailable states when those meanings are part of the brief.
- Use a supplied or authoritative map source for recognizable boundaries. Otherwise use an abstract spatial distribution or a non-map composition.

## Visual direction

Choose light or dark treatment from the usage context and requested style. On dark operational screens, use restrained highlights and preserve enough quiet background to maintain hierarchy. Avoid decorative glow, dense particles, ornamental gauges, pseudo-3D globes, and small panels that do not answer an operational question.

## Completion check

Verify that the primary question is visually obvious, required metrics and units are intact, supporting views have a clear role, alert colors retain one meaning, placeholders cannot be mistaken for real measurements, and the result is presented as a concept rather than a live dashboard.
