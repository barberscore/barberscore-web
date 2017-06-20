import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Organization',
      11: 'District',
      12: 'Noncompetitive',
      13: 'Affiliate',
      21: 'Division',
      41: 'Quartet',
      32: 'Chapter',
      33: 'Very Large Quartet',
      34: 'Mixed Group',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Organization': 1,
      'District': 11,
      'Noncompetitive': 12,
      'Affiliate': 13,
      'Division': 21,
      'Quartet': 41,
      'Chapter': 32,
      'Very Large Quartet': 33,
      'Mixed Group': 34,
    };
    return map[deserialized];
  }
});
