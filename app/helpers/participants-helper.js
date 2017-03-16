import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let participants = params[0];
  if (participants) {
    let formatted = participants.mapBy('name');
    return formatted;
  } else {
    return null;
  }
});
