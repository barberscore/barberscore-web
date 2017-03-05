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
  adminCall: Ember.computed(function() {
    return this.get('store').query('person', {
      'judges__category': 0, //TODO Hardcoded
      'judges__status': 1,
      'judges__kind': 40,
      'page_size': 1000,
    });
  }),
  adminOptions: Ember.computed.uniq(
    'adminCall'
  ),
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
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.contest-manager.convention.sessions.session.assignments');
      })
      .catch(() => {
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
