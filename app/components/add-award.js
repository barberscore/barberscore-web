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
  awardSortProperties: ['name:asc',],
  sortedAwards: Ember.computed.sort(
    'session.convention.organization.awards',
    'awardSortProperties'
  ),
});

