import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      32: 'Chorus',
      33: 'Very Large Quartet',
      34: 'Mixed Group',
      41: 'Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chorus': 32,
      'Very Large Quartet': 33,
      'Mixed Group': 34,
      'Quartet': 41,
    };
    return map[deserialized];
  }
});
