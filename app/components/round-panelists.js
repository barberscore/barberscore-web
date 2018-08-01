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
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedPanelists: sort(
    'model.panelists',
    'sortedPanelistsProperties'
  ),
  searchPerson: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Person', query: term})
    return res.hits
  }),
  createPanelistModal: false,
  createPanelistModalError: false,
  savePanelist: task(function* (obj, category, kind){
    try {
      let person = yield this.get('store').findRecord('person', obj.objectID)
      yield this.get('store').createRecord('panelist', {
        person: person,
        round: this.get('model'),
        category: category,
        kind: kind,
        scores: [],
      }).save();
      this.set('createPanelistModal', false);
      this.set('createPanelistModalError', false);
      this.set('person', null);
      this.set('category', null);
      this.set('kind', null);
      this.get('flashMessages').success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createPanelistModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  deletePanelist: task(function *(panelist) {
    try {
      yield panelist.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
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
