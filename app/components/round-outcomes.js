import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  sortedOutcomesProperties: [
    'num',
  ],
  sortedOutcomes: sort(
    'model.outcomes',
    'sortedOutcomesProperties'
  ),
  searchAward: task(function* (term){
    yield timeout(600);
    let kindModel = this.get('model.session.kind');
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Award', query: term}, { filters: `get_kind_display:${kindModel}` })
    return res.hits
  }),
  createOutcomeModal: false,
  createOutcomeModalError: false,
  saveOutcome: task(function* (obj, num){
    try {
      // let award = yield this.store.findRecord('award', obj.objectID)
      yield this.store.createRecord('outcome', {
        num: num,
        awardId: obj.objectID,
        round: this.model,
        contenders: [],
      }).save();
      this.set('createOutcomeModal', false);
      this.set('createOutcomeModalError', false);
      this.set('num', null);
      this.set('awardId', null);
      this.set('contenders', null);
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createOutcomeModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  deleteOutcome: task(function *(outcome) {
    try {
      yield outcome.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  actions: {
    cancelOutcome(outcome){
      outcome.deleteRecord();
    },
  }
});


