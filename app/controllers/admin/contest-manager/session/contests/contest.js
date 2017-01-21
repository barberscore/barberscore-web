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
      .catch((error) => {
        contestant.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
