import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateSelection (selectedAwards) {
      console.log(selectedAwards);
    },
  },
  awards: [
    "apple",
    "banana",
    "orange",
  ]
});
