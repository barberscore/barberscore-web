import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      41: 'Quartet',
      32: 'Chorus',
      33: 'Very Large Quartet',
      34: 'Mixed Group',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Quartet': 41,
      'Chorus': 32,
      'Very Large Quartet': 33,
      'Mixed Group': 34,
    };
    return map[deserialized];
  }
});
