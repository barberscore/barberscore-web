import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
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
  sortedJudges: sort(
    'model',
    'sortedJudgesProperties'
  ),
  sortedSCJC: filterBy(
    'sortedJudges',
    'officeShortName',
    'SCJC'
  ),
  sortedDRCJ: filterBy(
    'sortedJudges',
    'officeShortName',
    'DRCJ'
  ),
  sortedCA: filterBy(
    'sortedJudges',
    'officeShortName',
    'CA'
  ),
  sortedMUS: filterBy(
    'sortedJudges',
    'officeShortName',
    'MUS'
  ),
  sortedPER: filterBy(
    'sortedJudges',
    'officeShortName',
    'PER'
  ),
  sortedSNG: filterBy(
    'sortedJudges',
    'officeShortName',
    'SNG'
  ),
  sortedAdmin: filterBy(
    'sortedJudges',
    'officeShortName',
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
