import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { not } from '@ember/object/computed';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  autosave: task(function* (value){
    this.get('model').set('description', value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
});
