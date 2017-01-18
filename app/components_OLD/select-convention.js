import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  allConventions: Ember.computed(function() {
    return this.get('store').findAll('convention');
  }),
  conventionsSort: ['start_date:desc'],
  organizationChoices: Ember.computed.sort(
    'allConventions',
    'conventionsSort'
  )
});

