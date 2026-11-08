import { LitElement, html } from "lit";
import { styles } from "./yt-badge.styles";

/**
 * A short status label: `<yt-badge>Free</yt-badge>`, with `variant="warn"` for warnings and `variant="notice"` for
 * neutral highlights. The text is slotted, so it exists in the page without the component and the page owns what it says.
 *
 * Purely presentational: with a server-rendered Declarative Shadow DOM shell the component is fully painted without
 * JavaScript. The class defines the element and renders that shell at build time.
 */
export class YtBadge extends LitElement {
  static override styles = styles;

  static override properties = { variant: { type: String } };

  /** "warn" or "notice"; anything else is the neutral badge. Set as an attribute, not reflected. */
  declare variant: string;

  constructor() {
    super();
    this.variant = "";
  }

  protected override render() {
    return html`<span><slot></slot></span>`;
  }
}

if (!customElements.get("yt-badge")) customElements.define("yt-badge", YtBadge);
