import { LitElement, html, css } from 'lit';

class NavTop extends LitElement {
  static get styles() {
    return css`
      nav {
        background: #f8f8f2;
      }
    `;
  }

  render() {
    return html`
      <nav>
        <a href="/list">Employee List</a>
        <a href="/add">Add Employee</a>
      </nav>
    `;
  }
}

window.customElements.define('nav-top', NavTop);
