import Component from '@ember/component';
import { not } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  autosave: task(function* (value){
    let round = yield this.model;
    round.set('date', value);
    yield timeout(1000);
    try {
      yield round.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
