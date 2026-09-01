# @lhamacorplabs/design-tokens

Design tokens for the **COSMIC** visual language — monospace type, a soft
pastel gradient background, floating rounded panels, pill-shaped
controls — shared across Lhamacorp frontends. Extracted from
[chat-client](https://github.com/LhamacorpLabs/chat-client), which
remains the reference implementation for how these tokens compose into
actual components.

This package ships **tokens only**: CSS custom properties, matching
JS/TS values, and the light/dark theming mechanism. It does not ship
component classes (buttons, cards, badges, etc.) — each consuming app
builds its own components against these variables.

## Install

Not yet published to a registry. Until it is, consume it directly from
git:

```bash
npm install github:LhamacorpLabs/design-system
```

Once published (npm, or GitHub Packages under the `@lhamacorplabs`
scope):

```bash
npm install @lhamacorplabs/design-tokens
```

## Usage

### 1. CSS custom properties

```css
/* your global stylesheet */
@import '@lhamacorplabs/design-tokens/css/tokens.css';
```

```ts
// or as a JS side-effect import (Vite/webpack/etc. extract it to a real stylesheet)
import '@lhamacorplabs/design-tokens/css/tokens.css';
```

Prefer the `.css`-suffixed path (`/css/tokens.css`) over the shorter
`/css` alias in a TypeScript project: TS's `declare module '*.css'`
ambient type (from `vite/client` or similar) only matches specifiers
that literally end in `.css`, so `import '@lhamacorplabs/design-tokens/css'`
(no extension) fails type-checking with "Cannot find module" even
though it resolves and works fine at runtime. The extension-less `/css`
export still exists for non-TS tooling that only cares about runtime
resolution.

Or link it directly if your build doesn't resolve package CSS imports:

```html
<link rel="stylesheet" href="/node_modules/@lhamacorplabs/design-tokens/src/css/tokens.css" />
```

This defines every token on `:root` (light, the default) and
`:root[data-theme="dark"]`. See [Token reference](#token-reference) below
for the full list.

### 2. Load the font

The CSS only sets `--font-mono`; it doesn't load the font file. Add
JetBrains Mono yourself, e.g. via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Then set it on your root element:

```css
html {
  font-family: var(--font-mono);
}
```

### 3. Theming (light/dark, no flash-of-unstyled-theme)

Add the no-FOUC script as a **blocking inline `<script>` in `<head>`**,
before your stylesheet — this has to run before first paint, so it
can't be a normal module import:

```html
<script>
  (function () {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

The exact same string is exported as `NO_FOUC_SCRIPT` if you want to
inject it programmatically (e.g. from a Node-rendered `<head>`):

```ts
import { NO_FOUC_SCRIPT } from '@lhamacorplabs/design-tokens';
```

Then wire up a toggle:

```ts
import { toggleTheme, getAppliedTheme } from '@lhamacorplabs/design-tokens';

button.addEventListener('click', () => toggleTheme());
```

`theme.ts` is framework-agnostic (plain DOM APIs) — see
[src/theme.ts](./src/theme.ts) for the full API: `getPreferredTheme`,
`getAppliedTheme`, `applyTheme`, `toggleTheme`, `initTheme`.

### 4. JS/TS token values

For anything that needs the raw values in JS (a Tailwind theme
extension, a chart library, canvas rendering, etc.) rather than via CSS
`var()`:

```ts
import { colors, radii, spacing, fontSize, fontMono } from '@lhamacorplabs/design-tokens';

colors.light.accent; // '#2c2f45'
colors.dark.accent; // '#e9eaf3'
radii.pill; // '999px'
```

These are hand-kept in sync with `src/css/tokens.css` — if you change
one, change the other.

## Token reference

| Group | Tokens |
| --- | --- |
| Type | `--font-mono` |
| Page background | `--bg-gradient` |
| Surfaces | `--surface`, `--surface-hover`, `--surface-alt`, `--panel-bg` |
| Text | `--text-primary`, `--text-secondary`, `--text-muted` |
| Accent | `--accent`, `--accent-hover`, `--accent-contrast`, `--accent-subtle`, `--accent-shadow` |
| Borders & focus | `--border`, `--border-hover`, `--border-focus`, `--focus-ring`, `--input-bg` |
| Semantic (success/error/danger/warning) | `--success-bg/-text/-border`, `--error-bg/-text/-border`, `--danger`, `--danger-hover`, `--warning-bg/-text/-border` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Radii | `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (18px), `--radius-pill` (999px) |
| Layout | `--gap` (20px — the inset used for floating panels) |
| Spacing scale | `--space-1` … `--space-12` (4px base unit) |
| Font-size scale | `--font-xs` … `--font-4xl` |
| Motion | `--duration-fast/-base/-slow/-slower`, `--ease-standard`, `--ease-out` |

Every token is defined on `:root` (light) and re-declared where its
value differs under `:root[data-theme="dark"]` — see
[src/css/tokens.css](./src/css/tokens.css) for exact values.

## The visual pattern these tokens are built for

- **Page chrome**: `body { background: var(--bg-gradient); background-attachment: fixed; }`. Primary UI surfaces (nav rails, main content, cards) are *not* edge-to-edge — they're floating panels inset from the viewport by `var(--gap)`: `background: var(--panel-bg); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-md);`. Collapse to edge-to-edge (radius 0, no gap) on narrow viewports.
- **Buttons/badges/tabs**: pill-shaped (`border-radius: var(--radius-pill)`), uppercase, letter-spaced, monospace.
- **Section/field labels**: small, uppercase, letter-spaced, `color: var(--text-muted)`.
- **Inputs**: `border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--input-bg);`, focus state `border-color: var(--border-focus); box-shadow: 0 0 0 3px var(--focus-ring);`.
- **One hero surface** (e.g. a primary panel) can optionally get a subtle ring: `box-shadow: 0 0 0 3px var(--focus-ring), var(--shadow-lg);` — use sparingly.

## Development

```bash
npm install
npm run build      # emits dist/ (ESM + CJS + .d.ts)
npm run typecheck
```

## Versioning

**v1.0.0** is tagged and frozen: the COSMIC tokens described in this
README (monospace type, pastel gradient, floating panels) exactly as
they exist at that tag. Consumers who want stability should pin to it
explicitly rather than floating on the default branch:

```bash
npm install github:LhamacorpLabs/design-system#v1.0.0
```

Work past that tag on this branch (and eventually `main`) is heading
toward **v2** — a new dark, card-heavy visual direction (icon-rail
navigation, translucent surfaces, pricing/model-card style components)
tracked as `2.0.0-dev` until the token values are finalized and it's
tagged `v2.0.0` in turn. A draft starting point lives at
[`src/css/v2/tokens.css`](./src/css/v2/tokens.css) (currently just a
copy of the v1 tokens — the actual new values are still being
designed) and is exported as `@lhamacorplabs/design-tokens/v2/css`.

**Important:** installing this package via the unpinned
`github:LhamacorpLabs/design-system` form (no `#ref`) resolves to
whatever the default branch's HEAD is at install time — that's how
`chat-client` currently depends on it. Once v2 development lands on
`main`, that means an unpinned consumer would silently pick up v2 on
its next `npm install`. Any app that wants to stay on v1 needs to pin
`#v1.0.0` explicitly; any app opting into v2 early can pin this branch
or, once cut, `#v2.0.0`.
