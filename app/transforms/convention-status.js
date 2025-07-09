import Transform from '@ember-data/serializer';

export default Transform.extend({
  deserialize: function(serialized) {
    var map = {
      '-10': 'Inactive',
      '0': 'New',
      '5': 'Built',
      '10': 'Active',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Inactive': '-10',
      'New': '0',
      'Built': '5',
      'Active': '10',
    };
    return map[deserialized];
  }
});
