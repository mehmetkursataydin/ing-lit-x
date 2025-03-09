import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import {NavTop} from '../src/components/nav-top.js';
import {getLocale} from '../src/main.js';

suite('nav-top', () => {
  test('is defined', () => {
    const el = document.createElement('nav-top');
    assert.instanceOf(el, NavTop);
  });

  test('renders nav logo and navigation links', async () => {
    const el = await fixture(html`<nav-top></nav-top>`);
    const shadow = el.shadowRoot;

    const nav = shadow.querySelector('nav');
    assert.exists(nav, 'nav element exists');

    const logo = shadow.querySelector('a.nav-logo');
    assert.exists(logo, 'logo anchor exists');
    assert.equal(logo.getAttribute('href'), '/', 'logo has correct href');
    assert.include(logo.textContent, 'ING');

    const listLink = shadow.querySelector('a[href="/list"]');
    assert.exists(listLink, 'Employee List link exists');
    assert.include(listLink.textContent, 'Employee List');

    const addLink = shadow.querySelector('a[href="/add"]');
    assert.exists(addLink, 'Add Employee link exists');
    assert.include(addLink.textContent, 'Add Employee');

    const langButton = shadow.querySelector('button');
    assert.exists(langButton, 'Language change button exists');
    const flagSvg = langButton.querySelector('svg');
    assert.exists(flagSvg, 'Flag SVG exists in the button');
  });

  test('dispatches locale-changed event on language button click', async () => {
    const el = await fixture(html`<nav-top></nav-top>`);
    const shadow = el.shadowRoot;
    const langButton = shadow.querySelector('button');

    setTimeout(() => langButton.click());
    const event = await oneEvent(el, 'locale-changed');

    const expectedLocale = getLocale();
    assert.equal(event.detail, expectedLocale);
  });
});
