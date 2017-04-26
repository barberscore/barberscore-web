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
    'officeSCJCSort',
    'officeShortName',
    'personName',
  ],
  sortedJudges: Ember.computed.sort(
    'model',
    'sortedJudgesProperties'
  ),
  sortedSCJC: Ember.computed.filterBy(
    'sortedJudges',
    'officeKind',
    'SCJC'
  ),
  sortedDRCJ: Ember.computed.filterBy(
    'sortedJudges',
    'officeKind',
    'DRCJ'
  ),
  sortedCA: Ember.computed.filterBy(
    'sortedJudges',
    'officeKind',
    'CA'
  ),
  sortedMUS: Ember.computed.filterBy(
    'sortedJudges',
    'officeShortName',
    'MUS'
  ),
  sortedPER: Ember.computed.filterBy(
    'sortedJudges',
    'officeShortName',
    'PER'
  ),
  sortedSNG: Ember.computed.filterBy(
    'sortedJudges',
    'officeShortName',
    'SNG'
  ),
  sortedAdmin: Ember.computed.filterBy(
    'sortedJudges',
    'officeKind',
    'Admin'
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
