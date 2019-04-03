import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | about', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /about', async function(assert) {
    await visit('/about');

    assert.equal(currentURL(), '/about');
  });
});
