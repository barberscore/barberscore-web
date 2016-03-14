import Ember from 'ember';
import moment from 'moment';

export function dateRange(params) {
  if (params[0]) {
    return moment(params[0].lower).format('LL') + ' - ' + moment(params[0].upper).add(1, 'days').format('LL');
  } else {
    return "";
  }
}

export default Ember.Helper.helper(dateRange);
