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
              console.log('c', context);
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
                e.id === event.employee.id ? event.employee : e
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
                (emp) => emp.id !== event.id
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
