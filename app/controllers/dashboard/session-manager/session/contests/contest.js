import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  contestantSortProperties: [
    'nomen:asc',
  ],
  sortedContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
  contestSortProperties: [
    'entityKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.contests',
    'contestSortProperties'
  ),
  entrySortProperties: [
    'nomen:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'model.session.entries',
    'entrySortProperties'
  ),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('award', {'nomen__icontains': term})
      .then((data) => data);
  }),
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
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.session-manager.session.contests.contest', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.session-manager.session.contests.contest', newCur);
    },
    deleteContestant(contestant) {
      contestant.destroyRecord();
    },
    buildContest() {
      this.model.build();
    },
    addContestant(){
      let contestant = this.get('store').createRecord('contestant', {
        contest: this.get('model'),
        entry: this.get('entry'),
      });
      contestant.save()
      .then(() => {
        this.set('entry', null);
        this.get('flashMessages').success('Success');
      });
    },
  },
});
