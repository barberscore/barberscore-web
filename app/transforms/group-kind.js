import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'International',
      11: 'District',
      12: 'Non-Competitive',
      13: 'Affiliate',
      21: 'Division',
      30: 'Chapter',
      32: 'Chorus',
      41: 'Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 1,
      'District': 11,
      'Non-Competitive': 12,
      'Affiliate': 13,
      'Division': 21,
      'Chapter': 30,
      'Chorus': 32,
      'Quartet': 41,
    };
    return map[deserialized];
  }
});
