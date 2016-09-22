import { test } from 'qunit';
import moduleForAcceptance from 'barberscore-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | public');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
