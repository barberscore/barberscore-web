import Transform from '@ember-data/serializer';


export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      32: 'Chorus',
      41: 'Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chorus': 32,
      'Quartet': 41,
    };
    return map[deserialized];
  }
});
