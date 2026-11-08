import { LitElement, css, html } from "lit";

/**
 * A message box: `<yt-alert role="status">Nothing found.</yt-alert>`.
 *
 * The text is slotted, so it stays in your markup and you choose the ARIA role (`status` for polite updates, `alert`
 * for urgent ones, `note` for static information); the component only styles it. `variant` is `info` (default),
 * `notice` (a neutral highlight) or `warn`. `banner` makes it a full-width bar with only a bottom border, for the top
 * of a page.
 *
 * Presentational: with a server-rendered Declarative Shadow DOM shell it is fully painted without JavaScript.
 */
export class YtAlert extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: var(--yt-space-2, 0.5rem) var(--yt-space-4, 1rem);
      color: var(--yt-text, #1f2328);
      background: var(--yt-surface, #f6f8fa);
      border: 1px solid var(--yt-border, #d1d9e0);
      border-radius: var(--yt-radius, 6px);
    }
    :host([variant="notice"]) {
      background: var(--yt-notice-bg, #fff8c5);
      border-color: var(--yt-notice-border, #9a6700);
    }
    :host([variant="warn"]) {
      color: var(--yt-warn-text, #82071e);
      background: var(--yt-warn-bg, #ffebe9);
      border-color: var(--yt-warn-border, #cf222e);
    }
    :host([banner]) {
      border-width: 0 0 1px;
      border-radius: 0;
    }
    ::slotted(p) {
      margin: 0;
    }
  `;

  protected override render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get("yt-alert")) customElements.define("yt-alert", YtAlert);
