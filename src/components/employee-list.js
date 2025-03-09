import {html, css, LitElement} from 'lit';
import {msg, str, updateWhenLocaleChanges} from '@lit/localize';
import {employeeService} from '../store.js';

export class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array, reflect: true},
    viewMode: {type: String, reflect: true},
    itemsPerPage: {type: Number, reflect: true},
    currentPage: {type: Number},
    editingEmployee: {type: Object},
    showConfirmModal: {type: Boolean},
    confirmMessage: {type: String},
    employeeToDelete: {type: Object},
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.employees = employeeService.getSnapshot().context.employees;
    this.viewMode = 'table';
    this.itemsPerPage = this.viewMode === 'table' ? 9 : 4;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
    this.editingEmployee = null;
    this.employeeToDelete = null;
  }

  _paginatedList() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  updated(changedVal) {
    if (changedVal.has('viewMode')) {
      this.itemsPerPage = this.viewMode === 'table' ? 9 : 4;
    }

    // commented out to use store subscription instead
    // else if (changedVal.has('editingEmployee')) {
    //   this.employees = employeeService.getSnapshot().context.employees;
    // }

    // handling an edge case here, if let's say list view is set to show 3 items per page, grid mod is set to show 1 item per page
    // what happens if the user switch back to list view at the last page of grid view?
    // so to handle this; set current page to total calculated page count (and if zero set to 1) if current page count is bigger
    // than total calc page count
    const totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = totalPages || 1;
    }
    this.totalPages = totalPages;
  }

  _changePage(page) {
    if (page !== '...' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.requestUpdate();
    }
  }

  _createPaginationButtons() {
    const buttons = [];
    const total = this.totalPages;

    if (total <= 3) {
      for (let i = 1; i <= total; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1); // first page btn is always visible

      if (this.currentPage <= 3) {
        // in the design i see 5 visible numbers of the pages but for this task i set
        buttons.push(2);
        buttons.push(3);
        if (total > 4) {
          buttons.push('...');
        }
      } else if (this.currentPage >= total - 2) {
        // ending adjustments
        buttons.push('...');
        buttons.push(total - 2);
        buttons.push(total - 1);
      } else {
        // dots, page, dots until ending
        buttons.push('...');
        buttons.push(this.currentPage);
        buttons.push('...');
      }

      // lst page btn is always visible
      buttons.push(total);
    }

    return buttons;
  }

  _handleEdit(employee) {
    this.editingEmployee = employee;
  }

  _handleDeleteWithConfirmation(employee) {
    this.confirmMessage = msg(
      str`Selected employee record of ${employee.firstName} ${employee.lastName} will be deleted.`
    );
    this.showConfirmModal = true;
    this.employeeToDelete = employee;
  }

  _onConfirm() {
    // this.employees = employeeService.getSnapshot().context.employees;
    // it is better to subscribe to the store since manual updating is just another cognitive load for us :)
    employeeService.send({
      type: 'DELETE_EMPLOYEE',
      employee: this.employeeToDelete,
    });
  }

  _onCancel() {
    this.showConfirmModal = false;
  }

  _handleEditFormSubmitted() {
    this.editingEmployee = null;
  }

  // sub to store to keep the component updated with the latest changes
  connectedCallback() {
    super.connectedCallback();
    this.subscription = employeeService.subscribe((state) => {
      this.employees = state.context.employees;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscription.unsubscribe();
  }

  static styles = css`
    :host {
      font-family: 'INGMe', serif;
      --primary-color: #ff6200;
      --secondary-color: #525199;
      --background-color: #f9f9f9;
      --border-color: #f1f1f1;
      --shadow-color: rgba(0, 0, 0, 0.1);
      --text-bold: bold;

      display: block;
    }

    .container {
      padding: 20px;
      background: var(--background-color);
      border-radius: 10px;
    }

    .title-view-mode-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    h2 {
      color: var(--primary-color);
    }

    .view-toggle button {
      background: none;
      border: 0;
      cursor: pointer;
      border-radius: 5px;
      color: var(--primary-color);
      padding: 0;
    }

    .view-toggle button.active svg {
      stroke-width: 3px;
    }

    .table-container {
      background: white;
      padding: 20px 0;
      /* box-shadow: 0 2px 10px var(--shadow-color); */
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      font-size: 14px;
      padding: 10px;
      text-align: center;
    }

    td:nth-child(1),
    td:nth-child(2) {
      font-weight: var(--text-bold);
    }

    tr {
      border-bottom: 1px solid var(--border-color);
    }

    th {
      background: white;
      color: var(--primary-color);
      text-align: center;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 25px;
    }

    tr:last-child {
      border: 0;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      row-gap: 30px;
      column-gap: 80px;
    }

    .card {
      background: white;
      padding: 15px;
      box-shadow: 0 2px 2px var(--shadow-color);
    }

    .card-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .card-actions.grid {
      justify-content: start;
      gap: 16px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .label {
      font-size: 12px;
      color: gray;
      font-weight: 500;
      margin: 0;
    }

    .label + p {
      margin: 4px 0;
    }

    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      gap: 10px;
    }

    .pagination button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    .pagination button.active {
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-button {
      background: none;
      border: none;
      cursor: pointer;
    }

    .icon-button.grid {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: var(--secondary-color);
      color: white;
      padding: 8px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 12px;

      svg {
        stroke: white;
      }
    }

    .icon-button.orange {
      background-color: var(--primary-color);
    }

    .icon-button svg {
      width: 20px;
      height: 20px;
      stroke: var(--primary-color);
    }

    .pagination-button svg {
      stroke: #c7c7c7;
    }

    .pagination-button.enabled svg {
      stroke: var(--primary-color);
    }

    @media (max-width: 768px) {
      .grid-container {
        column-gap: 20px;
        row-gap: 20px;
      }

      .table-container {
        overflow-x: auto;
      }

      .container {
        padding: 10px;
      }

      table th,
      table td {
        padding: 5px;
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .grid-container {
        grid-template-columns: 1fr;
        column-gap: 10px;
        row-gap: 10px;
      }

      .view-toggle {
        flex-direction: column;
        gap: 10px;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        ${!this.editingEmployee
          ? html`
              <div class="title-view-mode-container">
                <h2>${msg(html`Employee List`)}</h2>
                <div class="view-toggle">
                  <button
                    @click="${() => (this.viewMode = 'table')}"
                    class="${this.viewMode === 'table' ? 'active' : ''}"
                  >
                    ${this.renderTableViewIcon()}
                  </button>
                  <button
                    @click="${() => (this.viewMode = 'grid')}"
                    class="${this.viewMode === 'grid' ? 'active' : ''}"
                  >
                    ${this.renderGridViewIcon()}
                  </button>
                </div>
              </div>
            `
          : ''}
        ${this.editingEmployee
          ? html`
              <employee-add-edit
                .employee="${this.editingEmployee}"
                @employee-list-updated="${this._handleEditFormSubmitted}"
                @employee-cancel-edit="${this._handleEditFormSubmitted}"
              ></employee-add-edit>
            `
          : this.viewMode === 'table'
          ? html`
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>${msg(html`First Name`)}</th>
                      <th>${msg(html`Last Name`)}</th>
                      <th>${msg(html`Date of Employment`)}</th>
                      <th>${msg(html`Date of Birth`)}</th>
                      <th>${msg(html`Phone`)}</th>
                      <th>${msg(html`Email`)}</th>
                      <th>${msg(html`Department`)}</th>
                      <th>${msg(html`Position`)}</th>
                      <th>${msg(html`Actions`)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this._paginatedList().map(
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
                            <button
                              class="icon-button"
                              @click="${() => this._handleEdit(e)}"
                            >
                              ${this.renderEditIcon()}
                            </button>
                            <button
                              class="icon-button"
                              @click="${() =>
                                this._handleDeleteWithConfirmation(e)}"
                            >
                              ${this.renderDeleteIcon()}
                            </button>
                          </td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              </div>
            `
          : html`
              <div class="grid-container">
                ${this._paginatedList().map(
                  (e) => html`
                    <div class="card">
                      <div class="card-content">
                        <div class="info-grid">
                          <div>
                            <p class="label">${msg(html`First Name`)}</p>
                            <p><strong>${e.firstName}</strong></p>
                          </div>
                          <div>
                            <p class="label">${msg(html`Last Name`)}</p>
                            <p><strong>${e.lastName}</strong></p>
                          </div>
                          <div>
                            <p class="label">
                              ${msg(html`Date of Employment`)}
                            </p>
                            <p><strong>${e.dateOfEmployment}</strong></p>
                          </div>
                          <div>
                            <p class="label">${msg(html`Date of Birth`)}</p>
                            <p><strong>${e.dateOfBirth}</strong></p>
                          </div>
                          <div>
                            <p class="label">${msg(html`Phone`)}</p>
                            <p><strong>${e.phoneNumber}</strong></p>
                          </div>
                          <div>
                            <p class="label">${msg(html`Email`)}</p>
                            <p><strong>${e.email}</strong></p>
                          </div>
                          <div>
                            <p class="label">${msg(html`Department`)}</p>
                            <p><strong>${e.department}</strong></p>
                          </div>
                          <div>
                            <p class="label">${msg(html`Position`)}</p>
                            <p><strong>${e.position}</strong></p>
                          </div>
                        </div>
                      </div>
                      <div class="card-actions grid">
                        <button
                          class="icon-button grid"
                          @click="${() => this._handleEdit(e)}"
                        >
                          ${this.renderEditIcon()} ${msg(html`Edit`)}
                        </button>
                        <button
                          class="icon-button grid orange"
                          @click="${() =>
                            this._handleDeleteWithConfirmation(e)}"
                        >
                          ${this.renderDeleteIcon()} ${msg(html`Delete`)}
                        </button>
                      </div>
                    </div>
                  `
                )}
              </div>
            `}
        ${!this.editingEmployee
          ? html`
              <div class="pagination">
                <button
                  class="pagination-button enabled"
                  @click="${() => this._changePage(this.currentPage - 1)}"
                  ?disabled="${this.currentPage === 1}"
                >
                  ${this.renderChevronLeftIcon()}
                </button>
                ${this._createPaginationButtons().map(
                  (page) => html`
                    ${page === '...'
                      ? html`<span class="dots">...</span>`
                      : html`
                          <button
                            class="${this.currentPage === page ? 'active' : ''}"
                            @click="${() => this._changePage(page)}"
                          >
                            ${page}
                          </button>
                        `}
                  `
                )}
                <button
                  @click="${() => this._changePage(this.currentPage + 1)}"
                  ?disabled="${this.currentPage * this.itemsPerPage >=
                  this.employees.length}"
                >
                  ${this.renderChevronRightIcon()}
                </button>
              </div>
            `
          : ''}
      </div>
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

  renderEditIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-square-pen"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path
          d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
        />
      </svg>
    `;
  }

  renderDeleteIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-trash"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    `;
  }

  renderGridViewIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-grip"
      >
        <circle cx="12" cy="5" r="1" />
        <circle cx="19" cy="5" r="1" />
        <circle cx="5" cy="5" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="19" cy="19" r="1" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    `;
  }

  renderTableViewIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-align-justify"
      >
        <path d="M3 12h18" />
        <path d="M3 18h18" />
        <path d="M3 6h18" />
      </svg>
    `;
  }

  renderChevronLeftIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-left"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    `;
  }

  renderChevronRightIcon() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-right"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
