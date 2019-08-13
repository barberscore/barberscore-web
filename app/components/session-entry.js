import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';

export default Component.extend({
  flashMessages: service(),
  membersCollapsed: true,
  officersCollapsed: true,
  repertoriesCollapsed: true,
  logsCollapsed: true,
  sortedEntriesProperties: [
    'groupName',
  ],
  sortedEntries: sort(
    'model.session.entries',
    'sortedEntriesProperties'
  ),
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
