import Ember from 'ember';

export function truncateText(params, hash) {
  var value = params[0];
  var len = hash.limit;
  var out = '';

  if (value !== undefined) {
    out = value.substr(0, len);

    if (value.length > len) {
      out += '...';
    }

  } else {
    out = '';
  }

  return out;
}

export default Ember.Helper.helper(truncateText);
