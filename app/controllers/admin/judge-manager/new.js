import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {'nomen__icontains': term})
      .then((data) => data);
  }),
  actions: {
    cancelJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.warning('Cancelled');
      this.transitionToRoute('admin.judge-manager');
    },
    saveJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let judge = this.store.createRecord('judge', {
        person: this.person,
        status: this.status,
        kind: this.kind,
        category: this.category,
        start_date: this.start_date,
        end_date: this.end_date,
      });
      judge.save()
      // this.model.save()
      .then(() => {
        flashMessages.success('Saved');
        this.transitionToRoute('admin.judge-manager.judge', judge);
      })
      .catch((error) => {
        console.log(error);
        flashMessages.danger('Error');
      });
    },
  },
});
