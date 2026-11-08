import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * A navigation pill: `<yt-chip><a href="/kategori/musik" aria-current="page">Musik</a></yt-chip>`.
 *
 * The link stays in the page's markup and is what the pill is drawn on, so navigation, focus and the accessible name
 * work without the component, and the current state has one source: the link's `aria-current`, which the server sets.
 *
 * Purely presentational and never delivered in fragments, so no page loads this script: the server's declarative
 * shadow root is the whole component. The class exists to define the element and to document the contract.
 */
@customElement("yt-chip")
export class YtChip extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }
    /* Colour is !important on purpose: a normal declaration in the page's stylesheet (such as its generic link colour)
       beats ::slotted() whatever its specificity, because the outer context wins the cascade. Important flips that. */
    ::slotted(a) {
      display: block;
      padding: var(--yt-space-1, 0.25rem) var(--yt-space-3, 0.75rem);
      color: var(--yt-text, #1f2328) !important;
      text-decoration: none;
      border: 1px solid var(--yt-border, #d1d9e0);
      border-radius: var(--yt-radius-pill, 999px);
    }
    ::slotted(a:hover) {
      background: var(--yt-surface, #f6f8fa);
    }
    ::slotted(a[aria-current="page"]) {
      color: var(--yt-bg, #ffffff) !important;
      background: var(--yt-text, #1f2328);
      border-color: var(--yt-text, #1f2328);
    }
  `;

  protected override render() {
    return html`<slot></slot>`;
  }
}
