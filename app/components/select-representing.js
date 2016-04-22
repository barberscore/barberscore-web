import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  allOrganizations: Ember.computed(function() {
    return this.get('store').findAll('organization');
  }),
  orgsSort: ['-level', 'kind', 'name:asc'],
  organizationChoices: Ember.computed.sort(
    'allOrganizations',
    'orgsSort'
  )
});

