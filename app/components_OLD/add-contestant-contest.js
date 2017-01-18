import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var contestant = this.get('store').createRecord('contestant', {
        contest: this.get('contest'),
        performer: this.get('performer'),
      });
      contestant.save()
      .then(() => {
        // flashMessages.success('Success');
        this.set('contest', null);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  contestSortProperties: ['name:asc',],
  sortedContests: Ember.computed.sort(
    'performer.session.contests',
    'contestSortProperties'
  ),
});

