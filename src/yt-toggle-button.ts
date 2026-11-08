import { LitElement, css, html } from "lit";

/**
 * A toggle button: `<yt-toggle-button>Save</yt-toggle-button>`. It keeps a `pressed` state (reflected as an attribute,
 * exposed as `aria-pressed`) and fires `yt-toggle` (bubbles, composed, `detail.pressed`) when the user flips it. It stores
 * nothing: the page decides what pressing means and may set `pressed` back, for example when saving failed.
 *
 * Slots: the default slot is the visible label, `icon` is an optional graphic, and `name` is visually hidden text that
 * becomes the accessible name (use it when the label alone is ambiguous, such as "Save <title>" on a list of items).
 *
 * It needs JavaScript to do anything, so it stays hidden until the element is defined instead of offering a dead
 * control. The server-rendered shell is always the unpressed state; apply stored state after the element has updated.
 */
export class YtToggleButton extends LitElement {
  static override styles = css`
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

  static override properties = {
    pressed: { type: Boolean, reflect: true },
    named: { state: true },
  };

  declare pressed: boolean;
  /** True when the page supplied a `name` slot; the visible label is then hidden from assistive technology. */
  declare named: boolean;

  constructor() {
    super();
    this.pressed = false;
    this.named = false;
  }

  private toggle(): void {
    this.pressed = !this.pressed;
    this.dispatchEvent(new CustomEvent("yt-toggle", { bubbles: true, composed: true, detail: { pressed: this.pressed } }));
  }

  protected override render() {
    return html`<button type="button" aria-pressed=${this.pressed ? "true" : "false"} @click=${() => this.toggle()}>
      <slot name="icon"></slot>
      <span aria-hidden=${this.named ? "true" : "false"}><slot></slot></span>
      <span class="sr"><slot name="name" @slotchange=${(e: Event) => (this.named = (e.target as HTMLSlotElement).assignedNodes().length > 0)}></slot></span>
    </button>`;
  }
}

if (!customElements.get("yt-toggle-button")) customElements.define("yt-toggle-button", YtToggleButton);
