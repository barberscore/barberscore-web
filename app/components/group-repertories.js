import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { not, sort, alias, mapBy } from '@ember/object/computed';
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
  officerPersons: mapBy(
    'model.officers',
    'person.id',
  ),
  currentPerson: alias(
    'currentUser.user.person',
  ),
  isOfficer: computed(
    'officerPersons',
    'currentPerson',
    function() {
      return this.get('officerPersons').includes(this.get('currentPerson.id'));
    }
  ),
  isCreate: not(
    'isOfficer',
  ),
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
