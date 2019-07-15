import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'International',
      11: 'District',
      12: 'Non-Competitive',
      13: 'Affiliate',
      30: 'Chapter',
      32: 'Chorus',
      41: 'Quartet',
      46: 'VLQ',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'International': 1,
      'District': 11,
      'Non-Competitive': 12,
      'Affiliate': 13,
      'Chapter': 30,
      'Chorus': 32,
      'Quartet': 41,
      'VLQ': 46,
    };
    return map[deserialized];
  }
});
