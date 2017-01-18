import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  store: Ember.inject.service(),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('session', {'nomen__icontains': term, 'status': 4})
      .then((data) => data);
  }),
  optionsSession: Ember.computed(function() {
    return this.get('store').query('session', {'status': 4});
  }),
  actions: {
    transitionSession(session) {
      this.transitionToRoute('admin.registration-manager.session', session);
    },
    addPerformer() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var performer = this.get('store').createRecord('performer', {
        session: this.get('model'),
        group: this.get('group'),
      });
      performer.save()
      .then(() => {
        this.set('group', null);
        flashMessages.success('Success');
      })
      .catch((error) => {
        performer.deleteRecord();
        console.log(error);
        flashMessages.danger('Error');
      });
    },
  },
});
