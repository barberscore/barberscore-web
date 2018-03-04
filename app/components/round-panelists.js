import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  store: service(),
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
  sortedAssignmentsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedAssignments: sort(
    'model.session.convention.assignments',
    'sortedAssignmentsProperties'
  ),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  createPanelistModal: false,
  createPanelistModalError: false,
  savePanelist: task(function* (person){
    try {
      let panelist = yield this.get('store').createRecord('panelist', {
        person: person,
        round: this.get('model'),
        category: null,
        kind: null,
        scores: [],
      }).save();
      let payload = yield panelist.build({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('panelist', payload);
      this.set('createPanelistModal', false);
      this.set('createPanelistModalError', false);
      this.get('flashMessages').success("Created!");
      this.get('router').transitionTo('dashboard.scoring-manager.round.panelists', this.get('model'), panelist.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createPanelistModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelPanelist(panelist){
      panelist.deleteRecord();
    },
  }
});
