import Component from '@ember/component';
import { sort, not } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  sortedContestsProperties: [
    'treeSort',
  ],
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedContests: sort(
    'options',
    'sortedContestsProperties',
  ),
  updateSelection: task(function *(newSelection, /*value, operation*/) {
    let entry = yield this.model;
    yield entry.get('contests').setObjects(newSelection);
    yield timeout(1000);
    yield entry.save();
    this.flashMessages.success('Saved!');
  }).restartable(),
});
