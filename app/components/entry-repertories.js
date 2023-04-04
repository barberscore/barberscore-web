import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp';
import { computed } from '@ember/object';

export default Component.extend({
  customCollapsed: true,
  customCollapsed2: true,
  customCollapsed4: true,
  customCollapsed5: true,
  sortedRepertoriesProperties: [
    'title',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  store: service(),
  algolia: service(),
  currentUser: service(),
  flashMessages: service(),
  isDisabled: computed('model.{permissions.write,session.roundsPublished}', function() {
    if (this.get('model.session.status') != 'Packaged') {
      return true;
    }
    if (this.get('model.session.roundsPublished')) {
      return true;
    }
    if (this.get('model.permissions.write')) {
      return false;
    } else {
      return true;
    }
  }),
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
  saveRepertory: task(function* (chart){
    try {
      yield this.store.createRecord('repertory', {
        chart_id: chart.objectID,
        title: chart.title,
        arrangers: chart.arrangers,
        entry: this.model,
      }).save();
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
