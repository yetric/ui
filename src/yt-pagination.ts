import { LitElement, css, html } from "lit";

/**
 * Lays out the controls of a paged list, inside a `<nav>` you own:
 *
 *   <nav aria-label="Pages">
 *     <yt-pagination>
 *       <a slot="prev" rel="prev" href="?page=1">Previous</a>
 *       <span>Page 2</span>
 *       <a slot="next" rel="next" href="?page=3">Next</a>
 *     </yt-pagination>
 *   </nav>
 *
 * The links stay ordinary links in your markup, so paging works without JavaScript. A script may add a control in the
 * `more` slot (a "Show more" button, say) and set the `enhanced` attribute: the previous/next links are then hidden
 * because the button replaces them. Remove the attribute (and the control) to fall back to the links.
 *
 * Presentational: with a server-rendered Declarative Shadow DOM shell it is fully painted without JavaScript.
 */
export class YtPagination extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--yt-space-4, 1rem);
      align-items: center;
    }
    :host([enhanced]) ::slotted([slot="prev"]),
    :host([enhanced]) ::slotted([slot="next"]) {
      display: none;
    }
    ::slotted([slot="more"]) {
      padding: var(--yt-space-2, 0.5rem) var(--yt-space-4, 1rem);
      font: inherit;
      color: var(--yt-text, #1f2328);
      background: var(--yt-bg, #ffffff);
      border: 1px solid var(--yt-border, #d1d9e0);
      border-radius: var(--yt-radius, 6px);
      cursor: pointer;
    }
    ::slotted([slot="more"]:hover) {
      background: var(--yt-surface, #f6f8fa);
    }
    ::slotted([slot="more"]:focus-visible) {
      outline: 2px solid var(--yt-focus, #0969da);
      outline-offset: 2px;
    }
  `;

  protected override render() {
    return html`<slot name="prev"></slot><slot></slot><slot name="next"></slot><slot name="more"></slot>`;
  }
}

if (!customElements.get("yt-pagination")) customElements.define("yt-pagination", YtPagination);
