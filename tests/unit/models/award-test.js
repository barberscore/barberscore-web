import { moduleForModel, test } from 'ember-qunit';

moduleForModel('award', 'Unit | Model | award', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization',
    'model:contest',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();

  assert.ok(!!model);
});

test('name is foobar', function(assert) {
  let foobar = this.subject({
    name: 'Foobar',
  });
  assert.equal(foobar.get('name'), 'Foobar', 'Name is Foobar');
});
