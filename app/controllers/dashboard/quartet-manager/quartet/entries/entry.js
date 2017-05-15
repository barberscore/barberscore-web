import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isDisabled: Ember.computed.not('isEditing'),
  flashMessages: Ember.inject.service(),
  openModal: false,
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
  submissionSortProperties: [
    'title',
  ],
  sortedSubmissions: Ember.computed.sort(
    'model.submissions',
    'submissionSortProperties'
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
        'kind__in': '11,12,13',
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
    'kindSort:asc',
    'name:asc'
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  activeMembers: Ember.computed.filterBy(
    'model.entity.members',
    'status',
    'Active'
  ),
  activeTenors: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Tenor'
  ),
  tenor: Ember.computed(
    'activeTenors',
    function() {
      return this.get('activeTenors.firstObject');
    }
  ),
  activeLeads: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Lead'
  ),
  lead: Ember.computed(
    'activeLeads',
    function() {
      return this.get('activeLeads.firstObject');
    }
  ),
  activeBaritones: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Baritone'
  ),
  baritone: Ember.computed(
    'activeBaritones',
    function() {
      return this.get('activeBaritones.firstObject');
    }
  ),
  activeBasses: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Bass'
  ),
  bass: Ember.computed(
    'activeBasses',
    function() {
      return this.get('activeBasses.firstObject');
    }
  ),
  actions: {
    populateSubmission(chart) {
      this.set('chart', chart);
      this.set('title', chart.get('title'));
      this.set('composers', chart.get('composers'));
      this.set('arrangers', chart.get('arrangers'));
      this.set('holders', chart.get('holders'));
      this.set('bhs_id', chart.get('bhs_id'));
    },
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
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.quartet-manager.quartet.entries');
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
    deleteSubmission(submission) {
      submission.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
    createSubmission() {
      let submission = this.get('store').createRecord('submission', {
        entry: this.get('model'),
        title: this.get('title'),
        composers: this.get('composers'),
        arrangers: this.get('arrangers'),
        holders: this.get('holders'),
        bhs_id: this.get('bhs_id'),
        chart: this.get('chart'),
      });
      submission.save()
      .then(() => {
        this.set('submission', null);
        this.set('title', null);
        this.set('composers', null);
        this.set('arrangers', null);
        this.set('holders', null);
        this.set('bhs_id', null);
        this.set('chart', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      });
    },
    clearSubmission() {
      this.set('submission', null);
      this.set('title', null);
      this.set('composers', null);
      this.set('arrangers', null);
      this.set('holders', null);
      this.set('bhs_id', null);
      this.set('chart', null);
      this.set('openModal', false);
    }
  },
});
