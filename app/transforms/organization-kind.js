import DS from 'ember-data';

export const groupKindMap = {
  'International': 1,
  'District': 11,
  'Noncompetitive': 12,
  'Affiliate': 13,
  'Chapter': 30,
  'Chorus': 32,
  'Quartet': 41,
}

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'International',
      11: 'District',
      12: 'Noncompetitive',
      13: 'Affiliate',
      30: 'Chapter',
      32: 'Chorus',
      41: 'Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    return groupKindMap[deserialized];
  }
});
