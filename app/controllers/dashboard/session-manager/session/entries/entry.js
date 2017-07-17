import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isDisabled: Ember.computed.equal(
    'model.session.status',
    'Started',
  ),
  searchChart: task(function* (term){
    yield timeout(600);
    return this.get('store').query('chart', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: Ember.computed.sort(
    'model.group.repertories',
    'sortedRepertoriesProperties'
  ),
  sortedParticipantsProperties: [
    'nameSort',
  ],
  sortedParticipants: Ember.computed.sort(
    'model.participants',
    'sortedParticipantsProperties'
  ),
  sortedExpirationsProperties: [
    'nameSort',
  ],
  sortedExpirations: Ember.computed.sort(
    'model.expiringMembers',
    'sortedExpirationsProperties'
  ),
  contestSortProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  contestOptions: Ember.computed.sort(
    'model.session.contests',
    'contestSortProperties'
  ),
  representingCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'kind__lt': '30',
      'status': 10,
      'page_size': 100,
    });
  }),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  entrySortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.entries',
    'entrySortProperties'
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
  inviteEntry: task(function *() {
    let entry = yield this.model.invite({
      'by': this.get('currentUser.user.id'),
    });
    this.store.pushPayload('entry', entry);
    this.set('openModal', false);
    this.get('flashMessages').success("Invited!");
  }).drop(),
  submitEntry: task(function *() {
    let entry = yield this.model.submit({
      'by': this.get('currentUser.user.id'),
    });
    this.store.pushPayload('entry', entry);
    this.set('openModal', false);
    this.get('flashMessages').success("Submitted!");
  }).drop(),
  acceptEntry: task(function *() {
    let entry = yield this.model.accept({
      'by': this.get('currentUser.user.id'),
    });
    this.store.pushPayload('entry', entry);
    this.set('openModal', false);
    this.get('flashMessages').success("Accepted!");
  }).drop(),
  scratchEntry: task(function *() {
    let entry = yield this.model.scratch({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('entry', entry);
    this.set('openModal', false);
    this.get('flashMessages').success("Scratched!");
  }).drop(),
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
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.session-manager.session.entries.entry', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.session-manager.session.entries.entry', newCur);
    },
    updateSelection(newSelection, value, operation) {
      if (operation==='added') {
        let contest = this.get('store').peekRecord('contest', value);
        let contestant = this.get('model.contestants').createRecord({
          contest: contest
        });
        contestant.save()
        .then(() => {
        });
      } else { //operation === removed
        let contestant = this.get('model.contestants').findBy('contest.id', value);
        contestant.destroyRecord()
        .then(() => {
        });
      }
    },
  },
});
