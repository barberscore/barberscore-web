import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
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
        this.set('isEditing', false);
        this.transitionToRoute('admin.convention-manager');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error!');
      });
    },
    saveConvention() {
      // TODO this seems pretty damn hacky.
      if (this.get('model.isNew')) {
        let person = this.get('currentUser.user.person');
        this.model.save()
        .then((response) => {
          let assignment = response.get('assignments').createRecord({
            person:person,
            kind: 'DRCJ'
          });
          assignment.save();
          this.model.get('assignments').pushObject(assignment);
          this.set('isEditing', false);
          this.get('flashMessages').success('Saved');
          this.transitionToRoute('admin.convention-manager');
        })
        .catch(() => {
          this.model.rollbackAttributes();
          this.get('flashMessages').danger('Error');
        });
      } else {
        this.model.save()
        .then(() => {
          this.set('isEditing', false);
          this.get('flashMessages').success('Saved');
        })
        .catch(() => {
          this.model.rollbackAttributes();
          this.get('flashMessages').danger('Error');
        });
      }
    },
    startConvention() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    endConvention() {
      this.model.end()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
  }
});
