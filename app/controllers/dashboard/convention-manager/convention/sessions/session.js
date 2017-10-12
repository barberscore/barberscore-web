import { computed } from '@ember/object';
import { equal, and, not, sort, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import {
  task
} from 'ember-concurrency';

export default Controller.extend({
  currentUser: service(),
  flashMessages: service(),
  isNew: equal('model.status', 'New'),
  isEditable: and(
    'model.permissions.write',
    'isNew',
  ),
  isDisabled: not(
    'isEditable',
  ),
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  filteredAwards: computed(
    'model.convention.organization.awards.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function () {
      return this.get('model.convention.organization.awards').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  sortedAwards: sort(
    'filteredAwards',
    'awardSortProperties',
  ),
  publishSession: task(function* () {
    let session = yield this.model.publish({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Published!");
  }).drop(),
  sessionManager: controller('dashboard.convention-manager.convention.sessions.index'),
  sessionSortProperties: [
    'nomen',
  ],
  sortedItems: alias('sessionManager.sortedSessions'),
  isPrevDisabled: computed(
    'model',
    'sortedItems',
    function () {
      return this.model == this.get('sortedItems.firstObject');
    }),
  isNextDisabled: computed(
    'model',
    'sortedItems',
    function () {
      return this.model == this.get('sortedItems.lastObject');
    }),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur - 1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur + 1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
  },
});
