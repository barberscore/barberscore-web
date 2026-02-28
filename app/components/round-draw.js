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
  mt: [],
  hasMt: false,
  sortedAppearances: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setAppearances();
  },
  setAppearances: function() {
    const that = this;
    this.get('model.appearances')
      .then(function(appearances) {
        const mt = [];
        let notDrawnFilter = appearances.filter((appearance) => appearance.isDrawn == false);
        // Remove entries with a null draw
        appearances = appearances.filter(function(appearance) {
          return appearance.draw != null;
        });
        appearances = appearances.toSorted(function(a, b) {
          return a.draw < b.draw ? -1 : 1;
        });
        appearances.map(function(appearance) {
          if (appearance.draw <= 0) {
            console.log('MT appearance', appearance);
            mt.push(appearance);
            that.set('hasMt', true);
          }
        });
        that.set('sortedAppearances', appearances);
        that.set('mt', mt);

        notDrawnFilter.sort(function(a, b) {
          return a.num < b.num ? -1 : 1;
        });
        that.set('sortedRoundAppearances', notDrawnFilter);
      });
  },
  sortedAppearancesProperties: [
    'draw',
  ],
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
        item.save();
      });
      later(() => {
        that.setAppearances();
      }, 1000);
      this.flashMessages.success('Success');
    },
    reorderMTs(itemModels) {
      const that = this;
      const length = itemModels.length;
      itemModels.forEach(function(item, index) {
        item.set('draw', (length * -1) + index + 1);
        item.save();
      });
      later(() => {
        that.setAppearances();
      }, 1000);
      this.flashMessages.success('Success');
    },
    removeFromDraw() {
      this.setAppearances();
    },
  }
});
