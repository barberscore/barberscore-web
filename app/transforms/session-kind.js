import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      31: 'Quartet',
      32: 'Chorus',
      33: 'Very Large Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Quartet': 31,
      'Chorus': 32,
      'Very Large Quartet': 33,
    };
    return map[deserialized];
  }
});
