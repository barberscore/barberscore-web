import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
  judgeSortProperties: ['category',],
  judgesSorted: Ember.computed.sort(
    'model.judges',
    'judgeSortProperties',
  ),
});
