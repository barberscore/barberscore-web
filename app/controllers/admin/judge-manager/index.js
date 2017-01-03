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
      this.store.createRecord(
        'judge'
      );
      this.set('isEditing', true);
    },
    toggleEdit() {
      this.toggleProperty('isEditing');
    },
    saveDirty() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.get('model').save()
      .then(() => {
        flashMessages.success('Success');
        this.toggleProperty('isEditing');
      })
      .catch((error) => {
        console.log(error);
        flashMessages.danger('Failure');
      });
    },
    sortBy(judgeSortProperties) {
      this.set('judgeSortProperties', [judgeSortProperties]);
    },
  }
});
