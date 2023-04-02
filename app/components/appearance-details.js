import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  flashMessages: service(),
  isDisabled: computed('model.round.status', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  autosave: task(function* (field, value){
    this.model.set(field, value);
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
