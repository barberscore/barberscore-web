import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  membersCollapsed: true,
  repertoryCollapsed: true,
  imageCollapsed: true,
  whichChoice: true,
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
