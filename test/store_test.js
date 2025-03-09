import { assert } from '@open-wc/testing';
import { createActor } from 'xstate';
import {sourceLocale} from '../dev/generated/locale-codes.js';
import {employeeMachine} from '../dev/src/store.js';

suite('employeeMachine', () => {
  let service;

  setup(() => {
    localStorage.clear();
    // creating a new store service
    service = createActor(employeeMachine).start();
  });

  teardown(() => {
    service.stop();
  });

  test('initial context has empty employees and default language', () => {
    const snapshot = service.getSnapshot();
    assert.deepEqual(snapshot.context.employees, []);
    assert.equal(snapshot.context.language, sourceLocale || 'en');
  });

  test('ADD_EMPLOYEE adds an employee when not duplicate', () => {
    const newEmployee = {
      phoneNumber: '123',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
    };

    service.send({ type: 'ADD_EMPLOYEE', employee: newEmployee });
    const snapshot = service.getSnapshot();
    assert.deepEqual(snapshot.context.employees, [newEmployee]);

    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    assert.deepEqual(storedEmployees, [newEmployee]);
  });

  test('ADD_EMPLOYEE does not add a duplicate employee', () => {
    const employee1 = {
      phoneNumber: '123',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
    };
    service.send({ type: 'ADD_EMPLOYEE', employee: employee1 });

    const duplicateEmployee = {
      phoneNumber: '123',
      email: 'test2@test.com',
      firstName: 'Test2',
      lastName: 'User2',
    };
    service.send({ type: 'ADD_EMPLOYEE', employee: duplicateEmployee });
    const snapshot = service.getSnapshot();
    assert.deepEqual(snapshot.context.employees, [employee1]);
  });

  test('EDIT_EMPLOYEE updates an existing employee', () => {
    const employee1 = {
      phoneNumber: '123',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
    };
    service.send({ type: 'ADD_EMPLOYEE', employee: employee1 });

    const updatedEmployee = {
      phoneNumber: '123',
      email: 'test@test.com',
      firstName: 'Updated',
      lastName: 'User',
    };
    service.send({ type: 'EDIT_EMPLOYEE', employee: updatedEmployee });
    const snapshot = service.getSnapshot();
    assert.deepEqual(snapshot.context.employees, [updatedEmployee]);

    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    assert.deepEqual(storedEmployees, [updatedEmployee]);
  });

  test('DELETE_EMPLOYEE removes an employee', () => {
    const employee1 = {
      phoneNumber: '123',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
    };
    service.send({ type: 'ADD_EMPLOYEE', employee: employee1 });

    service.send({ type: 'DELETE_EMPLOYEE', employee: employee1 });
    const snapshot = service.getSnapshot();
    assert.deepEqual(snapshot.context.employees, []);

    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    assert.deepEqual(storedEmployees, []);
  });

  test('CHANGE_LANGUAGE updates language in context and localStorage', () => {
    service.send({ type: 'CHANGE_LANGUAGE', language: 'tr' });
    const snapshot = service.getSnapshot();
    assert.equal(snapshot.context.language, 'tr');

    const storedLanguage = JSON.parse(localStorage.getItem('language'));
    assert.equal(storedLanguage, 'tr');
  });
});
