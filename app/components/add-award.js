import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  allAwards: Ember.computed(function() {
    return this.get('store').findAll('award');
  }),
  sortedAwards: Ember.computed.filterBy(
    'allAwards',
    'organization',
    'model.contest.session.organization'
  )
});

