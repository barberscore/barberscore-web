import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  awardSortProperties: [
    'entityKindSort',
    'is_qualifier',
    'is_primary:desc',
    'ageSort',
    'name',
  ],
  awardOptions: Ember.computed.sort(
    'model.convention.entity.awards',
    'awardSortProperties'
  ),
  sessionSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model.convention.sessions',
    'sessionSortProperties'
  ),
  isPrevDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.lastObject');
  }),
  scheduleSession: task(function *() {
    let session = yield this.model.schedule({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Scheduled!");
  }).drop(),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
    updateSelection(newSelection, value, operation) {
      if (operation==='added') {
        let award = this.get('store').peekRecord('award', value);
        let contest = this.get('model.contests').createRecord({
          award: award
        });
        contest.save()
        .then(() => {
        });
      } else { //operation === removed
        let contest = this.get('model.contests').findBy('award.id', value);
        contest.destroyRecord()
        .then(() => {
        });
      }
    },
  },
});
