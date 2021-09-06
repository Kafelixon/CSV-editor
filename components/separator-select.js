import { html, css, LitElement } from "https://unpkg.com/lit?module";

export class Separator extends LitElement {
  static get properties() {
    return {
      id: { type: String },
    };
  }

  constructor() {
    super();
    this.id;
  }

  render() {
    return html`Separator:
      <select id=${this.id}>
        <option value=",">COMMA</option>
        <option value="	">TAB</option>
        <option value=";">SEMICOLON</option>
      </select>
      <br />`;
  }
}
customElements.define("separator-select", Separator);
