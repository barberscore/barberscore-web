import Component from '@ember/component';
import { inject as service } from '@ember/service';
// import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { not } from '@ember/object/computed';

export default Component.extend({
  memberHelp: true,
  chapterHelp: true,
  scoringHelp: true,
  evalHelp: true,
  isDisabled: not(
    'model.permissions.write',
  ),
  flashMessages: service(),
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
