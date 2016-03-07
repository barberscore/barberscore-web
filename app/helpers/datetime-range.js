import Ember from 'ember';

export function datetimeRange(params) {
  if (params[0]) {
    return moment(params[0].lower).format('LLL');
  } else {
    return "";
  }
}

export default Ember.Helper.helper(datetimeRange);
