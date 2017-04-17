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
  officeCall: Ember.computed(function() {
    return this.get('store').query('office', {
      'is_cj': 'true', //TODO Hardcoded
      'page_size': 1000,
    });
  }),
  officeOptionsProperties: [
    'name:asc',
  ],
  officeOptions: Ember.computed.sort(
    'officeCall',
    'officeOptionsProperties'
  ),
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__in': '11,21', //TODO Hardcoded
      'page_size': 1000,
    });
  }),
  entityOptionsProperties: [
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entityOptionsProperties'
  ),
  actions: {
    transitionJudge(judge) {
      this.transitionToRoute('dashboard.judge-manager.judge.details', judge);
    },
    sortBy(sortedJudgesProperties) {
      this.set('sortedJudgesProperties', [sortedJudgesProperties]);
    },
    createJudge(){
      let judge = this.get('store').createRecord('officer', {
        person: this.get('person'),
        office: this.get('office'),
        entity: this.get('entity'),
      });
      judge.save()
      .then(() => {
        this.get('flashMessages').success('Success');
        this.set('entity', null);
        this.set('office', null);
        this.set('person', null);
        this.set('openModal', false);
        this.transitionToRoute('dashboard.judge-manager.judge.details', judge);
      })
      .catch(() => {
        this.set('entity', null);
        this.set('office', null);
        this.set('person', null);
        this.set('openModal', false);
        this.get('flashMessages').danger('Error');
      });
    },
    clearJudge() {
      this.set('entity', null);
      this.set('office', null);
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
