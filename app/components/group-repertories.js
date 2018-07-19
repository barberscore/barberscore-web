import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { not, sort, filterBy } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  algolia: service(),
  currentUser: service(),
  customCollapsed: true,
  isDisabled: not(
    'model.permissions.write',
  ),
  filteredOfficers: computed(
    'model.officers.@each.person.id', function() {
    return this.get('model.officers').filterBy('person.id', this.get('currentUser.user.person.id'));
  }),
  activeOfficers: filterBy(
    'filteredOfficers',
    'status',
    'Active',
  ),
  chartOfficers: filterBy(
    'activeOfficers',
    'isChartManager',
  ),
  // isCreateDisabled: not(
  //   'chartOfficers.length',
  // ),
  isCreateDisabled: false,
  sortedRepertoriesProperties: [
    'chartTitle',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  flashMessages: service(),
  searchChart: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Chart', query: term})
    return res.hits
  }),
  deleteRepertory: task(function *(repertory) {
    try {
      yield repertory.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  createRepertoryModal: false,
  createRepertoryModalError: false,
  saveRepertory: task(function* (c){
    try {
      let chart = yield this.get('store').findRecord('chart', c.objectID)
      let repertory = yield this.get('store').createRecord('repertory', {
        chart: chart,
        group: this.get('model'),
      }).save();
      yield repertory.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.set('createRepertoryModal', false);
      this.set('createRepertoryModalError', false);
      this.get('flashMessages').success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createRepertoryModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelRepertory(repertory){
      repertory.deleteRecord();
    },
  }
});
