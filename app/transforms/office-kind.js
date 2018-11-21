import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Organization',
      11: 'District',
      12: 'Noncompetitive',
      13: 'Affiliate',
      32: 'Chapter',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Organization': 1,
      'District': 11,
      'Noncompetitive': 12,
      'Affiliate': 13,
      'Chapter': 32,
    };
    return map[deserialized];
  }
});
