import Ember from 'ember';

export default Ember.Component.extend({
  isDisabled: true,
  actions: {
    editConvention: function() {
      this.set('isDisabled', false);
    },
    saveRecord: function() {
      this.get('model').save();
    }
  },
  statusChoices: [
    'New',
    'Started',
    'Finished',
    'Final'
  ]
});
