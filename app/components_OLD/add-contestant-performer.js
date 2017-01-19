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
        this.get('flashMessages').success('Success');
        this.set('performer', null);
      })
      .catch((failure) => {
        contestant.deleteRecord();
        this.get('flashMessages').danger(failure);
      });
    },
  },
  performerSortProperties: ['name:asc',],
  sortedPerformers: Ember.computed.sort(
    'contest.session.performers',
    'performerSortProperties'
  ),
});

