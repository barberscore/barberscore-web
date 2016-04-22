import Ember from 'ember';
import moment from 'moment';

export function dateRange(params) {
  if (params[0]) {
    let start = moment(params[0].lower).format('LL');
    let finish = (params[0].upper) ? moment(params[0].upper).format('LL') : 'Present';
    return start + ' - ' + finish;
  } else {
    return "";
  }
}

export default Ember.Helper.helper(dateRange);
