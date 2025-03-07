import {html, LitElement} from 'lit';
import {employeeService} from '../store.js';

class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Object},
    viewMode: 'list'
  };

  constructor() {
    super();
    this.employees = employeeService.getSnapshot().context.employees ;
    // console.log(this.employees)
  }

  render() {
    return html`
      <div>
        <input
          type="text"
          placeholder="search"
        />
        <button @click="${() => (this.viewMode = 'list')}">List</button>
        <button @click="${() => (this.viewMode = 'table')}">Table</button>
      </div>

      <table>
        <thead>
        <tr>
          <th>firstName</th>
          <th>lastName</th>
          <th>dateOfEmployment</th>
          <th>dateOfBirth</th>
          <th>phoneNumber</th>
          <th>emailAddress</th>
          <th>department</th>
          <th>position</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        ${this.employees.map(
          (e) => html`
            <tr>
              <td>${e.firstName}</td>
              <td>${e.lastName}</td>
              <td>${e.dateOfEmployment}</td>
              <td>${e.dateOfBirth}</td>
              <td>${e.phoneNumber}</td>
              <td>${e.email}</td>
              <td>${e.department}</td>

              <td>${e.position}</td>
              <td>
                <button >
                  ed
                </button>
                <button >
                  ad
                </button>
              </td>
            </tr>
          `,
        )}
        </tbody>
      </table>

      <div>
<!--pagination btns -->
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);