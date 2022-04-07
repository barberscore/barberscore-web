import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isEditing: false,
  mt: filterBy(
    'model.appearances',
    'draw',
    0,
  ),
  hasMt: computed('mt', function() {
    if (this.mt.length) {
      return true;
    }
    return false;
  }),
  appearanceSortProperties: [
    'draw:asc',
  ],
  drawnFilter: filterBy(
    'model.appearances',
    'isDrawn',
  ),
  notDrawnFilter: filterBy(
    'model.appearances',
    'isDrawn',
    false,
  ),
  filteredAppearances: filterBy(
    'drawnFilter',
    'status',
    'Verified'
  ),
  sortedAppearances: sort(
    'drawnFilter',
    'appearanceSortProperties'
  ),
  sortedAppearancesProperties: [
    'num',
  ],
  sortedRoundAppearances: sort(
    'notDrawnFilter',
    'sortedAppearancesProperties',
  ),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindModel = this.get('model.sessionKind');
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel} OR get_kind_display:VLQ` })
    return res.hits
  }),
  advanceGroupModal: false,
  advanceGroupModalError: false,
  advanceGroup: task(function* (obj, draw){
    try {
      yield obj.set('draw', draw);
      yield obj.save();
      this.set('advanceGroupModal', false);
      this.set('advanceGroupModalError', false);
      this.set('draw', null);
      this.set('group', null);
      this.flashMessages.success("Advanced!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('advanceGroupModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  deleteAppearance: task(function *(appearance) {
    try {
      yield appearance.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  actions: {
    toggleDraw(){
      this.toggleProperty('isEditing');
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
      });
      itemModels.invoke('save');
      this.flashMessages.success('Success');
    },
  }
});
