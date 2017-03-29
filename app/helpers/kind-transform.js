import Ember from 'ember';

export function kindTransform(params) {
  if (params[0]) {
    let map = {
      1: 'Organization',
      11: 'District',
      12: 'Noncompetitive',
      13: 'Affiliate',
      21: 'Division',
      31: 'Quartet',
      32: 'Chorus',
      33: 'Very Large Quartet',
      34: 'Mixed Group',
    };
    return map[params[0]];
  } else {
    return "";
  }
}

export default Ember.Helper.helper(kindTransform);
