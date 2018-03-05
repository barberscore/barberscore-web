import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  evalCollapsed: true,
  membersCollapsed: true,
  repertoryCollapsed: true,
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
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
  sortedEntriesProperties: [
    'nomen',
  ],
  sortedEntries: sort(
    'model.session.entries',
    'sortedEntriesProperties',
  ),
});
