import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import {ConfirmationModal} from '../dev/src/components/confirmation-modal.js';

suite('confirmation-modal', () => {
  test('is defined', () => {
    const el = document.createElement('confirmation-modal');
    assert.instanceOf(el, ConfirmationModal);
  });

  test('does not display modal when not visible', async () => {
    const el = await fixture(html`<confirmation-modal></confirmation-modal>`);
    const style = getComputedStyle(el);
    assert.equal(style.display, 'none');
  });

  test('displays modal when visible attr is set', async () => {
    const el = await fixture(html`<confirmation-modal visible></confirmation-modal>`);
    const style = getComputedStyle(el);
    assert.equal(style.display, 'flex');
    const h2 = el.shadowRoot.querySelector('h2');
    // Default title text should be "Are you sure?"
    assert.equal(h2.textContent.trim(), 'Are you sure?');
  });

  test('renders custom message', async () => {
    const customMessage = 'Do you really want to delete?';
    const el = await fixture(
      html`<confirmation-modal visible message="${customMessage}"></confirmation-modal>`
    );
    const p = el.shadowRoot.querySelector('p');
    assert.equal(p.textContent.trim(), customMessage);
  });

  test('dispatches confirm event when confirm button is clicked', async () => {
    const el = await fixture(html`<confirmation-modal visible></confirmation-modal>`);
    // Trigger a click on the confirm button.
    setTimeout(() => {
      const confirmBtn = el.shadowRoot.querySelector('button.confirm');
      confirmBtn.click();
    }, 0);
    const event = await oneEvent(el, 'confirm');
    assert.exists(event);
    assert.isFalse(el.visible);
  });

  test('dispatches cancel event when overlay is clicked', async () => {
    const el = await fixture(html`<confirmation-modal visible></confirmation-modal>`);
    setTimeout(() => {
      const overlay = el.shadowRoot.querySelector('.overlay');
      overlay.click();
    }, 0);
    const event = await oneEvent(el, 'cancel');
    assert.exists(event);
    assert.isFalse(el.visible);
  });

  test('dispatches cancel event when cancel button is clicked', async () => {
    const el = await fixture(html`<confirmation-modal visible></confirmation-modal>`);
    setTimeout(() => {
      const cancelBtn = el.shadowRoot.querySelector('button.cancel');
      cancelBtn.click();
    }, 0);
    const event = await oneEvent(el, 'cancel');
    assert.exists(event);
    assert.isFalse(el.visible);
  });

  test('dispatches cancel event when close button is clicked', async () => {
    const el = await fixture(html`<confirmation-modal visible></confirmation-modal>`);
    setTimeout(() => {
      // x button at top right
      const closeBtn = el.shadowRoot.querySelector('.modal-title > button');
      closeBtn.click();
    }, 0);
    const event = await oneEvent(el, 'cancel');
    assert.exists(event);
    assert.isFalse(el.visible);
  });
});
