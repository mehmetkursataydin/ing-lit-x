import {LitElement, html, css} from 'lit';
import {employeeService} from '../store.js';

class EmployeeAddEdit extends LitElement {
  static styles = css`
      :host {
          display: flex;
          justify-content: center;
          align-items: center;
      }

      form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
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

          button {
              width: 200px;
              height: 32px;
              border-radius: 6px;
              border: 0 solid transparent;
          }
      }

      label {
          display: flex;
          gap: 6px;
          flex-direction: column;
      }

      input {
          height: 24px;
      }
  `;

  static properties = {
    isEdit: false,
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
    this.formData = {...this.formData, [e.target.name]: e.target.value}
  }

  _handleSubmit(e) {
    //todo
    e.preventDefault()
    //validate

    employeeService.send({type: 'ADD_EMPLOYEE', employee: this.formData})
    this.dispatchEvent(new CustomEvent('employee-added', {bubbles: true}))
  }

  render() {
    return html`
      <form @submit="${this._handleSubmit}">
        <div class="form-container">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              .value="${this.formData.firstName}"
              @input="${this._handleInput}"
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              .value="${this.formData.lastName}"
              @input="${this._handleInput}"
              required
            />
          </label>

          <label>
            Date of Employment:
            <input
              type="date"
              name="dateOfEmployment"
              .value="${this.formData.dateOfEmployment}"
              @input="${this._handleInput}"
              required
            />
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              .value="${this.formData.dateOfBirth}"
              @input="${this._handleInput}"
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              .value="${this.formData.phoneNumber}"
              @input="${this._handleInput}"
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              .value="${this.formData.email}"
              @input="${this._handleInput}"
              required
            />
          </label>

          <label>
            Department:
            <select
              name="department"
              .value="${this.formData.department}"
              @change="${this._handleInput}"
              required
            >
              <option value="Analytics" ?selected="${this.formData.department === 'Analytics'}">
                Analytics
              </option>
              <option value="Tech" ?selected="${this.formData.department === 'Tech'}">
                Tech
              </option>
            </select>
          </label>

          <label>
            Position:
            <select
              name="position"
              .value="${this.formData.position}"
              @change="${this._handleInput}"
              required
            >
              <option value="Junior" ?selected="${this.formData.position === 'Junior'}">
                Junior
              </option>
              <option value="Medior" ?selected="${this.formData.position === 'Medior'}">
                Medior
              </option>
              <option value="Senior" ?selected="${this.formData.position === 'Senior'}">
                Senior
              </option>
            </select>
          </label>
        </div>
        <div class="form-btn-container">
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
        </div>
      </form>
    `;
  }
}

customElements.define('employee-add-edit', EmployeeAddEdit);
