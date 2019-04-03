import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | loading', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /loading', async function(assert) {
    await visit('/loading');

    assert.equal(currentURL(), '/loading');
  });
});
