import Ember from 'ember';
import moment from 'moment';

export function datetimeRange(params) {
  if (params[0]) {
    if (params[0].lower && params[0].upper) {
      return moment(params[0].lower).format('LLL') + ' - ' + moment(params[0].upper).format('LLL');
    } else {
      return "";
    }
    return moment(params[0].lower).format('LLL');
  } else {
    return "";
  }
}

export default Ember.Helper.helper(datetimeRange);
