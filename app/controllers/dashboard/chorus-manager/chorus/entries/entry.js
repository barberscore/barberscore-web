import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
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
  filteredMembers: Ember.computed.filterBy(
    'model.entity.members',
    'status',
    'Active'
  ),
  memberSortProperties: [
    'nomen',
  ],
  memberOptions: Ember.computed.sort(
    'filteredMembers',
    'memberSortProperties'
  ),
  actions: {
    submitEntry() {
      this.model.submit()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessages').success("Submitted!");
      });
    },
    populateSubmission(chart) {
      this.set('chart', chart);
      this.set('title', chart.get('title'));
      this.set('composers', chart.get('composers'));
      this.set('arrangers', chart.get('arrangers'));
      this.set('holders', chart.get('holders'));
      this.set('bhs_id', chart.get('bhs_id'));
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
        this.transitionToRoute('dashboard.chorus-manager.chorus.entries');
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
    updateMembers(newSelection, value, operation) {
      if (operation==='added') {
        let member = this.get('store').peekRecord('member', value);
        let participant = this.get('model.participants').createRecord({
          member: member
        });
        participant.save()
        .then(() => {
        });
        // console.log('added');
      } else { //operation === removed
        let participant = this.get('model.participants').findBy('member.id', value);
        participant.destroyRecord()
        .then(() => {
        });
        // console.log('removed');
      }
    },
    deleteSubmission(submission) {
      submission.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.quartet-manager.quartet.entries');
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
