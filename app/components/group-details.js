import Component from '@ember/component';
import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  customCollapsed: true,
  autosave: task(function* (property, value){
    this.model.set(property, value);
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
