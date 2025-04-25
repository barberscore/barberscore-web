import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import { later } from '@ember/runloop';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isEditing: false,
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setAppearances();
  },
  setAppearances: function() {
    const that = this;
    this.get('model.appearances').then(function(appearances) {
      let mtFilter = appearances.filter((appearance) => appearance.draw === 0);
      that.set('mt', mtFilter);
      that.set('hasMt', mtFilter.length > 0);
      let drawnFilter = appearances.filter((appearance) => appearance.isDrawn);
      let notDrawnFilter = appearances.filter((appearance) => appearance.isDrawn == false);
      drawnFilter.sort(function(a, b) {
        return a.draw < b.draw ? -1 : 1;
      });
      that.set('sortedAppearances', drawnFilter);
      notDrawnFilter.sort(function(a, b) {
        return a.num < b.num ? -1 : 1;
      });
      that.set('sortedRoundAppearances', notDrawnFilter);

    });
  },
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
      this.setAppearances();
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
      const that = this;
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
        item.save()
      });

      later(() => {
        that.setAppearances();
      }, 1000);
      // itemModels.invoke('save');
      this.flashMessages.success('Success');
    },
    removeFromDraw() {
      this.setAppearances();
    },
  }
});
