import { computed } from '@ember/object';
import { not, sort, filterBy} from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  isAdvancingNumberDisabled: computed(
    'model',
    function() {
      return ['Completed', 'Finalized', 'Published'].includes(this.get('model.status'));
    }
  ),
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setAppearances();
  },
  sortAppearances: function(a, b){
    // Descending by runTotSum
    if (a.runTotSum !== b.runTotSum)
      return b.runTotSum - a.runTotSum;

    // Descending by runSngSum
    if (a.runSngSum !== b.runSngSum)
      return b.runSngSum - a.runSngSum;

    // Descending by runPerSum
    if (a.runPerSum !== b.runPerSum)
      return b.runPerSum - a.runPerSum;

    // Ascending by name
    if (a.name !== b.name)
      return a.name.localeCompare(b.name);

    // Ascending by status
    return a.status.localeCompare(b.status);
  },
  setAppearances: function() {
    const that = this;
    this.get('model.appearances').then(function(appearances) {
      let notMtFilter = appearances.filter((appearance) => appearance.notMT);
      let multiAppearances = notMtFilter.filter((appearance) => appearance.isMulti);
      multiAppearances = multiAppearances.toSorted(that.sortAppearances);
      console.log('multiAppearances', multiAppearances);
      that.set('sortedMultiAppearances', multiAppearances);
      let singleAppearances = appearances.filter((appearance) => appearance.isSingle);
      singleAppearances = singleAppearances.toSorted(that.sortAppearances);
      that.set('sortedSingleAppearances', singleAppearances);
      notMtFilter = notMtFilter.toSorted(that.sortAppearances);
      that.set('sortedAppearances', notMtFilter);
    });
  },
  autosave: task(function* (property, value){
    this.model.set(property, value);
    yield timeout(1000);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
    // let round = yield this.model.complete({
    //   'by': this.get('currentUser.user.id')
    // });
    // yield this.store.pushPayload('round', round);
  }).restartable(),
});


