import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Organization',
      11: 'District',
      12: 'Noncompetitive',
      13: 'Affiliate',
      21: 'Division',
      32: 'Chorus',
      33: 'Very Large Quartet',
      34: 'Mixed Group',
      41: 'Quartet',
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
      'Chorus': 32,
      'Very Large Quartet': 33,
      'Mixed Group': 34,
      'Quartet': 41,
    };
    return map[deserialized];
  }
});
