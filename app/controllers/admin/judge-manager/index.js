import Ember from 'ember';

export default Ember.Controller.extend({
  collapseChorus: false,
  judgeSortProperties: [
    'person.name:asc',
  ],
  sortedJudges: Ember.computed.sort(
    'model',
    'judgeSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
    sortBy(judgeSortProperties) {
      this.set('judgeSortProperties', [judgeSortProperties]);
    },
  }
});
