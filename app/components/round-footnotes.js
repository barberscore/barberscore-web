import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  autosave: task(function* (value){
    let round = yield this.get('model');
    round.set('footnotes', value);
    yield timeout(1000);
    try {
      yield round.save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
});
