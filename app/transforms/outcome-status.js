import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Inactive',
      0: 'New',
      10: 'Active',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Inactive': '-10',
      'New': 0,
      'Active': 10,
    };
    return map[deserialized];
  }
});
