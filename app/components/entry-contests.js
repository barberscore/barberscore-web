import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  sortedContestsProperties: [
    'treeSort',
  ],
  isDisabled: computed('model.{permissions.write,session.roundsPublished}', function() {
    if (this.get('model.session.status') != 'Packaged') {
      return true;
    }
    if (this.get('model.session.roundsPublished')) {
      return true;
    }
    if (this.get('model.permissions.write')) {
      return false;
    } else {
      return true;
    }
  }),
  sortedContests: sort(
    'options',
    'sortedContestsProperties',
  ),
  updateSelection: task(function *(newSelection, /*value, operation*/) {
    try {
      let entry = yield this.model;
      yield entry.get('contests').setObjects(newSelection);
      yield timeout(1000);
      yield entry.save();

      yield this.model.contest({
        'by': this.get('currentUser.user.id'),
      });
      this.flashMessages.success('Contests Updated!');
    } catch(e) {
      this.flashMessages.error('Unable change contests!');
    }
  }).restartable(),
});
