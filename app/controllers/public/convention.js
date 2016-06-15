import Ember from 'ember';

export default Ember.Controller.extend({
  isHeaderCollapsed: true,
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
  }
});
