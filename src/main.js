import {Router} from '@vaadin/router';
import './components/nav-top.js';
import './components/employee-add-edit.js';
import './components/employee-list.js';

const router = new Router(document.getElementById('outlet'));

router.setRoutes([
  {path: '/', component: 'employee-list'},
  {path: '/list', component: 'employee-list'},
  {path: '/add', component: 'employee-add-edit'},
  {path: '/edit/:phoneNumber', component: 'employee-add-edit'},
]);

window.addEventListener('employee-list-updated', () => {
  router.render('/list');
});

window.addEventListener('employee-edit', (e) => {
  const employee = e.detail;
  router.render(`/edit/${employee.phoneNumber}`, true);
});

window.addEventListener('employee-cancel-edit', () => {
  router.render('/', true);
});
