import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  isEditing: false,
  collapseChorus: false,
  judgeSortProperties: [
    'person.name:asc',
  ],
  sortedJudges: Ember.computed.sort(
    'model',
    'judgeSortProperties'
  ),
  actions: {
    newJudge() {
      let newJudge = this.store.createRecord(
        'judge'
      );
      console.log(this.model);
      this.set('isEditing', true);
    },
    toggleEdit() {
      this.toggleProperty('isEditing');
    },
    sortBy(judgeSortProperties) {
      this.set('judgeSortProperties', [judgeSortProperties]);
    },
  }
});
