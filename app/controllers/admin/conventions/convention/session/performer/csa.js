import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
  panelSort: ['designation:asc',],
  sortedPanel: Ember.computed.sort(
    'model.session.judges',
    'panelSort'
  ),
});
