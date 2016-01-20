import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      1: 'Quartet',
      2: 'Chorus',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Quartet': 1,
      'Chorus': 2,
    };
    return map[deserialized];
  }
});
