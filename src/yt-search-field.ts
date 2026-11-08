import { LitElement, css, html } from "lit";

/**
 * A search field for a form you own:
 *
 *   <form action="/search" method="get" role="search">
 *     <yt-search-field>
 *       <label slot="label" for="q">Search</label>
 *       <input slot="input" id="q" name="q" type="search">
 *       <button slot="button" type="submit">Search</button>
 *     </yt-search-field>
 *   </form>
 *
 * The native label, input and button stay in your markup (so the form submits, validates and is announced as usual,
 * with or without JavaScript); the component only lays them out and styles them. `compact` hides the label visually
 * (it stays available to assistive technology) and uses a tighter input, for a header.
 *
 * Presentational: with a server-rendered Declarative Shadow DOM shell it is fully painted without JavaScript.
 */
export class YtSearchField extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    .field {
      display: flex;
      flex-wrap: wrap;
      gap: var(--yt-space-2, 0.5rem);
      align-items: end;
    }
    ::slotted([slot="label"]) {
      flex-basis: 100%;
      font-weight: 600;
    }
    ::slotted([slot="input"]) {
      flex: 1 1 14rem;
      min-width: 0;
      box-sizing: border-box;
      padding: var(--yt-space-2, 0.5rem) var(--yt-space-3, 0.75rem);
      font: inherit;
      color: var(--yt-text, #1f2328);
      background: var(--yt-bg, #ffffff);
      border: 1px solid var(--yt-border, #d1d9e0);
      border-radius: var(--yt-radius, 6px);
    }
    ::slotted([slot="input"]:focus-visible),
    ::slotted([slot="button"]:focus-visible) {
      outline: 2px solid var(--yt-focus, #0969da);
      outline-offset: 2px;
    }
    ::slotted([slot="button"]) {
      padding: var(--yt-space-2, 0.5rem) var(--yt-space-4, 1rem);
      font: inherit;
      font-weight: 600;
      color: var(--yt-on-accent, #ffffff);
      background: var(--yt-accent, #0969da);
      border: 1px solid var(--yt-accent, #0969da);
      border-radius: var(--yt-radius, 6px);
      cursor: pointer;
    }
    :host([compact]) ::slotted([slot="label"]) {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host([compact]) ::slotted([slot="input"]) {
      flex-basis: 10rem;
      padding: var(--yt-space-1, 0.25rem) var(--yt-space-3, 0.75rem);
    }
  `;

  protected override render() {
    return html`<div class="field"><slot name="label"></slot><slot name="input"></slot><slot name="button"></slot></div>`;
  }
}

if (!customElements.get("yt-search-field")) customElements.define("yt-search-field", YtSearchField);
