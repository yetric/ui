import { css } from "lit";

export const styles = css`
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
