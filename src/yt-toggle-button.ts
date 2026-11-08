import { LitElement, html } from "lit";
import { styles } from "./yt-toggle-button.styles";

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
  static override styles = styles;

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

  /** Server-rendered (declarative) shadow roots have their slots assigned before any listener exists, so check once. */
  protected override firstUpdated(): void {
    this.named = (this.renderRoot.querySelector('slot[name="name"]') as HTMLSlotElement | null)?.assignedNodes().length! > 0;
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
