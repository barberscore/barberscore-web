import { test } from 'qunit';
import moduleForAcceptance from 'barberscore-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index', function(assert) {
  visit('/index');

  andThen(function() {
    assert.equal(currentURL(), '/index');
  });
});
