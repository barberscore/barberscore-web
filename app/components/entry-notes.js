import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { not } from '@ember/object/computed';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  autosave: task(function* (value){
    this.model.set('notes', value);
    yield timeout(1000);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
