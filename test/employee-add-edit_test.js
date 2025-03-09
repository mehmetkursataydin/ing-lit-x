import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import {EmployeeAddEdit} from '../dev/src/components/employee-add-edit.js';
import {employeeService} from '../dev/src/store.js';

suite('employee-add-edit', () => {
  let sendPayload;
  const originalSend = employeeService.send;

  setup(() => {
    sendPayload = null;
    // overridin g employeeService.send so we grab its payload
    employeeService.send = (payload) => {
      sendPayload = payload;
    };
  });

  teardown(() => {
    employeeService.send = originalSend;
  });

  test('is defined', () => {
    const el = document.createElement('employee-add-edit');
    assert.instanceOf(el, EmployeeAddEdit);
  });

  test('renders add form by default', async () => {
    const el = await fixture(html`<employee-add-edit></employee-add-edit>`);
    const header = el.shadowRoot.querySelector('h2');
    assert.include(header.textContent, 'Add Employee');
    const saveButton = el.shadowRoot.querySelector('button[type="submit"]');
    assert.exists(saveButton);
  });

  test('updates formData on input change', async () => {
    const el = await fixture(html`<employee-add-edit></employee-add-edit>`);
    const firstNameInput = el.shadowRoot.querySelector('input[name="firstName"]');
    firstNameInput.value = 'Ahmet';
    firstNameInput.dispatchEvent(new Event('input'));
    await el.updateComplete;
    assert.equal(el.formData.firstName, 'Ahmet');
  });

  test('submits add form without confirmation', async () => {
    const el = await fixture(html`<employee-add-edit></employee-add-edit>`);
    const fields = [
      { name: 'firstName', value: 'Ahmet' },
      { name: 'lastName', value: 'Sourtimes' },
      { name: 'dateOfEmployment', value: '2025-01-01' },
      { name: 'dateOfBirth', value: '1990-01-01' },
      { name: 'phoneNumber', value: '1234567890' },
      { name: 'email', value: 'ahmet@sourtimes.com' },
    ];
    fields.forEach(({ name, value }) => {
      const input = el.shadowRoot.querySelector(`input[name="${name}"]`);
      input.value = value;
      input.dispatchEvent(new Event('input'));
    });

    const form = el.shadowRoot.querySelector('form');
    setTimeout(() => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    const updateEvent = await oneEvent(el, 'employee-list-updated');
    assert.exists(updateEvent);
    assert.equal(sendPayload.type, 'ADD_EMPLOYEE');
    assert.deepEqual(sendPayload.employee, el.formData);
  });

  test('renders edit form when employee property is set', async () => {
    const employee = {
      firstName: 'Ahmet',
      lastName: 'Sourtimes',
      dateOfEmployment: '2020-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '5555555555',
      email: 'ahmet@sourtimes.com',
      department: 'Analytics',
      position: 'Junior',
    };
    const el = await fixture(html`<employee-add-edit .employee=${employee}></employee-add-edit>`);
    await el.updateComplete;
    const header = el.shadowRoot.querySelector('h2');
    assert.include(header.textContent, 'Edit Employee');
    const editInfo = el.shadowRoot.querySelector('.title-edit-form strong');
    assert.exists(editInfo);
    assert.include(editInfo.textContent, employee.firstName);
  });

  test('submits edit form and shows confirmation modal', async () => {
    const employee = {
      firstName: 'Ahmet',
      lastName: 'Sourtimes',
      dateOfEmployment: '2020-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '5555555555',
      email: 'ahmet@sourtimes.com',
      department: 'Analytics',
      position: 'Junior',
    };
    const el = await fixture(html`<employee-add-edit .employee=${employee}></employee-add-edit>`);
    await el.updateComplete;
    // trigger confirmation in edit moode
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;
    assert.isTrue(el.showConfirmModal);
    assert.include(el.confirmMessage, employee.firstName);
  });

  test('handles confirm in edit mode', async () => {
    const employee = {
      firstName: 'Ahmet',
      lastName: 'Sourtimes',
      dateOfEmployment: '2020-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '5555555555',
      email: 'ahmet@sourtimes.com',
      department: 'Analytics',
      position: 'Junior',
    };
    const el = await fixture(html`<employee-add-edit .employee=${employee}></employee-add-edit>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;
    const confirmModal = el.shadowRoot.querySelector('confirmation-modal');
    // confirm simulation
    setTimeout(() => confirmModal.dispatchEvent(new CustomEvent('confirm', { bubbles: true })));
    const updateEvent = await oneEvent(el, 'employee-list-updated');
    await el.updateComplete;
    assert.equal(sendPayload.type, 'EDIT_EMPLOYEE');
    // edit mode should be disabled now after confirmation
    assert.isFalse(el.isEdit);
    assert.exists(updateEvent);
  });

  test('handles cancel in confirmation modal', async () => {
    const employee = {
      firstName: 'Ahmet',
      lastName: 'Sourtimes',
      dateOfEmployment: '2020-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '5555555555',
      email: 'ahmet@sourtimes.com',
      department: 'Analytics',
      position: 'Junior',
    };
    const el = await fixture(html`<employee-add-edit .employee=${employee}></employee-add-edit>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;
    const confirmModal = el.shadowRoot.querySelector('confirmation-modal');
    confirmModal.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
    await el.updateComplete;
    assert.isFalse(el.showConfirmModal);
  });

  test('dispatches employee-cancel-edit when cancel button is clicked', async () => {
    const el = await fixture(html`<employee-add-edit></employee-add-edit>`);
    const cancelButton = el.shadowRoot.querySelector('button.cancel');
    setTimeout(() => cancelButton.click());
    const event = await oneEvent(el, 'employee-cancel-edit');
    assert.exists(event);
  });
});
