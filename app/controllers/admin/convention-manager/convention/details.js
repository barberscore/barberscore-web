import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  // searchTask: task(function* (term){
  //   yield timeout(600);
  //   return this.get('store').query('person', {'nomen__icontains': term})
  //     .then((data) => data);
  // }),
  actions: {
    newConvention() {
      let newConvention = this.store.createRecord(
        'convention'
      );
      this.set('model', newConvention);
      this.set('isEditing', true);
    },
    editConvention() {
      this.set('isEditing', true);
    },
    cancelConvention() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteConvention() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.convention-manager.conventions');
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error!');
      });
    },
    saveConvention() {
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
    startConvention() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger("Error" );
      });
    },
    endConvention() {
      this.model.end()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger("Error" );
      });
    },
  }
});
