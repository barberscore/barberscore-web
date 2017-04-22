import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  queryParams: [
    'office__is_cj',
    'ordering',
  ],
  office__is_cj: 'true',
  ordering: 'personName,officeName',
  searchOfficer: task(function* (term){
    yield timeout(600);
    return this.get('store').query('officer', {
      'nomen__icontains': term,
      'is_cj': 'true'
    });
  }),
  sortedJudgesProperties: [
    'personName',
    'officeShortName',
  ],
  sortedJudges: Ember.computed.sort(
    'model',
    'sortedJudgesProperties'
  ),
  actions: {
    sortBy(sortedJudgesProperties) {
      this.set('sortedJudgesProperties', [sortedJudgesProperties]);
    },
    transitionJudge(officer) {
      this.transitionToRoute('dashboard.judge-manager.judge.details', officer);
    },
    createJudge() {
      let judge = this.get('store').createRecord('officer', {
      });
      this.set('judge', judge);
      this.set('openModal', true);
    },
  }
});
