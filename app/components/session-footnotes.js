import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  // isDisabled: not(
  //  'model.permissions.write',
  //),
  isDisabled:false,
  autosave: task(function* (value){
    let session = yield this.model;
    session.set('footnotes', value);
    yield timeout(1000);
    try {
      yield session.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
