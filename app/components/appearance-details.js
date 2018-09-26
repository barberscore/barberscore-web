import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  autosave: task(function* (value){
    this.model.set('pos', value);
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
  actions: {
    refresh() {
      return this.model.reload();
    }
  }
});
