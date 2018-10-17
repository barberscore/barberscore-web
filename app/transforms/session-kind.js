import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      32: 'Chorus',
      41: 'Quartet',
      42: 'Mixed',
      43: 'Senior',
      44: 'Youth',
      45: 'Unknown',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chorus': 32,
      'Quartet': 41,
      'Mixed': 42,
      'Senior': 43,
      'Youth': 44,
      'Unknown': 45,
    };
    return map[deserialized];
  }
});
