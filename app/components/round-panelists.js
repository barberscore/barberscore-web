import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  store: service(),
  algolia: service(),
  flashMessages: service(),
  sortedPanelists: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setPanelists();
  },
  setPanelists: function() {
    const that = this;
    this.get('model.panelists').then(function(panelists) {
      panelists = panelists.toSorted(function(a, b) {
        if (a.kindSort != b.kindSort)
          return a.kindSort < b.kindSort ? -1 : 1;
        if (a.categorySort != b.categorySort)
          return a.categorySort < b.categorySort ? -1 : 1;
        if (a.num != b.num)
          return a.num < b.num ? -1 : 1;
        if (a.lastName != b.lastName)
          return a.lastName < b.lastName ? -1 : 1;
        if (a.firstName != b.firstName)
          return a.firstName < b.firstName ? -1 : 1;
      });
      that.set('sortedPanelists', panelists);
    });
  },
  searchPerson: task(function* (term){
    yield timeout(600);
    let res = yield this.algolia.search({ indexName: 'Person', query: term})
    return res.hits;
  }),
  createPanelistModal: false,
  createPanelistModalError: false,
  savePanelist: task(function* (obj, category, kind, num){
    try {
      if (obj === undefined) {
        throw { errors: [{detail: 'Please select a Person.'}] };
      }
      else if (category === undefined) {
        throw { errors: [{detail: 'Please select a Category.'}] };
      }
      else if (kind === undefined) {
        throw { errors: [{detail: 'Please select the Kind of panelist.'}] };
      }
      else if (category !== undefined && category != 'ADM' && category != 'PC' && category != 'CA' && num === undefined) {
        throw { errors: [{detail: 'Please enter a Number for this panelist.'}] };
      }

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
      this.setPanelists();
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        if (e.detail) {
          this.set('createPanelistModalError', e.detail);
        } else {
          this.set('createPanelistModalError', 'Could not create panelist.  Please contact support.');
        }
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
    'PC',
    'ADM',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Observer',
  ],
  actions: {
    cancelPanelist(panelist){
      panelist.deleteRecord();
    },
  }
});
