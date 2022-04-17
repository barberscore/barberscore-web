import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  router: service(),
  isDisabled: true,
  savePanelistError: false,
  isScoringJudge: computed(
    'model',
    function() {
      return ['Music', 'Performance', 'Singing'].includes(this.get('model.category'));
    }
  ),
  deletePanelist: task(function *(panelist) {
    try {
      yield panelist.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  sortedPanelistsProperties: [
    'kindSort',
    'num',
    'categorySort',
    'personSort',
  ],
  sortedPanelists: sort(
    'model.round.panelists',
    'sortedPanelistsProperties'
  ),
  autosave: task(function* (field, value){
    const IsNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);
    yield timeout(1000);
    try {
      if (!IsNumeric(value)) {
        throw { errors: [{detail: 'The number must be numeric2.'}] };
      }
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger("Problem!");
        this.set('savePanelistError', error.detail);
      })
      // if not numeric return
      return;
    }

    this.model.set(field, value);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
      this.set('savePanelistError', false);
    } catch(e) {
      this.flashMessages.danger("Problem!");
      this.set('savePanelistError', e.errors.status);
    }
  }).restartable(),
  actions: {
    toggleNumber(){
      this.toggleProperty('isDisabled');
    },
  }
});
