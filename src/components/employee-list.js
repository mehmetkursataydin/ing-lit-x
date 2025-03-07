import { html, css, LitElement } from 'lit';
import { employeeService } from '../store.js';

class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String }
  };

  constructor() {
    super();
    this.employees = employeeService.getSnapshot().context.employees;
    this.viewMode = 'table';
  }

  static styles = css`
      :host {
          display: block;
          font-family: Arial, sans-serif;
      }

      .container {
          padding: 20px;
          background: #f9f9f9;
          border-radius: 10px;
      }

      h2 {
          color: #ff6600;
          margin-bottom: 20px;
      }

      .table-container {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      table {
          width: 100%;
          border-collapse: collapse;
      }

      th, td {
          padding: 10px;
          text-align: left;
      }

      th {
          background: #f2f2f2;
          color: #ff6600;
      }

      tr:nth-child(even) {
          background: #f9f9f9;
      }

      .actions button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
      }

      .edit {
          color: #ff6600;
      }

      .delete {
          color: red;
      }

      .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
      }

      .pagination button.active {
          background: #ff6600;
          color: white;
          border: none;
          padding: 5px 10px;
          margin: 0 5px;
          border-radius: 100%;
          cursor: pointer;
          height: 26px;
          width: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .pagination button {
          background: transparent;
          border: 0;
      }

      .title-view-mode-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
  `;

  render() {
    return html`
      <div class="container">
        <div class="title-view-mode-container">
          <h2>Employee List</h2>
          <div>
            <!--            todo style buttons, add search-->
            <input
              type="text"
              placeholder="search"
            />
            <button @click="${() => (this.viewMode = 'list')}">List</button>
            <button @click="${() => (this.viewMode = 'table')}">Table</button>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
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
                  <td class="actions">
                    <button class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                  </td>
                </tr>
              `
            )}
            </tbody>
          </table>
        </div>
        <!--        todo styling could be improved for pagination-->
        <div class="pagination">
          <button>&lt;</button>
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>&gt;</button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
