# @yetric/ui

Small, framework-independent Lit web components with the `yt-` prefix. Shipped as TypeScript source (no decorators), so
the consuming app's bundler compiles it and controls Lit's version (a peer dependency).

```sh
bun add github:yetric/ui#v0.3.1     # or npm: "@yetric/ui": "github:yetric/ui#v0.3.1"
```

```ts
import "@yetric/ui/yt-badge";       // one entry per component, import only what you use
```

| Component | What |
|---|---|
| `yt-badge` | Status label; `variant="warn"` or `"notice"`, neutral otherwise |
| `yt-toggle-button` | Button with a `pressed` state; slots `icon`, default label, `name`; fires `yt-toggle`; stores nothing |
| `yt-chip` | Navigation pill around a slotted link; current state from the link's `aria-current` |

Content is slotted, so it stays in your HTML. Styling reads `--yt-*` custom properties (`--yt-text`, `--yt-surface`,
`--yt-border`, `--yt-warn-*`, `--yt-notice-*`, `--yt-pressed-*`, ...) with built-in fallbacks, so no token stylesheet is required.

`yt-badge` and `yt-chip` are presentational: rendered on the server as Declarative Shadow DOM they paint without any JavaScript. `yt-toggle-button` needs JavaScript and stays hidden until it is defined.

Versioning: SemVer, tags `vX.Y.Z`. A change to a tag name, attribute, slot or `--yt-*` property is a major version.
