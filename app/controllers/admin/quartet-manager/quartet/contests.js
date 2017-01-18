import Ember from 'ember';

export default Ember.Controller.extend({
  evaluationOptions: [
    true,
    false,
  ],
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  actions: {
  },
});
