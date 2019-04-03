import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | tutorials', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /tutorials', async function(assert) {
    await visit('/tutorials');

    assert.equal(currentURL(), '/tutorials');
  });
});
