import Ember from 'ember';

export default Ember.Controller.extend({
  collapseChorus: false,
  organizationSortProperties: [
    'lft:asc',
  ],
  sortedOrganizations: Ember.computed.sort(
    'model',
    'organizationSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
  }
});
