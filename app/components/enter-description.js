import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
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
