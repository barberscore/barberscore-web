import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  location: '',
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  entitySortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entitySortProperties'
  ),
  actions: {
    newQuartet() {
      let newQuartet = this.store.createRecord(
        'quartet'
      );
      this.set('model', newQuartet);
      this.set('isEditing', true);
    },
    editQuartet() {
      this.set('isEditing', true);
    },
    cancelQuartet() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteQuartet() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.set('isEditing', false);
        this.transitionToRoute('admin.quartet-manager');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error!');
      });
    },
    saveQuartet() {
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
          this.transitionToRoute('admin.quartet-manager');
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
    startQuartet() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('quartet', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    endQuartet() {
      this.model.end()
      .then(response => {
        this.store.pushPayload('quartet', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
  }
});
