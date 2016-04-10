import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(role) {
      this.model.set('codirector', role);
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
  contestantSortProperties: ['name:asc',],
  sortedRoles: Ember.computed.sort(
    'model.group.roles',
    'contestantSortProperties'
  ),
});
