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
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    cancelJudge() {
      this.get('flashMessages').warning('Cancelled');
      this.transitionToRoute('admin.judge-manager');
    },
    saveJudge() {
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
        this.get('flashMessages').success('Saved');
        this.transitionToRoute('admin.judge-manager.judge', judge);
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
