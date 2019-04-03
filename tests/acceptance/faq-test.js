import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | faq', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /faq', async function(assert) {
    await visit('/faq');

    assert.equal(currentURL(), '/faq');
  });
});
