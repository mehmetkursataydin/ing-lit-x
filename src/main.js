import {Router} from '@vaadin/router';
import './components/nav-top.js';
import './components/employee-add-edit.js';
import './components/employee-list.js';
import {configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from './generated/locale-codes.js';
import {employeeService} from './store.js';

const storeSnapshot = employeeService.getSnapshot().context.language;

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`/dev/generated/locales/${locale}.js`),
});
const htmlLang = storeSnapshot ?? document.documentElement.lang ?? sourceLocale;
await setLocale(htmlLang);

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

window.addEventListener('locale-changed', async (e) => {
  const language = e.detail;
  if (language === 'en') {
    await setLocale('tr');
    employeeService.send({type: 'CHANGE_LANGUAGE', language: 'tr'});
  } else {
    await setLocale('en');
    employeeService.send({type: 'CHANGE_LANGUAGE', language: 'en'});
  }
});
