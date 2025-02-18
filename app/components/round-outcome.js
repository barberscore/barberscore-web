import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: computed('model', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  sortedOutcomes: [],
  sortedContenders: [],
  sortedImprovedContenders: [],
  didReceiveAttrs: function() {
    console.log("didUpdateAttrs called");
    this._super(...arguments);
    this.setOutcomes();
    this.setContenders();
  },
  setOutcomes: function() {
    const that = this;
    this.get('model.round.outcomes').then(function(outcomes) {
      let updatedOutcomes = outcomes.map(function(outcome) {
        return outcome;
      });
      let sortedOutcomes = updatedOutcomes.sort(function(a, b) {
        return a.num < b.num ? -1 : 1;
      });
      that.set('sortedOutcomes', sortedOutcomes);
    });
  },
  setContenders: function() {
    const that = this;
    this.get('model.appearances').then(function(appearances) {
      let updatedAppearances = appearances.map(function(appearance) {
        return appearance;
      });
      let sortedContenders = updatedAppearances.toSorted(function(a, b) {
        if (a.runTotSum != b.runTotSum)
          return a.runTotSum < b.runTotSum ? 1: -1;
        if (a.runSngSum != b.runSngSum)
          return a.runSngSum < b.runSngSum ? 1: -1;
        if (a.runPerSum != b.runPerSum)
          return a.runPerSum < b.runPerSum ? 1: -1;
        return a.name < b.name;
      });
      that.set('sortedContenders', sortedContenders);
      let sortedImprovedContenders = updatedAppearances.toSorted(function(a, b) {
        if (a.diff != b.diff)
          return a.diff < b.diff ? 1 : -1;
        if (a.runTotSum != b.runTotSum)
          return a.runTotSum < b.runTotSum ? -1: 1;
        if (a.runSngSum != b.runSngSum)
          return a.runSngSum < b.runSngSum ? 1: -1;
        if (a.runPerSum != b.runPerSum)
          return a.runPerSum < b.runPerSum ? 1: -1;
        return a.name < b.name;
      });
      that.set('sortedImprovedContenders', sortedImprovedContenders);
    });
  },
  /* sortedContestsProperties: [
    'num',
  ],
  sortedOutcomes: sort(
    'model.round.outcomes',
    'sortedContestsProperties'
  ),
  sortedContendersProperties: [
    'runTotSum:desc',
    'runSngSum:desc',
    'runPerSum:desc',
    'name',
  ],
  sortedImprovedContendersProperties: [
    'diff:desc',
    'runTotSum',
    'runSngSum:desc',
    'runPerSum:desc',
    'name',
  ],
  sortedContenders: sort(
    'model.appearances',
    'sortedContendersProperties'
  ),
  sortedImprovedContenders: sort(
    'model.appearances',
    'sortedImprovedContendersProperties'
  ), */
  autosave: task(function* (){
    yield timeout(200);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved!");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
