import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  appearanceSortProperties: ['num', 'entry.entryprivate.total_score:desc',],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'appearanceSortProperties'
  ),
  isEditing: false,
  isRaw: false,
  isCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
    sortBy(appearanceSortProperties) {
      this.set('appearanceSortProperties', [appearanceSortProperties]);
    },
    editOrder() {
      this.set('isEditing', true);
    },
    saveOrder() {
      let children = this.get('model.appearances');
      children.forEach(function(item) {
        item.save();
      });
      this.set('isEditing', false);
    },
    cancelOrder() {
      let children = this.get('model.appearances');
      children.forEach(function(item) {
        item.rollbackAttributes();
      });
      this.set('isEditing', false);
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('num', index+1);
      });
    },
    saveDate(start, end) {
      this.model.set('start_date', start);
      this.model.set('end_date', end);
      this.model.save();
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
    deleteAppearance(appearance) {
      appearance.destroyRecord();
    },
    drawRound() {
      this.model.draw()
      .then(() => {
        this.get('flashMessages').success('Success');
      });
      this.model.reload();
    },
    resortRound() {
      this.model.resort()
      .then(() => {
        this.get('flashMessages').success('Success');
      });
      this.model.reload();
    },
    startRound() {
      this.model.start()
      .then((response) => {
        this.store.pushPayload('round', response);
      });
    },
    finishRound() {
      this.model.finish()
      .then((response) => {
        this.store.pushPayload('round', response);
      });
    },
    announceRound() {
      this.model.announce()
      .then((response) => {
        this.store.pushPayload('round', response);
      });
    },
    moveTop(appearance) {
      appearance.move_top()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      })
      .finally(()=>{
        this.get('model.appearances').sortBy('appearance.num');
      });
    },
    moveUp(appearance) {
      appearance.move_up()
      .then(() => {
        this.get('flashMessages').success('Success');
        let reloaded =  this.get('model.appearances').map( appearance => appearance.reload() );
        return Ember.RSVP.all(reloaded);
      });
    },
    moveDown(appearance) {
      appearance.move_down()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      })
      .finally(()=>{
        this.get('model.appearances').sortBy('appearance.num');
      });
    },
    moveBottom(appearance) {
      appearance.move_bottom()
      .then(() => {
        this.get('flashMessages').success('Success');
      });
      appearance.reload();
    },
    scratch(appearance) {
      appearance.scratch()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      })
      .finally(()=>{
        this.get('model.appearances').removeObject(appearance);
      });
    },
  },
});
