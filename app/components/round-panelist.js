import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { computed, observer } from '@ember/object';

export default Component.extend({
  store: service(),
  router: service(),
  flashMessages: service(),
  isDisabled: computed('model.round.status', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  sortedPanelists: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setPanelists();
  },
  setPanelists: function() {
    const that = this;
    this.get('model.round.panelists')
      .then(function(panelists) {
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
  autosave: task(function* (field, value){
    // const IsNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);
    yield timeout(1000);

    try {
      if (isNaN(this.model.get('num'))) {
        throw { errors: [{detail: 'The number must be numeric.'}] };
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
