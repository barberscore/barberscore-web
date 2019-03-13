import { not, filterBy, sort } from '@ember/object/computed';
import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedMembersProperties: [
    'partSort',
    'personLast',
    'personName',
  ],
  filteredMembers: filterBy(
    'model.members',
    'status',
    'Active',
  ),
  sortedMembers: sort(
    'filteredMembers',
    'sortedMembersProperties'
  ),
  refreshGroup: task(function *() {
    try {
      let group = yield this.get('model');
      yield group.refresh();
      window.location.reload(true);
    } catch(e) {
      yield this.flashMessages.danger(e);
    }
    yield this.flashMessages.success("Refresh!");
  }).drop(),
});
