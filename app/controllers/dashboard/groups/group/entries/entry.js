import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  membersCollapsed: true,
  repertoryCollapsed: true,
  imageCollapsed: true,
  whichChoice: true,
  autosave: task(function* (property, value){
    this.model.entry.set(property, value);
    yield timeout(1000);
    try {
      yield this.model.entry.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
