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
    'entitySort',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.contests',
    'contestSortProperties'
  ),
  performerSortProperties: [
    'nomen:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.session.performers',
    'performerSortProperties'
  ),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('award', {'nomen__icontains': term})
      .then((data) => data);
  }),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('admin.contest-manager.session.contests.contest', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('admin.contest-manager.session.contests.contest', newCur);
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
        performer: this.get('performer'),
      });
      contestant.save()
      .then(() => {
        this.set('performer', null);
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        contestant.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
