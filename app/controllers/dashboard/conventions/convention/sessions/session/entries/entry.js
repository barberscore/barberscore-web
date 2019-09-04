import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  membersCollapsed: true,
  officersCollapsed: true,
  repertoriesCollapsed: true,
  logsCollapsed: true,
  sortedEntriesProperties: [
    'name',
  ],
  sortedEntries: sort(
    'model.session.entries',
    'sortedEntriesProperties'
  ),
  group: computed(
    'model', function() {
      return this.store.findRecord('group', this.model.get('groupId'));
    }
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
