import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { not, sort, alias, mapBy, filterBy } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  algolia: service(),
  currentUser: service(),
  customCollapsed: true,
  customCollapsed2: true,
  customCollapsed4: true,
  customCollapsed5: true,
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
      return this.officerPersons.includes(this.get('currentPerson.id'));
    }
  ),
  isCreate: not(
    'isOfficer',
  ),
  sortedRepertoriesProperties: [
    'chartTitle',
  ],
  filteredRepertories: filterBy(
    'model.repertories',
    'isActive',
  ),
  sortedRepertories: sort(
    'filteredRepertories',
    'sortedRepertoriesProperties'
  ),
  flashMessages: service(),
  searchChart: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Chart', query: term})
    return res.hits
  }),
  deleteRepertory: task(function *(repertory) {
    try {
      yield repertory.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  createRepertoryModal: false,
  createRepertoryModalError: false,
  saveRepertory: task(function* (c){
    try {
      let chart = yield this.store.findRecord('chart', c.objectID)
      let repertory = yield this.store.createRecord('repertory', {
        chart: chart,
        group: this.model,
      }).save();
      yield repertory.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.set('createRepertoryModal', false);
      this.set('createRepertoryModalError', false);
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createRepertoryModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelRepertory(repertory){
      repertory.deleteRecord();
    },
  }
});
