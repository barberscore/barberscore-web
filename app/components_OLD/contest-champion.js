import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(contestant) {
      this.model.set('champion', contestant.get('performer.group.name'));
      isCollapsed:      this.model.save()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
  contestantSortProperties: ['name:asc',],
  fooContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
});
