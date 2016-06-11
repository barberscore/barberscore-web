import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
  panelSort: ['designation:asc',],
  officialJudges: Ember.computed.filterBy(
    'model.session.judges',
    'kind',
    'Official'
  ),
  sortedPanel: Ember.computed.sort(
    'officialJudges',
    'panelSort'
  ),
});
