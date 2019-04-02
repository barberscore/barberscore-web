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
  rankSortProperties: [
    'status:desc',
    'runTotal.sum:desc',
    'runTotal.sng:desc',
    'runTotal.per:desc',
    'groupName',
  ],
  multiAppearances: filterBy(
    'model.appearances',
    'isMulti',
  ),
  singleAppearances: filterBy(
    'model.appearances',
    'isSingle',
  ),
  finalAppearances: filterBy(
    'model.appearances',
    'notMT',
  ),
  sortedAppearances: sort(
    'finalAppearances',
    'rankSortProperties'
  ),
  sortedSingleAppearances: sort(
    'singleAppearances',
    'rankSortProperties'
  ),
  sortedMultiAppearances: sort(
    'multiAppearances',
    'rankSortProperties'
  ),
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
  }).restartable(),
});


