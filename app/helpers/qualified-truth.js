import Ember from 'ember';

export function qualifiedTruth(params) {
  if (params[0]) {
    return "Yes";
  } else {
    return "";
  }
}

export default Ember.Helper.helper(qualifiedTruth);
