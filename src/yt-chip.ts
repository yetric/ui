import { LitElement, html } from "lit";
import { styles } from "./yt-chip.styles";

/**
 * A navigation pill: `<yt-chip><a href="/music" aria-current="page">Music</a></yt-chip>`.
 *
 * The link stays in the page's markup and is what the pill is drawn on, so navigation, focus and the accessible name
 * work without the component, and the current state has one source: the link's `aria-current`.
 *
 * Purely presentational: with a server-rendered Declarative Shadow DOM shell it is fully painted without JavaScript.
 */
export class YtChip extends LitElement {
  static override styles = styles;

  protected override render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get("yt-chip")) customElements.define("yt-chip", YtChip);
