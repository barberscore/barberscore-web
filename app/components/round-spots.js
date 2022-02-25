import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Component.extend({
  isDisabled: computed(
    'model',
    function() {
      return ['Completed', 'Finalized', 'Published'].includes(this.get('model.status'));
    }
  ),
  autosave: task(function* (value){
    let round = yield this.model;
    round.set('spots', value);
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
