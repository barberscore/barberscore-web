import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  membersCollapsed: true,
  officersCollapsed: true,
  repertoriesCollapsed: true,
  logsCollapsed: true,
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
  sortedEntriesProperties: [
    'groupName',
  ],
  sortedEntries: sort(
    'model.session.entries',
    'sortedEntriesProperties',
  ),
  sortedContestsProperties: [
    'awardName',
  ],
  sortedContests: sort(
    'model.session.contests',
    'sortedContestsProperties',
  ),
  updateSelection: task(function *(newSelection, value, operation) {
    let entry = yield this.model;
    yield entry.get('contests').setObjects(newSelection);
    yield timeout(1000);
    yield entry.save();
    this.flashMessages.success(`${value.awardName} ${operation}!`);
  }).restartable(),
});
