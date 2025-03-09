import { createMachine, createActor, assign } from 'xstate';

const getStoredLocalStorageData = () => {
  const data = localStorage.getItem('employees');
  return data ? JSON.parse(data) : [];
};

const employeeMachine = createMachine({
  id: 'employee',
  context: {
    employees: getStoredLocalStorageData(),
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        ADD_EMPLOYEE: {
          actions: assign({
            employees: ({context, event}) => {
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
                (e.phoneNumber === event.employee.phoneNumber || e.email === event.employee.email) ? event.employee : e
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
      },
    },
  },
});

export const employeeService = createActor(employeeMachine).start();
