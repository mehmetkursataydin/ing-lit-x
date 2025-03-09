import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {EmployeeList} from '../src/components/employee-list.js';
import {employeeService} from '../src/store.js';

suite('employee-list', () => {
  let dummyEmployees;
  let originalGetSnapshot, originalSubscribe, originalSend;
  let unsubscribeCalled;
  let fakeSubscription;

  setup(() => {
    dummyEmployees = [
      {
        firstName: 'Ahmet',
        lastName: 'Sourtimes',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phoneNumber: '1111111111',
        email: 'ahmet@sourtimes.com',
        department: 'Analytics',
        position: 'Junior',
      },
      {
        firstName: 'Hasan',
        lastName: 'Sweettimes',
        dateOfEmployment: '2021-02-01',
        dateOfBirth: '1991-02-01',
        phoneNumber: '2222222222',
        email: 'hasan@sweettimes.com',
        department: 'Tech',
        position: 'Senior',
      },
      {
        firstName: 'Veli',
        lastName: 'Bittertimes',
        dateOfEmployment: '2019-03-01',
        dateOfBirth: '1989-03-01',
        phoneNumber: '3333333333',
        email: 'veli@bittertimes.com',
        department: 'Analytics',
        position: 'Medior',
      },
      {
        firstName: 'Dave',
        lastName: 'Unforgettabletimes',
        dateOfEmployment: '2018-04-01',
        dateOfBirth: '1988-04-01',
        phoneNumber: '4444444444',
        email: 'dave@unforgettabletimes.com',
        department: 'Tech',
        position: 'Junior',
      },
    ];

    // keeping the original methods
    originalGetSnapshot = employeeService.getSnapshot;
    originalSubscribe = employeeService.subscribe;
    originalSend = employeeService.send;

    // override getSnapshot to return fake data
    employeeService.getSnapshot = () => ({
      context: {employees: dummyEmployees},
    });

    // Set up a fake subscription that lets us detect when unsubscribe is called.
    unsubscribeCalled = false;
    fakeSubscription = {
      unsubscribe: () => {
        unsubscribeCalled = true;
      },
    };
    employeeService.subscribe = (callback) => {
      callback({context: {employees: dummyEmployees}});
      return fakeSubscription;
    };

    // some simple overrides for assertion later
    employeeService.send = (payload) => {
      employeeService.sendPayload = payload;
    };
    employeeService.sendPayload = null;
  });

  teardown(() => {
    employeeService.getSnapshot = originalGetSnapshot;
    employeeService.subscribe = originalSubscribe;
    employeeService.send = originalSend;
  });

  test('is defined', () => {
    const el = document.createElement('employee-list');
    assert.instanceOf(el, EmployeeList);
  });

  test('renders header and view toggle in table view', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const header = el.shadowRoot.querySelector('.title-view-mode-container h2');
    assert.include(header.textContent, 'Employee List');

    const viewToggle = el.shadowRoot.querySelector('.view-toggle');
    assert.exists(viewToggle);

    const tableContainer = el.shadowRoot.querySelector('.table-container');
    assert.exists(tableContainer);
  });

  test('renders table view with correct number of rows', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const tbodyRows = el.shadowRoot.querySelectorAll('table tbody tr');
    assert.equal(tbodyRows.length, dummyEmployees.length);
  });

  test('renders grid view when toggled', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const gridButton = el.shadowRoot.querySelector(
      '.view-toggle button:nth-child(2)'
    );
    gridButton.click();
    await el.updateComplete;

    const gridContainer = el.shadowRoot.querySelector('.grid-container');
    assert.exists(gridContainer);
  });

  test('pagination buttons are created correctly', async () => {
    dummyEmployees = [];
    for (let i = 1; i <= 15; i++) {
      dummyEmployees.push({
        firstName: `First${i}`,
        lastName: `Last${i}`,
        dateOfEmployment: `2020-01-${i < 10 ? '0' + i : i}`,
        dateOfBirth: `1990-01-${i < 10 ? '0' + i : i}`,
        phoneNumber: '000000000' + i,
        email: `test${i}@test.com`,
        department: 'Analytics',
        position: 'Junior',
      });
    }
    employeeService.getSnapshot = () => ({
      context: {employees: dummyEmployees},
    });
    const el = await fixture(html` <employee-list></employee-list>`);
    await el.updateComplete;
    // itemsPerPage is 9, total pages = ceil(15 / 9) = 2
    assert.equal(el.totalPages, 2);

    const paginationButtons =
      el.shadowRoot.querySelectorAll('.pagination button');
    //  left arrow, page numbers, right arrow 4 buttons
    assert.isAtLeast(paginationButtons.length, 4);
  });

  test('changes page when pagination button is clicked', async () => {
    dummyEmployees = [];
    for (let i = 1; i <= 15; i++) {
      dummyEmployees.push({
        firstName: `First${i}`,
        lastName: `Last${i}`,
        dateOfEmployment: `2020-01-${i < 10 ? '0' + i : i}`,
        dateOfBirth: `1990-01-${i < 10 ? '0' + i : i}`,
        phoneNumber: '000000000' + i,
        email: `test${i}@test.com`,
        department: 'Analytics',
        position: 'Junior',
      });
    }
    employeeService.getSnapshot = () => ({
      context: {employees: dummyEmployees},
    });
    const el = await fixture(html` <employee-list></employee-list>`);
    await el.updateComplete;
    // default current page is 1
    assert.equal(el.currentPage, 1);

    // get next pagination button for page "2"
    const page2Button = Array.from(
      el.shadowRoot.querySelectorAll('.pagination button')
    ).find((btn) => btn.textContent.trim() === '2');
    page2Button.click();
    await el.updateComplete;
    assert.equal(el.currentPage, 2);
  });

  test('handles edit action', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const editButton = el.shadowRoot.querySelector(
      '.table-container table tbody tr button.icon-button'
    );
    editButton.click();
    await el.updateComplete;
    assert.isNotNull(el.editingEmployee);
    // edit form should be visible
    const editForm = el.shadowRoot.querySelector('employee-add-edit');
    assert.exists(editForm);
  });

  test('handles delete with confirmation', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const actionButtons = el.shadowRoot.querySelectorAll(
      '.table-container table tbody tr button.icon-button'
    );
    const deleteButton = actionButtons[1];
    deleteButton.click();
    await el.updateComplete;
    assert.isTrue(el.showConfirmModal);
    assert.isNotNull(el.employeeToDelete);
    assert.include(el.confirmMessage, el.employeeToDelete.firstName);
  });

  test('on confirm delete, sends DELETE_EMPLOYEE action', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const actionButtons = el.shadowRoot.querySelectorAll(
      '.table-container table tbody tr button.icon-button'
    );
    const deleteButton = actionButtons[1];
    deleteButton.click();
    await el.updateComplete;
    const confirmModal = el.shadowRoot.querySelector('confirmation-modal');
    confirmModal.dispatchEvent(new CustomEvent('confirm', {bubbles: true}));
    await el.updateComplete;
    assert.equal(employeeService.sendPayload.type, 'DELETE_EMPLOYEE');
    assert.deepEqual(employeeService.sendPayload.employee, el.employeeToDelete);
  });

  test('on cancel delete, confirmation modal is hidden', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const actionButtons = el.shadowRoot.querySelectorAll(
      '.table-container table tbody tr button.icon-button'
    );
    const deleteButton = actionButtons[1];
    deleteButton.click();
    await el.updateComplete;
    const confirmModal = el.shadowRoot.querySelector('confirmation-modal');
    confirmModal.dispatchEvent(new CustomEvent('cancel', {bubbles: true}));
    await el.updateComplete;
    assert.isFalse(el.showConfirmModal);
  });

  test('unsubscribes from employeeService on disconnect', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    el.remove();
    assert.isTrue(unsubscribeCalled);
  });

  test('updates currentPage to 1 if employees array is empty', async () => {
    dummyEmployees = [];
    employeeService.getSnapshot = () => ({
      context: {employees: dummyEmployees},
    });
    const el = await fixture(html` <employee-list></employee-list>`);
    await el.updateComplete;
    assert.equal(el.currentPage, 1);
    assert.equal(el.totalPages, 0);
  });

  test('updates itemsPerPage when viewMode changes', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    assert.equal(el.itemsPerPage, 9);
    el.viewMode = 'grid';
    await el.updateComplete;
    assert.equal(el.itemsPerPage, 4);
  });

  test('does not change currentPage when _changePage is called with "..."', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const currentPageBefore = el.currentPage;
    el._changePage('...');
    await el.updateComplete;
    assert.equal(el.currentPage, currentPageBefore);
  });

  test('left arrow pagination button is disabled on first page', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    await el.updateComplete;
    const leftButton = el.shadowRoot.querySelector(
      '.pagination button:nth-child(1)'
    );
    assert.isTrue(leftButton.disabled);
  });

  test('right arrow pagination button is disabled on last page', async () => {
    dummyEmployees = [];
    for (let i = 1; i <= 10; i++) {
      dummyEmployees.push({
        firstName: `First${i}`,
        lastName: `Last${i}`,
        dateOfEmployment: `2020-01-${i < 10 ? '0' + i : i}`,
        dateOfBirth: `1990-01-${i < 10 ? '0' + i : i}`,
        phoneNumber: '000000000' + i,
        email: `test${i}@test.com`,
        department: 'Analytics',
        position: 'Junior',
      });
    }
    employeeService.getSnapshot = () => ({
      context: {employees: dummyEmployees},
    });
    const el = await fixture(html` <employee-list></employee-list>`);
    await el.updateComplete;
    el.currentPage = el.totalPages;
    await el.updateComplete;
    const paginationButtons =
      el.shadowRoot.querySelectorAll('.pagination button');
    const rightButton = paginationButtons[paginationButtons.length - 1];
    assert.isTrue(rightButton.disabled);
  });

  test('renders employee-add-edit component when editingEmployee is set and hides view toggle', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    el.editingEmployee = dummyEmployees[0];
    await el.updateComplete;
    const editForm = el.shadowRoot.querySelector('employee-add-edit');
    assert.exists(editForm);
    const titleContainer = el.shadowRoot.querySelector(
      '.title-view-mode-container'
    );
    assert.notExists(titleContainer);
  });

  test('updates employees property using getSnapshot', async () => {
    const el = await fixture(html` <employee-list></employee-list>`);
    const newEmployees = [
      {
        firstName: 'Test',
        lastName: 'Employee',
        dateOfEmployment: '2022-01-01',
        dateOfBirth: '2000-01-01',
        phoneNumber: '5555555555',
        email: 'test@test.com',
        department: 'Tech',
        position: 'Medior',
      },
    ];
    employeeService.getSnapshot = () => ({context: {employees: newEmployees}});
    el.employees = employeeService.getSnapshot().context.employees;
    await el.updateComplete;
    assert.deepEqual(el.employees, newEmployees);
  });
});
