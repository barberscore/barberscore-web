import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isEditing: false,
  openModal: false,
  isDisabled: Ember.computed.not('isEditing'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {'nomen__icontains': term})
      .then((data) => data);
  }),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    createJudge(){
      let judge = this.get('store').createRecord('judge', {
        person: this.get('person'),
        kind: this.get('kind'),
        category: this.get('category'),
      });
      judge.save()
      .then(() => {
        this.get('flashMessages').success('Success');
        this.set('kind', null);
        this.set('category', null);
        this.set('person', null);
        this.set('openModal', false);
        this.transitionToRoute('dashboard.judge-manager.judge', judge);
      })
      .catch(() => {
        this.set('kind', null);
        this.set('category', null);
        this.set('person', null);
        this.set('openModal', false);
        this.get('flashMessages').danger('Error');
      });
    },
    clearJudge() {
      this.set('kind', null);
      this.set('category', null);
      this.set('person', null);
      this.set('openModal', false);
    },
    deleteJudge(judge){
      judge.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
