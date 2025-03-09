import {createMachine, createActor, assign} from 'xstate';
import {sourceLocale} from './generated/locale-codes.js';

const getStoredLocalStorageData = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const employeeMachine = createMachine({
  id: 'employee',
  context: {
    employees: getStoredLocalStorageData('employees', []),
    language: getStoredLocalStorageData('language', sourceLocale || 'en'),
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        ADD_EMPLOYEE: {
          actions: assign({
            employees: ({context, event}) => {
              // duplicate entry check
              const duplicate = context.employees.find(
                (e) =>
                  e.phoneNumber === event.employee.phoneNumber ||
                  e.email === event.employee.email
              );
              if (duplicate) {
                // duplicate found, could throw an event to handle the error from the component maybe or
                // there might be a better solution to handle this but it requires xstate research :)
                return context.employees;
              }
              const newEmployees = [...context.employees, event.employee];
              localStorage.setItem('employees', JSON.stringify(newEmployees));
              return newEmployees;
            },
          }),
        },
        EDIT_EMPLOYEE: {
          actions: assign({
            employees: ({context, event}) => {
              const newEmployees = context.employees.map((e) =>
                e.phoneNumber === event.employee.phoneNumber ||
                e.email === event.employee.email
                  ? event.employee
                  : e
              );
              localStorage.setItem('employees', JSON.stringify(newEmployees));
              return newEmployees;
            },
          }),
        },
        DELETE_EMPLOYEE: {
          actions: assign({
            employees: ({context, event}) => {
              const newEmployees = context.employees.filter(
                (e) => e.phoneNumber !== event.employee.phoneNumber
              );
              localStorage.setItem('employees', JSON.stringify(newEmployees));
              return newEmployees;
            },
          }),
        },
        CHANGE_LANGUAGE: {
          actions: assign({
            language: ({event}) => {
              localStorage.setItem('language', JSON.stringify(event.language));
              return event.language;
            },
          }),
        },
      },
    },
  },
});

export const employeeService = createActor(employeeMachine).start();
