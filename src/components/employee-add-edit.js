import {LitElement, html, css} from 'lit';
import {employeeService} from '../store.js';

class EmployeeAddEdit extends LitElement {
  static styles = css`
    :host {
      font-family: 'ING Me Regular', serif;
      --background-color: #fff;
      --primary-color: #ff6200;
      --secondary-color: #525199;
      --shadow-color: rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      padding: 20px;
    }

    h2 {
      color: var(--primary-color);
      align-self: start;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 60px;
      background: var(--background-color);
      padding: 70px;
    }

    .title-edit-form {
      align-self: start;
    }

    .form-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 100px;
      row-gap: 40px;
    }

    .form-btn-container {
      display: flex;
      gap: 50px;
    }

    .form-btn-container button {
      width: 200px;
      height: 32px;
      border-radius: 6px;
      border: 0 solid transparent;
      background-color: var(--primary-color);
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .form-btn-container button.cancel {
      border: 1px solid var(--secondary-color);
      color: var(--secondary-color);
      background-color: white;
    }

    label {
      display: flex;
      gap: 6px;
      flex-direction: column;
    }

    input {
      height: 24px;
    }

    @media (max-width: 768px) {
      form {
        padding: 40px;
      }

      .form-container {
        grid-template-columns: 1fr;
        column-gap: 20px;
        row-gap: 20px;
      }

      .form-btn-container {
        flex-direction: column;
        gap: 20px;
      }
    }
  `;

  static properties = {
    isEdit: {type: Boolean},
    employee: {type: Object, reflect: true},
    showConfirmModal: {type: Boolean},
    confirmMessage: {type: String},
  };

  constructor() {
    super();
    this.employee = null;
    this.formData = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: 'Analytics',
      position: 'Junior',
    };
  }

  _handleInput(e) {
    this.formData = {...this.formData, [e.target.name]: e.target.value};
  }

  _handleSubmitWithConfirmation(e) {
    e.preventDefault();
    if (this.isEdit) {
      this.confirmMessage = `Selected employee record of ${this.formData.firstName} ${this.formData.lastName} will be updated.`;
      this.showConfirmModal = true;
    } else {
      employeeService.send({type: 'ADD_EMPLOYEE', employee: this.formData});
      this.dispatchEvent(
        new CustomEvent('employee-list-updated', {bubbles: true})
      );
    }
  }

  _onConfirm() {
    if (this.isEdit) {
      employeeService.send({type: 'EDIT_EMPLOYEE', employee: this.formData});
      this.isEdit = false;
    } else {
      employeeService.send({type: 'ADD_EMPLOYEE', employee: this.formData});
    }
    this.dispatchEvent(
      new CustomEvent('employee-list-updated', {bubbles: true})
    );
  }

  _onCancel() {
    this.showConfirmModal = false;
  }

  _cancelEdit() {
    this.dispatchEvent(
      new CustomEvent('employee-cancel-edit', {bubbles: true})
    );
  }

  updated(changedVal) {
    if (changedVal.has('employee') && this.employee) {
      this.formData = {...this.employee};
      this.isEdit = true;
    }
  }

  render() {
    return html`
      <h2>${this.isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <form @submit="${this._handleSubmitWithConfirmation}">
        ${this.isEdit
          ? html`
              <div class="title-edit-form">
                <strong
                  >You are editing ${this.formData.firstName}
                  ${this.formData.lastName}</strong
                >
              </div>
            `
          : null}
        <div class="form-container">
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              .value="${this.formData.firstName}"
              @input="${this._handleInput}"
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              .value="${this.formData.lastName}"
              @input="${this._handleInput}"
              required
            />
          </label>
          <label>
            Date of Employment
            <input
              type="date"
              name="dateOfEmployment"
              .value="${this.formData.dateOfEmployment}"
              @input="${this._handleInput}"
              required
            />
          </label>
          <label>
            Date of Birth
            <input
              type="date"
              name="dateOfBirth"
              .value="${this.formData.dateOfBirth}"
              @input="${this._handleInput}"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="tel"
              name="phoneNumber"
              .value="${this.formData.phoneNumber}"
              @input="${this._handleInput}"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              .value="${this.formData.email}"
              @input="${this._handleInput}"
              required
            />
          </label>
          <label>
            Department
            <select
              name="department"
              .value="${this.formData.department}"
              @change="${this._handleInput}"
              required
            >
              <option
                value="Analytics"
                ?selected="${this.formData.department === 'Analytics'}"
              >
                Analytics
              </option>
              <option
                value="Tech"
                ?selected="${this.formData.department === 'Tech'}"
              >
                Tech
              </option>
            </select>
          </label>
          <label>
            Position
            <select
              name="position"
              .value="${this.formData.position}"
              @change="${this._handleInput}"
              required
            >
              <option
                value="Junior"
                ?selected="${this.formData.position === 'Junior'}"
              >
                Junior
              </option>
              <option
                value="Medior"
                ?selected="${this.formData.position === 'Medior'}"
              >
                Medior
              </option>
              <option
                value="Senior"
                ?selected="${this.formData.position === 'Senior'}"
              >
                Senior
              </option>
            </select>
          </label>
        </div>
        <div class="form-btn-container">
          <button type="submit">Save</button>
          <button type="button" class="cancel" @click="${this._cancelEdit}">
            Cancel
          </button>
        </div>
      </form>
      ${this.showConfirmModal
        ? html`
            <confirmation-modal
              .visible="${this.showConfirmModal}"
              .message="${this.confirmMessage}"
              @confirm="${this._onConfirm}"
              @cancel="${this._onCancel}"
            ></confirmation-modal>
          `
        : ''}
    `;
  }
}

customElements.define('employee-add-edit', EmployeeAddEdit);
