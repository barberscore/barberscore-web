import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  collapsed: true,
  isEditing: false,
  isDisabled: false,
  flashMessages: Ember.inject.service(),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  searchChart: task(function* (term){
    yield timeout(600);
    return this.get('store').query('chart', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  entrySortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.entries',
    'entrySortProperties'
  ),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: Ember.computed.sort(
    'model.entity.repertories',
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
    'entityKindSort',
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
    return this.get('store').query('entity', {
        'kind__lt': '30',
        'status': 10,
        'page_size': 100,
      });
    // }).then((data) => {
    //   sessions.addObjects(data);
    // });
    // return sessions;
  }),
  // representingFilter: Ember.computed.filterBy(
  //   'representingCall',
  //   'kind',
  //   'Quartet'
  // ),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
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
    let userID = this.get('currentUser.user.id');
    let entry = yield this.model.invite({
      'by': userID
    });
    this.store.pushPayload('entry', entry);
    this.set('openModal', false);
    this.get('flashMessages').success("Invited!");
  }).drop(),
  submitEntry: task(function *() {
    let userID = this.get('currentUser.user.id');
    let entry = yield this.model.submit({
      'by': userID
    });
    this.store.pushPayload('entry', entry);
    this.set('openModal', false);
    this.get('flashMessages').success("Submitted!");
  }).drop(),
  acceptEntry: task(function *() {
    let userID = this.get('currentUser.user.id');
    let entry = yield this.model.accept({
      'by': userID
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
    editEntry() {
      this.set('isEditing', true);
    },
    cancelEntry() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteEntry() {
      let session = this.model.session;
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.session-manager.convention.sessions.session', session);
      });
    },
    saveEntry() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
    buildEntry() {
      this.model.build();
    },
    scratchEntry() {
      this.model.scratch();
    },
    disqualifyEntry() {
      this.model.disqualify();
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
