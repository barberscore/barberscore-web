import Ember from 'ember';

export function singleFixed(params) {
  if (params[0]) {
    return params[0].toFixed(1).toString();
  } else {
    return "N/A";
  }
}

export default Ember.Helper.helper(singleFixed);
