import { LitElement, html, unsafeCSS } from "lit";
import styles from "./yt-search-field.css?inline";

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
  static override styles = unsafeCSS(styles);

  protected override render() {
    return html`<div class="field"><slot name="label"></slot><slot name="input"></slot><slot name="button"></slot></div>`;
  }
}

if (!customElements.get("yt-search-field")) customElements.define("yt-search-field", YtSearchField);
