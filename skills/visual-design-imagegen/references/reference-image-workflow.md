# Reference Image Workflow

## Assign roles

Inspect every supplied reference and assign a role from the user's instructions. Useful roles include overall direction, palette, composition, typography, component language, chart language, texture, or material treatment.

When roles are unspecified, use the first image as the primary direction and later images only for compatible supporting traits. If the user refers to an image that is not accessible, request that image again before generation.

## Extract transferable traits

Describe reusable traits without carrying over source content:

- mood, contrast, saturation, and color relationships;
- grid, spacing, alignment, density, and visual center;
- type scale and information hierarchy;
- container, control, chart, icon, border, shadow, and texture language;
- reading order, rhythm, and use of negative space.

Keep source-specific branding, people, text, numbers, proprietary symbols, and distinctive page arrangements out of the new content unless the user explicitly supplies them as part of the new brief.

## Recompose

Create a composition for the new subject. Preserve only the assigned high-level traits, resolve conflicts in favor of the current written brief, and keep one dominant visual direction when multiple references disagree.

Before generation, the prompt should clearly separate:

1. new content to render;
2. visual traits to borrow;
3. source content to exclude;
4. exact text or data that must remain unchanged.

After generation, compare the result with those four groups rather than asking whether it generally “looks similar.”
