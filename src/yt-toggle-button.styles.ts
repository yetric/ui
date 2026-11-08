import { css } from "lit";

export const styles = css`
  :host {
    display: inline-block;
  }
  :host(:not(:defined)) {
    visibility: hidden; /* keeps the space, so nothing jumps when the script arrives */
  }
  button {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.75rem;
    font: inherit;
    font-size: var(--yt-text-sm, 0.875rem);
    color: var(--yt-text, #1f2328);
    background: transparent;
    border: 1px solid var(--yt-border, #d1d9e0);
    border-radius: var(--yt-radius-pill, 999px);
    cursor: pointer;
  }
  button:hover {
    background: var(--yt-surface, #f6f8fa);
  }
  button:focus-visible {
    outline: 2px solid var(--yt-focus, #0969da);
    outline-offset: 2px;
  }
  button[aria-pressed="true"] {
    background: var(--yt-pressed-bg, #fff8c5);
    border-color: var(--yt-pressed-border, #9a6700);
  }
  ::slotted([slot="icon"]) {
    width: 1rem;
    height: 1rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
  }
  :host([pressed]) ::slotted([slot="icon"]) {
    fill: var(--yt-pressed-icon, #d4a72c);
    stroke: var(--yt-pressed-stroke, #7d4e00);
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
