import Ember from 'ember';

export default Ember.Controller.extend({
  sortedOfficersProperties: [
    'nomen',
    'partSort',
  ],
  filteredOfficers: Ember.computed.filterBy(
    'model.officers',
    'isOld'
  ),
  activeOfficers: Ember.computed.filterBy(
    'filteredOfficers',
    'status',
    'Active'
  ),
  inactiveOfficers: Ember.computed.filterBy(
    'filteredOfficers',
    'status',
    'Active'
  ),
  sortedOfficers: Ember.computed.sort(
    'activeOfficers',
    'sortedOfficersProperties'
  ),
  sortedInactiveOfficers: Ember.computed.sort(
    'inactiveOfficers',
    'sortedOfficersProperties'
  ),
  actions: {
    createOfficer(){
      let officer = this.get('store').createRecord('officer', {
        entity: this.get('model')
      });
      this.set('officer', officer);
      this.set('openModal', true);
    },
  }
});
