import Ember from 'ember';

export function venueShort(params) {
  if (params[0].city) {
    return params[0].city + ', ' + params[0].state;
  } else {
    return "";
  }
}

export default Ember.Helper.helper(venueShort);
