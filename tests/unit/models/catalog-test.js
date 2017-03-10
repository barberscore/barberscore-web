import { moduleForModel, test } from 'ember-qunit';

moduleForModel('catalog', 'Unit | Model | catalog', {
  // Specify the other units that are required for this test.
  needs: [
    'model:submission',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
