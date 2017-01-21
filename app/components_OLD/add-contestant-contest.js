import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
var contestant = this.get('store').createRecord('contestant', {
        contest: this.get('contest'),
        performer: this.get('performer'),
      });
      contestant.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
        this.set('contest', null);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
  contestSortProperties: ['name:asc',],
  sortedContests: Ember.computed.sort(
    'performer.session.contests',
    'contestSortProperties'
  ),
});

