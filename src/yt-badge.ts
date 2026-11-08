import { LitElement, css, html } from "lit";

/**
 * A short status label: `<yt-badge>Gratis</yt-badge>`, or `variant="warn"` (cancelled, postponed) / `variant="dev"`
 * (local-development markers). The text is slotted, so it exists without the component and Go owns what it says.
 *
 * Purely presentational: the server's shadow root is the whole component, so no page loads this script (it exists
 * to render that shell at build time and to define the element's contract). `parseFragment` attaches the shadow roots
 * of fragments, so cards added by "Visa fler" are styled without it too.
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
    :host([variant="dev"]) span {
      background: var(--yt-dev-bg, #fff8c5);
      border-color: var(--yt-dev-border, #9a6700);
    }
  `;

  static override properties = { variant: { type: String } };

  /** "warn" or "dev"; anything else is the neutral badge. Set as an attribute by the server, not reflected. */
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
