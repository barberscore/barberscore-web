import Ember from 'ember';

export function ynBoolean(params) {
  if (params[0]) {
    return "Yes";
  } else {
    return "No";
  }
}

export default Ember.Helper.helper(ynBoolean);
