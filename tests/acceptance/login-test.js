import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /login', async function(assert) {
    await visit('/login');

    assert.equal(currentURL(), '/login');
  });
});
