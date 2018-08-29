import Component from '@ember/component';
import { inject as service } from '@ember/service';
// import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { not } from '@ember/object/computed';

export default Component.extend({
  memberHelp: true,
  isDisabled: not(
    'model.permissions.write',
  ),
  flashMessages: service(),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
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
