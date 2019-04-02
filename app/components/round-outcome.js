import Component from '@ember/component';
import { sort, filter } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
export default Component.extend({
  flashMessages: service(),
  sortedContestsProperties: [
    'num',
  ],
  sortedOutcomes: sort(
    'model.round.outcomes',
    'sortedContestsProperties'
  ),
  filteredAppearancesProperties: [
    'runPoints:desc',
  ],
  filteredAppearances: filter(
    'model.round.appearances.@each.contesting',
    function(appearance) {
      if (appearance.get('contesting').includes(this.get('model.num'))) {
        return appearance;
      }
    }
  ),
  sortedAppearances: sort(
    'filteredAppearances',
    'filteredAppearancesProperties'
  ),
  rankSortProperties: [
    'sumOfficial:desc',
    'sumOfficialSinging:desc',
    'sumOfficialPerformance:desc',
    'groupName',
  ],
  sortedContenders: sort(
    'model.contenders',
    'rankSortProperties',
  ),
  autosave: task(function* (property){
    yield timeout(200);
    try {
      yield property.save();
      this.flashMessages.success("Saved!");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
  actions: {
    saveModel(model){
      model.save();
      this.flashMessages.success("Saved!");
    },
  }
});
