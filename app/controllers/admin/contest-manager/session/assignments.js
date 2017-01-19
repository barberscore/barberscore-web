import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  assignmentSortProperties: [
    'nomen:asc',
  ],
  sortedAssignments: Ember.computed.sort(
    'model.assignments',
    'assignmentSortProperties'
  ),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    setEditing() {
      this.set('isEditing', true);
    },
    cancelEdits() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveEdits() {
      this.get('model').save()
      .then(() => {
        this.get('flashMessages').success('Success');
        this.set('isEditing', false);
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Failure');
      });
    }
  }
});
