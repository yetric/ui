# @yetric/ui

Lit web components for Yetric applications (`yt-*`). Shipped as TypeScript source; the consuming app's bundler
compiles it, so the app controls Lit's version (a peer dependency) and bundling.

```sh
bun add github:yetric/ui#v0.1.0     # a git dependency pinned to a tag
```

```ts
import "@yetric/ui/yt-badge";       // one entry per component, import only what you use
```

Decisions: [ADR-0007 in yetric/local-events](https://github.com/yetric/local-events/blob/main/docs/ADR/0007-yt-prefix-and-extraction-to-yetric-ui.md).
Components read `--yt-*` custom properties with built-in fallbacks, so they work without a token stylesheet. Server-rendered
use (Declarative Shadow DOM, no JavaScript) is described in local-events ADR-0005; the app's build renders the shells.

| Component | Needs JS | What |
|---|---|---|
| `yt-badge` | no (with a server-rendered shell) | Status label, `variant="warn"` or `"dev"` |
| `yt-chip` | no (with a server-rendered shell) | Navigation pill around a slotted link |

Versioning: SemVer, tags `vX.Y.Z`. A change to a tag name, attribute, slot or `--yt-*` property is a major version.
