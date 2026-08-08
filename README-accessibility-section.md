## Accessibility & Design Notes — Milestone 3

> A note on process: I don't have a way to run the WAVE browser extension
> directly, so I did a manual pass against WAVE's rule set (labels, alt
> text, headings, empty elements, contrast, ARIA) across all three pages
> and fixed everything below. **Please still run WAVE yourself on the live
> GitHub Pages site** to confirm a clean report, and swap the bracketed
> note below for your actual result.
>
> `[ ] Ran WAVE on all three pages — 0 errors confirmed on: __________`

### Accessibility fixes

- Added a "Skip to main content" link as the first focusable element on every page, so keyboard users can bypass the repeated header/nav.
- Moved the decorative "SHEET 0X / 03" tag out of a CSS `::after` (unreliable/inconsistent with screen readers) into a real `<span aria-hidden="true">`, so it no longer risks being read as a confusing run-on with the site name.
- Filled the empty `<p></p>` under the About page's `<h1>` with real placeholder copy, since an empty element with no accessible content serves no purpose for anyone.
- Darkened the accent orange used for text (new `--signal-text: #a83c0d`) because the original `--signal: #c1440e` fell to 4.36:1 against the page background — below the 4.5:1 AA minimum for normal text — on the "See all projects" link, the projects-page card labels, and the contact-list hover links.
- Added a lighter accent variant (`--signal-on-dark: #e07a45`) for the sheet-tag text/border on the dark header band, since the original orange measured only 3.12:1 against the navy background.
- Fixed the "Send" button's hover/focus state, which previously put light text on the *original* orange background at 4.36:1; it now uses `--signal-text`, which reaches 5.39:1.
- Wrapped the contact form's fields in a `<fieldset>` with a `<legend>` ("Your details") so the group has an accessible name when navigated by form/landmark shortcuts, not just a visual `<h2>`.
- Added `required`, `aria-required`, and per-field error messages (`aria-describedby`, `aria-invalid`) to the Name, Email, and Message fields, plus a `role="alert"` summary region that receives focus and lists errors as jump-links when the form is submitted invalid.
- Made sure the error state is never color-only: invalid fields get a heavier border **and** a text message ("Please enter your name."), not just a red-ish outline.
- Gave `main` `id="main-content"` and `tabindex="-1"` so the skip link and the form's error-jump-links actually move focus, not just the URL hash.

### Contrast — checked against WebAIM's method (WCAG AA: 4.5:1 normal text, 3:1 large text/UI)

| Text / Background | Ratio | Result |
|---|---|---|
| `--ink` on `--paper` (body text) | 13.61:1 | Pass (AAA) |
| `--ink-soft` on `--paper` (secondary text) | 6.41:1 | Pass |
| `--ink-soft` on `--paper-raised` (card text) | 6.91:1 | Pass |
| `--signal-text` on `--paper` (links, was failing at 4.36:1) | 5.39:1 | Pass |
| `--signal-text` on `--paper-raised` (card eyebrows) | 5.81:1 | Pass |
| `--signal-on-dark` on `--ink` (header tag, was failing at 3.12:1) | 5.35:1 | Pass |
| `--paper` on `--signal-text` (button hover, was failing at 4.36:1) | 5.39:1 | Pass |

### Gestalt principles applied

- **Proximity** — the 8px-based spacing scale keeps each label tight to its input, each project card's title tight to its own description, and puts visible air between unrelated groups (nav items, form rows, sections), so relatedness is readable from spacing alone.
- **Similarity** — every project card (home and projects pages) shares the same background, border, and radius, so they read as one interchangeable set; every small-caps mono label (nav items, "Tools used"/"What it does" eyebrows, form labels) shares the same type treatment, so users learn to recognize that style as "metadata" wherever it appears.
- **Common region** — bordered/filled containers (the `.project-card` boxes and the new contact-form `<fieldset>`) visually enclose a group of related elements as one unit, which is also why the fieldset got the same card-like treatment as the rest of the site instead of a plain unstyled box.

### Color palette

One shared stylesheet (`styles_part2.css`) with all color as CSS custom properties (`--ink`, `--ink-soft`, `--paper`, `--paper-raised`, `--line`, `--signal`, `--signal-text`, `--signal-on-dark`) is linked from all three pages, so the palette is identical everywhere by construction — there's no per-page color to drift out of sync.

### Accessible form

See `about_part2.html`. The contact form now has:
- a `<fieldset>`/`<legend>` grouping the three fields,
- a real `<label for>` on every input (already true before this milestone),
- `required` + `aria-required` on all three fields,
- an inline `<span class="field-error">` per field wired via `aria-describedby`, populated by JS on invalid submit and cleared as the user corrects the field,
- a `role="alert"` error/success summary above the form that takes focus on submit.

It's still front-end only (no backend to actually send mail) — the JS validates and shows real accessible success/error states, but submitting doesn't send anything yet.
