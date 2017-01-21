import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {'nomen__icontains': term})
      .then((data) => data);
  }),
  actions: {
    newAssignment() {
      let newAssignment = this.store.createRecord(
        'assignment'
      );
      this.set('model', newAssignment);
      this.set('isEditing', true);
    },
    editAssignment() {
      this.set('isEditing', true);
    },
    cancelAssignment() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteAssignment() {
      let session = this.model;
      this.model.destroyRecord()
      .then(() => {
        console.log(session);
        this.set('isEditing', false);
        this.transitionToRoute('admin.contest-manager.session', session);
        this.get('flashMessages').warning('Deleted');
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
    saveAssignment() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch((failure) => {
        this.model.rollbackAttributes();
        this.get('flashMessages').danger(failure);
      });
    },
  },
});
