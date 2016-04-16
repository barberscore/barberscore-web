import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(organization) {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.set('organization', organization);
      this.model.save()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  allOrganizations: Ember.computed(function() {
    return this.get('store').findAll('organization');
  }),
  orgsSort: ['-level', 'kind', 'name:asc'],
  organizationChoices: Ember.computed.sort(
    'allOrganizations',
    'orgsSort'
  )
});

