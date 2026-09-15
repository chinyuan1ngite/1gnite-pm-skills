---
name: visual-design-imagegen
description: Generate raster UI concepts, presentation infographics, and dashboard visuals from a content brief and optional reference images.
---

# Visual Design Image Generation

Turn a user's content brief and optional reference images into a new bitmap visual. This Skill produces design concepts and communication graphics; it does not build functional interfaces, editable slide decks, or data visualizations backed by live data.

## Workflow

1. Classify the request as a UI concept, presentation infographic, dashboard concept, or the closest equivalent. Read [`references/request-patterns.md`](references/request-patterns.md) for the matching brief.
2. Read [`references/visual-guidelines.md`](references/visual-guidelines.md). For dashboard concepts, also read [`references/data-dashboard-guidelines.md`](references/data-dashboard-guidelines.md).
3. Collect the user's required content, desired composition, visual direction, aspect ratio, reference images, and exclusions. Infer low-risk presentation choices from context; ask only when missing information would materially change the result.
4. If reference images are supplied, inspect every target image and read [`references/reference-image-workflow.md`](references/reference-image-workflow.md).
5. Call the available image-generation capability directly. Pass all required reference images through its supported reference mechanism.
6. Inspect the result for the completion criteria below. If a material defect can be corrected within the requested scope, regenerate or edit the image before returning it.

## Content and Workspace Boundaries

- Treat the user's current request and explicitly named files as the content source. Do not scan unrelated workspace files for content or style.
- Treat reference images as visual direction, not as permission to copy their source-specific branding, people, text, data, or distinctive composition.
- Use exact supplied facts and wording where requested. Represent missing nonessential content with restrained visual placeholders; do not invent facts, metrics, rankings, dates, policies, or map boundaries.
- Return the generated image in the conversation by default. Save it only when the user requests a file and the destination is known.
- Use image generation for the bitmap result. Do not substitute HTML screenshots, browser captures, or programmatic drawing unless the user explicitly requests that medium.

## Completion Criteria

The result is complete when:

- the subject, output type, composition, aspect ratio, and visual direction match the brief;
- every required label, fact, and supplied data point is represented without unsupported additions;
- reference images influence only the assigned visual characteristics;
- the image is a clean, front-facing composition without unintended device frames, browser chrome, watermarks, or source branding;
- text remains legible at the intended viewing size, or intentionally secondary text is visibly treated as placeholder texture;
- the delivered artifact is identified as a concept when it could otherwise be mistaken for a functional UI or real data product.

If a required reference image is missing or inaccessible, stop and ask the user to attach it again. If no image-generation capability is available, state that constraint instead of changing the requested medium.
