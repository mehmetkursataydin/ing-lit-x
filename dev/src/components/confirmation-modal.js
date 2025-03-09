import {LitElement, html, css} from 'lit';
import {msg} from '@lit/localize';

export class ConfirmationModal extends LitElement {
  static properties = {
    visible: {type: Boolean, reflect: true},
    message: {type: String},
  };

  static styles = css`
    :host {
      font-family: 'INGMe', serif;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      --primary-color: #ff6200;
    }

    :host([visible]) {
      display: flex;
    }

    h2 {
      color: var(--primary-color);
      margin: 0;
      font-size: 18px;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal {
      position: relative;
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      z-index: 1001;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .modal-title {
      display: flex;
      justify-content: space-between;
    }

    .modal-title > button {
      background-color: transparent;
      color: var(--primary-color);
      padding: 0;
    }

    .modal-content {
      margin-bottom: 20px;
    }

    .modal-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button.cancel {
      border: 1px solid var(--secondary-color);
      color: var(--secondary-color);
      background-color: white;
      font-weight: bold;
    }

    button.confirm {
      background: var(--primary-color);
      color: #fff;
    }
  `;

  constructor() {
    super();
    this.visible = false;
    this.message = 'Are you sure?';
  }

  _onConfirm() {
    this.dispatchEvent(
      new CustomEvent('confirm', {bubbles: true, composed: true})
    );
    this.visible = false;
  }

  _onCancel() {
    this.dispatchEvent(
      new CustomEvent('cancel', {bubbles: true, composed: true})
    );
    this.visible = false;
  }

  render() {
    return html`
      <div class="overlay" @click="${this._onCancel}"></div>
      <div class="modal">
        <div class="modal-content">
          <div class="modal-title">
            <h2>${msg(html`Are you sure?`)}</h2>
            <button @click="${this._onCancel}">${this.renderCloseSvg()}</button>
          </div>
          <p>${this.message}</p>
        </div>
        <div class="modal-actions">
          <button class="confirm" @click="${this._onConfirm}">
            ${msg(html`Proceed`)}
          </button>
          <button class="cancel" @click="${this._onCancel}">
            ${msg(html`Cancel`)}
          </button>
        </div>
      </div>
    `;
  }

  renderCloseSvg() {
    return html` <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>`;
  }
}

customElements.define('confirmation-modal', ConfirmationModal);
