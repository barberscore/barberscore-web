import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveAward() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var contest = this.get('store').createRecord('contest', {
        session: this.get('session'),
        award: this.get('award'),
      });
      contest.save()
      .then(() => {
        flashMessages.success('Contest Added');
        this.set('award', null);
      })
      .catch((failure) => {
        contest.deleteRecord();
        flashMessages.danger(failure);
      });
    }
  },
  allAwards: Ember.computed(function(){
    return this.get('store').findAll('award');
    // var awards = this.get('

  }),
  filteredAwards: Ember.computed.filterBy(
    'allAwards',
    'kind',
    'session.kind'
  ),
  sortAwards: ['name:asc'],
  availableAwards: Ember.computed.sort(
    'allAwards',
    'sortAwards'
  ),
});

