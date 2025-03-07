import { Router } from '@vaadin/router';
import './components/nav-top.js';
import './components/employee-add-edit.js';
import './components/employee-list.js'

const router = new Router(document.getElementById('outlet'));

router.setRoutes([
  { path: '/', component:'employee-list' },
  { path: '/list', component: 'employee-list' },
  { path: '/add', component: 'employee-add-edit' },
  { path: '/edit/:id', component: 'employee-add-edit' }
]);

window.addEventListener('employee-added', () => {
  router.render('/list');
});

