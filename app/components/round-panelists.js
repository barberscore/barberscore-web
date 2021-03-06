import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  store: service(),
  algolia: service(),
  flashMessages: service(),
  sortedPanelistsProperties: [
    'kindSort',
    'num',
    'categorySort',
    'lastName',
    'firstName',
  ],
  sortedPanelists: sort(
    'model.panelists',
    'sortedPanelistsProperties'
  ),
  searchPerson: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Person', query: term})
    return res.hits
  }),
  createPanelistModal: false,
  createPanelistModalError: false,
  savePanelist: task(function* (obj, category, kind, num){
    try {
      yield this.store.createRecord('panelist', {
        num: num,
        personId: obj.objectID,
        name: obj.name,
        firstName: obj.first_name,
        lastName: obj.last_name,
        round: this.model,
        category: category,
        kind: kind,
        owners: [],
        scores: [],
      }).save();
      this.set('createPanelistModal', false);
      this.set('createPanelistModalError', false);
      this.set('num', null);
      this.set('person', null);
      this.set('category', null);
      this.set('kind', null);
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createPanelistModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  deletePanelist: task(function *(panelist) {
    try {
      yield panelist.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  categoryOptions: [
    'CA',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
  ],
  actions: {
    cancelPanelist(panelist){
      panelist.deleteRecord();
    },
  }
});
