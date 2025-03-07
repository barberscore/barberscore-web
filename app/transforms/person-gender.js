import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      10: 'Male',
      20: 'Female',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Male': 10,
      'Female': 20,
    };
    return map[deserialized];
  }
});
