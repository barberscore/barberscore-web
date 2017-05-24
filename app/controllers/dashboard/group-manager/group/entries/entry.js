import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: Ember.computed.not('model.permissions.write'),
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
    'personLast',
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
    deleteEntry() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.group-manager.group.entries');
      });
    },
    saveEntry() {
      this.model.save()
      .then(() => {
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
  },
});
