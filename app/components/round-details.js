import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  isDisabled: computed('model.{permissions.write,status}', function() {
    if (this.get('model.status') == 'Published') {
      return true;
    }
    if (this.get('model.permissions.write')) {
      return false;
    } else {
      return true;
    }
  }),
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
