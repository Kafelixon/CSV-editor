import { LitElement, css, html } from "https://unpkg.com/lit?module";

import "./components/separator-select.js";
import "./components/csv-table.js";

class MainPage extends LitElement {
  static get styles() {
    return css`
      @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
      .container {
        display: grid;
        grid-template-columns: auto auto;
        place-content: center;
        font-family: "Roboto", sans-serif;
      }
      button{
        font-family: inherit
      }
    `;
  }

  static get properties() {
    return {
      array: {
        type: Array,
      },
      exampleCSV: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.array = [];
    this.exampleCSV = `ID,SERIAL_NO,TYPE,DESCRIPTION,VALUE
      2132, 33233, T1, Looks legit, 2343
      3323, 88843, T5, Damaged, 44
      1221, 44443, T1, Doesnt work, 43 `;
  }

  render() {
    return html`
      <div class="container">
        <div id="left-side">
          <button @click=${this._toHTML}>Transform to HTML>></button>
          <separator-select id="HTMLSeparator"></separator-select>
          <textarea cols="40" rows="10">${this.exampleCSV}</textarea>
        </div>
        <div id="right-side">
          <button @click=${this._toCSV}><< Transform to CSV</button>
          <separator-select id="CSVSeparator"></separator-select>
          <csv-table
            .array=${this.array}
            .separator=${this.HTMLSeparator}
          ></csv-table>
        </div>
      </div>
    `;
  }

  get _shadow() {
    return this.shadowRoot;
  }
  get _textarea() {
    return this._shadow.querySelector("textarea");
  }

  _toHTML() {
    var separator = this._shadow
      .querySelector("#HTMLSeparator")
      .shadowRoot.querySelector("select").value;
    this.array = this._textarea.value
      .split("\n")
      .filter((e) => e.length > 0)
      .map((e) => {
        return e.split(separator).map((e) => {
          return e.trim();
        });
      });
    //if the last is empty then pop it
    if (this.array[this.array.length - 1] == "") {
      this.array.pop();
    }
  }

  _toCSV() {
    try {
      var table = this._shadow
        .querySelector("csv-table")
        .shadowRoot.querySelector("table");
      var separator = this._shadow
        .querySelector("#CSVSeparator")
        .shadowRoot.querySelector("select").value;
      var columnCount = table.getElementsByTagName("th").length;

      var columnIterator = 1;
      var array = [];
      var result = "";

      //convert HTMLcollections into one array
      for (let item of table.getElementsByTagName("th")) {
        array.push(item.innerText);
      }
      for (let item of table.getElementsByTagName("input")) {
        array.push(item.value);
      }

      //convert array into csv format
      array.forEach((e) => {
        if (columnIterator > columnCount) {
          result += "\n" + e;
          columnIterator = 1;
        } else if (result != "") {
          result += separator + e;
        } else {
          result = e;
        }
        columnIterator++;
      });

      this._textarea.value = result;
    } catch (error) {
      alert("You have to Transform to HTML first");
      console.log(error);
    }
  }
}

customElements.define("main-page", MainPage);
