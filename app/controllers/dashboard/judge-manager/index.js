import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  openModal: false,
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query(
      'officer', {
          'nomen__icontains': term
      });
  }),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  sortedJudgesProperties: [
    'personName',
    'officeName',
  ],
  sortedJudges: Ember.computed.sort(
    'model',
    'sortedJudgesProperties'
  ),
  actions: {
    transitionJudge(judge) {
      this.transitionToRoute('dashboard.judge-manager.judge.details', judge);
    },
    sortBy(sortedJudgesProperties) {
      this.set('sortedJudgesProperties', [sortedJudgesProperties]);
    },
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
  }
});
