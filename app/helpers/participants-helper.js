import Ember from 'ember';

export function participantsHelper(params) {
  if (params[0]) {
    let formatted = params[0].mapBy('name');
    return formatted;
  } else {
    return null;
  }
}

export default Ember.Helper.helper(participantsHelper);
