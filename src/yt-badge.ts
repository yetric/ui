import { LitElement, css, html } from "lit";

/**
 * A short status label: `<yt-badge>Free</yt-badge>`, with `variant="warn"` for warnings and `variant="notice"` for
 * neutral highlights. The text is slotted, so it exists in the page without the component and the page owns what it says.
 *
 * Purely presentational: with a server-rendered Declarative Shadow DOM shell the component is fully painted without
 * JavaScript. The class defines the element and renders that shell at build time.
 */
export class YtBadge extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      max-width: 100%;
      margin-right: var(--yt-space-1, 0.25rem);
    }
    span {
      display: block;
      padding: 0 var(--yt-space-2, 0.5rem);
      color: var(--yt-text, #1f2328);
      background: var(--yt-surface, #f6f8fa);
      border: 1px solid var(--yt-border, #d1d9e0);
      border-radius: var(--yt-radius-pill, 999px);
      font-size: var(--yt-text-sm, 0.875rem);
    }
    :host([variant="warn"]) span {
      color: var(--yt-warn-text, #82071e);
      background: var(--yt-warn-bg, #ffebe9);
      border-color: var(--yt-warn-border, #cf222e);
    }
    :host([variant="notice"]) span {
      background: var(--yt-notice-bg, #fff8c5);
      border-color: var(--yt-notice-border, #9a6700);
    }
  `;

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
