import { html, css, LitElement } from "https://unpkg.com/lit?module";
// import { TransformTo } from "transform-to.js";

export class CSVTable extends LitElement {
  static get styles() {
    return css`
      th {
        text-align: left;
      }
    `;
  }
  static get properties() {
    return {
      array: {
        type: Array,
        hasChanged(newVal, oldVal) {
          return true;
        },
      },
    };
  }

  constructor() {
    super();
    this.array = [];
    this.firstRow;
  }

  getArray() {
    return this.array;
  }

  render() {
    this.firstRow = this.array[0];
    //checking if array is not empty
    if (this.array.length) {
      return html`
        <table>
          <tr>
            ${this.firstRow.map((item) => html`<th>${item}</th>`)}
          </tr>
          ${this.array.map((item, index) => {
            if (index) {
              return html`
                <tr>
                  ${item.map((e) => html`<td><input value="${e}" /></td>`)}
                </tr>
              `;
            }
          })}
        </table>
        <button @click=${this._addRow}>Add Row</button>
      `;
    }
  }
  _addRow() {
    //idk why push here wasnt working but this works
    this.array = this.array.concat([["", "", "", "", ""]]);
  }
}
customElements.define("csv-table", CSVTable);
